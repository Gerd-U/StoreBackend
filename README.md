StoreBackend

Backend en .NET 10 (API REST de productos y usuarios) con Entity Framework Core y SQL Server, desplegado en Azure (Azure SQL Database + Azure App Service). El frontend en React está en la carpeta product-app.

Estructura

- src/StoreBackend.Api: controladores, configuración y punto de entrada (startup project).
- src/StoreBackend.Infrastructure: AppDbContext, repositorios y migraciones (Persistence/Migrations).
- src/StoreBackend.Domain: entidades (Product, User).
- src/StoreBackend.DomainService, src/StoreBackend.Facade, src/StoreBackend.Dto, src/StoreBackend.Exceptions: capas de lógica, fachada, DTOs y excepciones.

Requisitos

Instalar la herramienta de Entity Framework (solo la primera vez):

    dotnet tool install --global dotnet-ef
    dotnet ef --version

Todos los comandos se ejecutan desde la raíz de la solución (donde está la carpeta src).

Comandos para cambios en la base de datos

Cada vez que se modifica el modelo (agregar una entidad nueva, agregar o quitar una columna, cambiar un tipo de dato) se hacen dos pasos: crear una migración y aplicarla a la base de datos.

Agregar una nueva entidad:

1. Crear la clase en src/StoreBackend.Domain/Entities, por ejemplo Category.cs.
2. Agregar su DbSet en AppDbContext:

        public DbSet<Category> Categories { get; set; } = null!;

3. Crear la migración:

        dotnet ef migrations add AddCategory --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api --output-dir Persistence/Migrations

4. Aplicarla a la base de datos:

        dotnet ef database update --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api

Agregar una columna a una tabla existente:

1. Agregar la propiedad en la entidad, por ejemplo en Product.cs:

        public decimal Price { get; set; }

2. Crear la migración:

        dotnet ef migrations add AddPriceToProduct --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api --output-dir Persistence/Migrations

3. Aplicarla:

        dotnet ef database update --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api

Otros comandos

Ver la lista de migraciones y cuáles ya están aplicadas:

    dotnet ef migrations list --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api

Eliminar la última migración, solo si todavía no se ha aplicado a la base de datos:

    dotnet ef migrations remove --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api

Volver la base de datos a una migración anterior (por ejemplo, deshacer AddUsers):

    dotnet ef database update InitialCreate --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api

Generar el script SQL de las migraciones sin aplicarlas:

    dotnet ef migrations script --project src/StoreBackend.Infrastructure --startup-project src/StoreBackend.Api -o migraciones.sql

Notas

- El nombre de la migración debe describir el cambio (AddCategory, AddPriceToProduct), no usar nombres genéricos.
- database update usa la conexión ConnectionStrings:DefaultConnection del appsettings.Development.json. Si apunta a Azure, los cambios se aplican directamente en Azure SQL.
- Si la base de Azure está en pausa (plan gratis), el primer intento puede fallar con el error 40613; se espera un minuto y se vuelve a ejecutar.
- La contraseña de la base de datos no se sube al repositorio. En Azure App Service se configura en la variable de entorno ConnectionStrings__DefaultConnection.
