const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Insert data into the "users" table

    const hashedPassword = await bcrypt.hash(process.argv[3], 10);
    const insertedUsers = await client.sql`
      INSERT INTO users (username, password)
      VALUES (${process.argv[2]}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING
    `;

    console.log(`User created`);

    return {
      insertedUsers
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
