# Stage 1: Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

# Restore
COPY ["SistemaAPI/SistemaAPI.csproj", "SistemaAPI/"]
RUN dotnet restore "SistemaAPI/SistemaAPI.csproj"

COPY . .


# Build
COPY ["SistemaAPI/SistemaAPI.csproj", "SistemaAPI/"]
WORKDIR "/src/SistemaAPI"
RUN dotnet build "SistemaAPI.csproj" -c Release -o /app/build


# Stage 2: Publish Stage
FROM build AS publish
RUN dotnet publish "SistemaAPI.csproj" -c Release -o /app/publish


# Stage 3: Run
FROM mcr.microsoft.com/dotnet/aspnet:8.0
ENV ASPNETCORE_URLS=http://0.0.0.0:5198
# Define environment to Development for Swagger
ENV ASPNETCORE_ENVIRONMENT=Development
# Permitir conexões externas no Docker
EXPOSE 5198
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SistemaAPI.dll"]
