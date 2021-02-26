using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using System.Text.Json.Serialization;
using ExRam.Gremlinq.Core;
using ExRam.Gremlinq.Core.AspNet;
using ExRam.Gremlinq.Providers.WebSocket;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.TokenCacheProviders.InMemory;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using SkillsMatrix.Api.Options;

namespace SkillsMatrix.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public string clientId = "97a9eace-9524-43ce-b326-dcbce7cb5cbc";
        public string clientSecret = "Wce5~.kmj421_hTd7JUmxb.K2_gEtR9.eL";
        public string redirectUrl = "http://localhost:5000";

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            // var configurationManager = new ConfigurationManager<OpenIdConnectConfiguration>(
            //     "https://login.microsoftonline.com/51b792d5-bfd3-4dbd-82d2-f42aef2fa7ee/v2.0/.well-known/openid-configuration",
            //     new OpenIdConnectConfigurationRetriever(),
            //     new HttpDocumentRetriever());
            //
            // var discoveryDocumentTask = configurationManager.GetConfigurationAsync();
            // discoveryDocumentTask.Wait();
            // var signingKeys = discoveryDocumentTask.Result.SigningKeys;

            // services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
            //     .AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"));

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
                    OpenIdConnectUrl = new Uri($"https://login.microsoftonline.com/51b792d5-bfd3-4dbd-82d2-f42aef2fa7ee/v2.0/.well-known/openid-configuration")
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
                        new List<string>()
                    }
                });
            });
            services.AddHttpContextAccessor();

            services.Configure<GremlinDbOptions>(Configuration.GetSection(GremlinDbOptions.SectionName));

            // Build an intermediate service provider
            using var sp = services.BuildServiceProvider();
            var dbOptions = sp.GetService<IOptions<GremlinDbOptions>>();

            services.AddGremlinq(c =>
            {
                if (dbOptions.Value.UseGremlinServer)
                {
                    Log.Information("Configuring GremlinServer {Host}", dbOptions.Value.Host);
                    c.ConfigureEnvironment(env => env
                        .UseGremlinServer(builder => builder
                            .At(dbOptions.Value.Host)));
                }

                // c.ConfigureEnvironment(env => env
                //     .UseCosmosDb(builder => builder
                //         .At(new Uri("{Instance}"), "{Database}", "{Container}")
                //         .AuthenticateBy("{PrimaryKey}")
                //         .ConfigureWebSocket(_ => _
                //             .ConfigureGremlinClient(client => client
                //                 .ObserveResultStatusAttributes((requestMessage, statusAttributes) =>
                //                 {
                //                     //Uncomment to log request charges for CosmosDB.
                //                     //if (statusAttributes.TryGetValue("x-ms-total-request-charge", out var requestCharge))
                //                     //    env.Logger.LogInformation($"Query {requestMessage.RequestId} had a RU charge of {requestCharge}.");
                //                 })))));
            });

            services.AddLogging();
            services.AddResponseCaching();
            services.AddResponseCompression();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkillsMatrix.Api v1");
                    c.DisplayRequestDuration();
                    c.OAuthClientId(clientId);
                    c.OAuthScopes("openid", "offline_access");
                    c.OAuthClientSecret(clientSecret);
                    c.OAuth2RedirectUrl($"{redirectUrl}/swagger/oauth2-redirect.html");
                    c.OAuthUsePkce();
                });
            }

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(p =>
            {
                p.AllowAnyHeader();
                p.AllowAnyMethod();
                p.WithOrigins("http://localhost:5000", "http://localhost:3000");
                p.AllowCredentials();
            });

            app.UseResponseCompression();
            app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
