using System;
using System.IO;
using System.Reflection;
using System.Text.Json.Serialization;
using ExRam.Gremlinq.Core;
using ExRam.Gremlinq.Core.AspNet;
using ExRam.Gremlinq.Providers.WebSocket;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Serilog;

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
            var azureAd = Configuration.GetSection(AzureAdOptions.SectionName);
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddMicrosoftIdentityWebApi(azureAd);

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
            });
            services.AddHttpContextAccessor();

            services.AddOptions<GremlinDbOptions>(nameof(GremlinDbOptions));

            services.AddGremlinq(c =>
            {
                c.ConfigureEnvironment(env => env
                    .UseGremlinServer(builder => builder
                        .AtLocalhost()));
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
                var azureAd = Configuration.GetSection(AzureAdOptions.SectionName);
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkillsMatrix.Api v1");
                    c.DisplayRequestDuration();
                });
            }

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(p =>
            {
                p.AllowAnyMethod();
                p.WithOrigins("http://localhost:3000");
            });

            app.UseResponseCompression();;
            app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
