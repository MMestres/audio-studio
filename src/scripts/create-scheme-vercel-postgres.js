const { db } = require('@vercel/postgres');
const mockhomeprops = require('../mocks/mockhomeprops.js');

async function createUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS users;
    `;

    console.log(`Drop table "users" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "users":', error);
    throw error;
  }
}

async function createPages(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS pages;
    `;

    console.log(`Drop table "pages" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS pages (
        id TEXT PRIMARY KEY,
        title TEXT,
        subtitle TEXT,
        metatitle TEXT,
        metadescription TEXT,
        index BOOLEAN,
        follow BOOLEAN,
        keywords TEXT
      );
    `;

    console.log(`Created "pages" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "pages":', error);
    throw error;
  }
}

async function createServices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS services;
    `;

    console.log(`Drop table "services" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS services (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        label TEXT,
        description TEXT,
        image TEXT,
        service BOOLEAN,
        position INTEGER
      );
    `;

    console.log(`Created "services" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "services":', error);
    throw error;
  }
}

async function createRessources(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS ressources;
    `;

    console.log(`Drop table "ressources" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS ressources (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        label TEXT,
        description TEXT,
        image TEXT,
        ressource BOOLEAN,
        position INTEGER
      );
    `;

    console.log(`Created "ressources" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "services":', error);
    throw error;
  }
}

async function createStudio(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS studio;
    `;

    console.log(`Drop table "studio" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS studio (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        label TEXT,
        image TEXT,
        position INTEGER
      );
    `;

    console.log(`Created "studio" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "studio":', error);
    throw error;
  }
}

async function createAudio(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS audio;
    `;

    console.log(`Drop table "audio" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS audio (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT,
        artists TEXT,
        file TEXT,
        image TEXT,
        audio BOOLEAN,
        position INTEGER
      );
    `;

    console.log(`Created "audio" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "audio":', error);
    throw error;
  }
}

async function createVideo(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS video;
    `;

    console.log(`Drop table "video" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS video (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        playlistid TEXT
      );
    `;

    console.log(`Created "video" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "video":', error);
    throw error;
  }
}

async function createContact(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS contact;
    `;

    console.log(`Drop table "contact" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contact (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        address TEXT,
        phone TEXT,
        mail TEXT,
        map TEXT
      );
    `;

    console.log(`Created "contact" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "contact":', error);
    throw error;
  }
}

async function createComments(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS comment;
    `;

    console.log(`Drop table "comment" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comment (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title TEXT,
        comment TEXT,
        date TIMESTAMP DEFAULT NOW(),
        read BOOLEAN,
        show BOOLEAN
      );
    `;

    console.log(`Created "comment" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "comment":', error);
    throw error;
  }
}

async function createHomeProps(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS homeprops;
    `;

    console.log(`Drop table "homeprops" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS homeprops (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        property TEXT,
        value TEXT
      );
    `;

    console.log(`Created "homeprops" table`);

    const inserted = await Promise.all(
      mockhomeprops.map(async (prop) => {
        return client.sql`
          INSERT INTO homeprops (property, value)
          VALUES (${prop.property}, '')
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );

    console.log(`Seeded ${inserted.length} home properties`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "homeprops":', error);
    throw error;
  }
}

async function createContactMessage(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const dropTable = await client.sql`
      DROP TABLE IF EXISTS contactmessage;
    `;

    console.log(`Drop table "contact messages" table`);

    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS contactmessage (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT,
        date TIMESTAMP DEFAULT NOW(),
        read BOOLEAN
      );
    `;

    console.log(`Created "contact messages" table`);

    return {
      dropTable,
      createTable
    };
  } catch (error) {
    console.error('Error creating table "contact messages":', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createUsers(client);
  await createPages(client);
  await createServices(client);
  await createRessources(client);
  await createStudio(client);
  await createAudio(client);
  await createVideo(client);
  await createContact(client);
  await createHomeProps(client);
  await createComments(client);
  await createContactMessage(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to create the database:',
    err,
  );
});
