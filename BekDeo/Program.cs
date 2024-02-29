using Microsoft.AspNet.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SportsEvents.Hubs;
using StackExchange.Redis;
using System;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Dodaj SignalR za WebSocket podršku
builder.Services.AddSignalR();

// Dodaj kontrolere i podršku za API Explorer
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Konfiguracija Swagger-a za autentikaciju putem JWT tokena
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Konfiguracija Redis-a
var redisConfiguration = builder.Configuration.GetConnectionString("RedisConnection");

if (string.IsNullOrEmpty(redisConfiguration))
{
    throw new InvalidOperationException("Redis connection string is not set in appsettings.json");
}

builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
    ConnectionMultiplexer.Connect(redisConfiguration));

// Konfiguracija JWT autentikacije
var jwtSection = builder.Configuration.GetSection("Jwt");
var jwtKeyString = jwtSection["Key"];

if (string.IsNullOrEmpty(jwtKeyString))
{
    throw new InvalidOperationException("JWT Key is not set in appsettings.json");
}

var jwtKey = Encoding.ASCII.GetBytes(jwtKeyString);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(jwtKey),
        ValidateIssuer = false,
        ValidateAudience = false,
        ClockSkew = TimeSpan.Zero
    };
});

// CORS konfiguracija
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder
            .WithOrigins("http://localhost:3000") // Replace with your actual frontend origin
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();








if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Omogući WebSocket podršku za SignalR hub
app.UseWebSockets();

// Omogući HTTPS redirekciju
app.UseHttpsRedirection();

// Omogući CORS
app.UseCors("AllowLocalhost");

// Omogući autentikaciju i autorizaciju
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/ChatHub"); // Promenjeno na ChatHub

app.Run();
