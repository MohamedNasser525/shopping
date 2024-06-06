using myapi.Model;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//DB_HOST: "demodb"
//       DB_NAME: "newdb"
//       DB_SA_PASSWORD: "Mohamed123@"
//       DBServer: "demodb"


//var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
//var dbName = Environment.GetEnvironmentVariable("DB_NAME");
//var dbpassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
//var connectionString = $"Server=localhost,1433; Initial Catalog=newdb; User ID=SA; Password=Mohamed123@";
//builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));



//builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));
// Add services to the container.   

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(builder =>
	{
		builder
			.WithOrigins("http://localhost:3000") // Replace this with your frontend origin
			.AllowAnyMethod()
			.AllowAnyHeader()
			.AllowCredentials(); // Allow credentials mode 'include'
	});
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
