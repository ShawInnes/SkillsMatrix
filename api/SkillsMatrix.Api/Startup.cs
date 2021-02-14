using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using ExRam.Gremlinq.Core;
using ExRam.Gremlinq.Core.AspNet;
using ExRam.Gremlinq.Providers.WebSocket;
using Gremlin.Net.Driver;
using Gremlin.Net.Structure.IO.GraphSON;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.Identity.Web;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "SkillsMatrix.Api", Version = "v1"}); });
            services.AddHttpContextAccessor();

            services.AddOptions<GremlinDbOptions>(nameof(GremlinDbOptions));

            services.AddGremlinq(c =>
            {
                c.ConfigureEnvironment(env => env
                    .UseGremlinServer(builder => builder
                        .AtLocalhost()));
                // c.ConfigureEnvironment(env => env
                //     .UseCosmosDb(builder => builder
                //         .At(new Uri("wss://***REMOVED***.gremlin.cosmos.azure.com:443/"), "***REMOVED***", "***REMOVED***")
                //         .AuthenticateBy("***REMOVED***")
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
                app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "SkillsMatrix.Api v1"); });
            }

            app.UseSerilogRequestLogging();

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();
            app.UseResponseCompression();
            app.UseResponseCaching();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}
