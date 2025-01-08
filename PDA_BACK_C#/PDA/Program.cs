using LT_MATAL_APP.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Linq;
using System.Net.Sockets;
using System.Net;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using System.Security.Cryptography.X509Certificates;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Configuration.AddJsonFile("appsettings.json");

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowMobileApp", builder =>
            {
                builder.WithOrigins("http://192.168.114.52:9841", "http://123.142.144.254")
                        .WithMethods("PUT", "DELETE", "GET", "POST")
                       .AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
            });
        });

        builder.Services.AddControllers();
       
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
        });

        builder.Services.AddDbContext<LT_PDAContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseCors("AllowMobileApp");

        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}