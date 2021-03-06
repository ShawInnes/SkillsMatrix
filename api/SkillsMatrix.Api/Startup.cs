using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text.Json.Serialization;
using ExRam.Gremlinq.Core;
using ExRam.Gremlinq.Core.AspNet;
using ExRam.Gremlinq.Providers.WebSocket;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using Serilog;
using SkillsMatrix.Api.Options;
using SkillsMatrix.Api.Services;

namespace SkillsMatrix.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            services
                .AddMicrosoftIdentityWebApiAuthentication(Configuration, subscribeToJwtBearerMiddlewareDiagnosticsEvents: true);

            services.AddRouting(options => options.LowercaseUrls = true);

            services.AddMvcCore()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                    options.JsonSerializerOptions.IgnoreNullValues = true;
                });

            services.AddControllers();

            services.Configure<GremlinDbOptions>(Configuration.GetSection(GremlinDbOptions.SectionName));
            services.Configure<AzureAdOptions>(Configuration.GetSection(AzureAdOptions.SectionName));

            // Build an intermediate service provider
            using var sp = services.BuildServiceProvider();
            var azureAdOptions = sp.GetRequiredService<IOptions<AzureAdOptions>>();
            var gremlinDbOptions = sp.GetRequiredService<IOptions<GremlinDbOptions>>();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "SkillsMatrix.Api", Version = "v1"});

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.AddSecurityDefinition("token", new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.OpenIdConnect,
                    OpenIdConnectUrl = new Uri($"https://login.microsoftonline.com/{azureAdOptions.Value.TenantId}/v2.0/.well-known/openid-configuration"),
                    Flows = new OpenApiOAuthFlows
                    {
                        Implicit = new OpenApiOAuthFlow
                        {
                            Scopes = new Dictionary<string, string>
                            {
                                {"openid", "openid"},
                                {"offline_access", "offline_access"},
                                {$"api://{azureAdOptions.Value.ClientId}/read", "API Read Access"}
                            }
                        }
                    }
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "token"
                            }
                        },
                        new List<string>
                        {
                            "openid",
                            "offline_access",
                            $"api://{azureAdOptions.Value.ClientId}/read"
                        }
                    }
                });
            });

            services.AddHttpContextAccessor();

            services.AddGremlinq(c =>
            {
                if (gremlinDbOptions.Value.UseGremlinServer && gremlinDbOptions.Value.Host.StartsWith("ws://"))
                {
                    Log.Information("Configuring GremlinServer {Host}", gremlinDbOptions.Value.Host);
                    c.ConfigureEnvironment(env => env
                        .UseGremlinServer(builder => builder
                            .At(gremlinDbOptions.Value.Host)));
                }
                else
                {
                    Log.Information("Configuring CosmosDb {Host} {Database} {Container}", gremlinDbOptions.Value.Host, gremlinDbOptions.Value.DatabaseName, gremlinDbOptions.Value.ContainerName);
                    c.ConfigureEnvironment(env => env
                        .UseCosmosDb(builder => builder
                            .At(new Uri(gremlinDbOptions.Value.Host), gremlinDbOptions.Value.DatabaseName, gremlinDbOptions.Value.ContainerName)
                            .AuthenticateBy(gremlinDbOptions.Value.PrimaryKey)
                        )
                    );
                }
            });

            services.AddLogging();
            services.AddResponseCaching();
            services.AddResponseCompression();

            services.AddTransient<IUserIdService, UserIdService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IOptions<AzureAdOptions> azureAdOptions)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkillsMatrix.Api v1");
                c.DisplayRequestDuration();
                c.OAuthClientId(azureAdOptions.Value.ClientId);
                c.OAuthScopes(
                    "openid",
                    "offline_access",
                    $"api://{azureAdOptions.Value.ClientId}/read"
                );
                c.OAuth2RedirectUrl($"{azureAdOptions.Value.SwaggerRedirectUrl}/swagger/oauth2-redirect.html");
                c.OAuthUsePkce();
            });

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(p =>
            {
                p.AllowAnyHeader();
                p.AllowAnyMethod();
                p.AllowCredentials();
                p.WithOrigins(
                    "http://localhost:5000",
                    "http://localhost:3000",
                    "https://skills-matrix-app.azurewebsites.net"
                );
            });

            app.UseResponseCompression();
            app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToFile("/index.html");
            });
        }
    }
}
