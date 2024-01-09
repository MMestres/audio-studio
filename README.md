# Proyecto con next, react, typescript y tailwind.

![studio](https://github.com/MMestres/audio-studio/assets/951469/5b0d9d2b-1654-49ff-8ab2-029550495fa7)

Demo: [https://audio-studio.vercel.app/](https://audio-studio.vercel.app/)

## Para levantar el proyecto en local

1. Instala las **dependencias** <code>npm install</code>.
2. Inicializa las **variables de entorno**:
   1. Copia <code>.env.example</code> a <code>.env</code>,
   2. Rellena <code>NEXTAUTH_SECRET</code> (puedes ejecutar <code>npm run secret:rand</code> para obtener un valor válido)
3. Configura la API KEY de **Youtube** en la propiedad <code>YOUTUBE_API_KEY</code> del fichero <code>.env</code> con clave válida para Youtube Data API v3.
4. Configurar la *fuente de datos*: en el fichero <code>.env</code> rellena la propiedad <code>DATA</code>:
   1. Con <code>@vercel/postgres</code>: 
      1. Rellenar también los datos de conexión con la base de datos de vercel.
      2. Generar el esquema de base de datos con <code>npm run db:create</code>
         1. El esquema viene vacío, si se quiere tener datos de pruebas ejecutar <code>npm run db:fill</code>
      3. Configura la API de **ImageKit.io** con la clave pública, la clave privada y la url de la colección
      4. Crear el usuario administrador con <code>npm run user:create [username] [password]</code>
   2. Con <code>mocks</code>:
      1.  Los credenciales de acceso al /dashboard es <code>userdemo</code> / <code>demo</code>
5. *Arrancar el proyecto* en local <code>npm run dev</code>
6. *Acceso a la página pública* en [http://localhost:3000/](http://localhost:3000/)
7. *Acceso al dashboard* en [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
