using backend.Data;
using backend.Hubs;
using Microsoft.EntityFrameworkCore;
using StackExchange.Redis;
using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Azure.Core;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            SecretClientOptions options = new SecretClientOptions()
            {
                Retry =
                {
                    Delay= TimeSpan.FromSeconds(2),
                    MaxDelay = TimeSpan.FromSeconds(16),
                    MaxRetries = 5,
                    Mode = RetryMode.Exponential
                }
            };
            var client = new SecretClient(new Uri("https://api-anzen.vault.azure.net/"), new DefaultAzureCredential(), options);

            KeyVaultSecret sqlDB = client.GetSecret("DB-CONNECTION-STRING");
            KeyVaultSecret redisDB = client.GetSecret("REDIS-CONNECTION-STRING");


            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(sqlDB.Value));

            builder.Services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(redisDB.Value));

            builder.Services.AddLogging(loggingBuilder => loggingBuilder.AddFile("app.log", append: true));
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CORSPolicy",
                    builder => builder
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .SetIsOriginAllowed((hosts) => true));
            });


            builder.Services.AddSignalR();

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("CORSPolicy");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.MapHub<ConnectionHub>("/hubs/connection");
            app.MapHub<TransportHub>("/hubs/transport");

            app.Run();
        }
    }
}