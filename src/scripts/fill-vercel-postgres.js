const { db } = require('@vercel/postgres');
const mockservices = require('../mocks/mockservices.js');
const mockpages = require('../mocks/mockpages.js');
const mockressources = require('../mocks/mockressources.js');
const mockstudio = require('../mocks/mockstudio.js');
const mockaudios = require('../mocks/mockaudio.js');
const mockcontact = require('../mocks/mockcontact.js');
const mockvideo = require('../mocks/mockvideo.js');
const mockhomeprops = require('../mocks/mockhomeprops.js');
const mockcomments = require('../mocks/mockcomments.js');

async function fillPages(client) {
  try {
    await client.sql`
      DELETE FROM pages;
    `;

    console.log(`Deleted all pages`);

    // Insert data into the "pages" table
    const inserted = await Promise.all(
      mockpages.map(async (page) => {
        return client.sql`
        INSERT INTO pages (id, title, subtitle, metatitle, metadescription, index, follow, keywords)
        VALUES (${page.id}, ${page.title}, ${page.subtitle}, ${page.metatitle}, ${page.metadescription}, ${page.index}, ${page.follow}, ${page.keywords})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} pages`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding table "pages":', error);
    throw error;
  }
}

async function fillServices(client) {
  try {
    await client.sql`
      DELETE FROM services;
    `;

    console.log(`Deleted all services`);

    // Insert data into the "services" table
    const inserted = await Promise.all(
      mockservices.map(async (service) => {
        return client.sql`
        INSERT INTO services (label, description, image, service, position)
        VALUES (${service.label}, ${service.description}, ${service.image}, ${service.service}, ${service.position})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} services`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding table "services":', error);
    throw error;
  }
}

async function fillRessources(client) {
  try {
    await client.sql`
      DELETE FROM ressources;
    `;

    console.log(`Deleted all ressources`);

    // Insert data into the "ressources" table
    const inserted = await Promise.all(
      mockressources.map(async (ressource) => {
        return client.sql`
        INSERT INTO ressources (label, description, image, ressource, position)
        VALUES (${ressource.label}, ${ressource.description}, ${ressource.image}, ${ressource.ressource}, ${ressource.position})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} ressources`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "ressources":', error);
    throw error;
  }
}

async function fillStudio(client) {
  try {
    await client.sql`
      DELETE FROM studio;
    `;

    console.log(`Deleted all studios`);

    // Insert data into the "studio" table
    const inserted = await Promise.all(
      mockstudio.map(async (studio) => {
        return client.sql`
        INSERT INTO studio (label, image, position)
        VALUES (${studio.label}, ${studio.image}, ${studio.position})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} studios`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "studio":', error);
    throw error;
  }
}

async function fillAudio(client) {
  try {
    await client.sql`
      DELETE FROM audio;
    `;

    console.log(`Deleted all audios`);

    // Insert data into the "ressources" table
    const inserted = await Promise.all(
      mockaudios.map(async (audio) => {
        return client.sql`
        INSERT INTO audio (title, artists, file, image, audio, position)
        VALUES (${audio.title}, ${audio.artists}, ${audio.file}, ${audio.image}, ${audio.audio}, ${audio.position})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} audios`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "audios":', error);
    throw error;
  }
}

async function fillComments(client) {
  try {
    await client.sql`
      DELETE FROM comment;
    `;

    console.log(`Deleted all comments`);

    // Insert data into the "ressources" table
    const inserted = await Promise.all(
      mockcomments.map(async (comment) => {
        return client.sql`
        INSERT INTO comment (title, comment, read, show)
        VALUES (${comment.title}, ${comment.comment}, ${comment.read}, ${comment.show})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} comments`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "comments":', error);
    throw error;
  }
}

async function fillVideo(client) {
  try {
    await client.sql`
      DELETE FROM video;
    `;

    console.log(`Deleted all video`);

    // Insert data into the "ressources" table
    const inserted = await Promise.all(
      mockvideo.map(async (video) => {
        return client.sql`
        INSERT INTO video (playlistid)
        VALUES (${video.playlistid})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} videos`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "video":', error);
    throw error;
  }
}

async function fillContact(client) {
  try {
    await client.sql`
      DELETE FROM contact;
    `;

    console.log(`Deleted all contact`);

    // Insert data into the "ressources" table
    const inserted = await Promise.all(
      mockcontact.map(async (contact) => {
        return client.sql`
        INSERT INTO contact (address, phone, mail, map)
        VALUES (${contact.address}, ${contact.phone}, ${contact.mail}, ${contact.map})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${inserted.length} contact`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "contact":', error);
    throw error;
  }
}

async function fillHomeProps(client) {
  try {
    const inserted = await Promise.all(
      mockhomeprops.map(async (prop) => {
        const property = prop.property;
        let value = prop.value;

        if (property === 'audio') {
          const res = await client.sql`SELECT id FROM audio LIMIT 1;`;
          value = res.rows[0].id
        } else if (property === 'service') {
          const res = await client.sql`SELECT id FROM services LIMIT 1;`;
          value = res.rows[0].id
        } else if (property === 'ressource') {
          const res = await client.sql`SELECT id FROM ressources LIMIT 1;`;
          value = res.rows[0].id
        } else if (property === 'studio') {
          const res = await client.sql`SELECT id FROM studio LIMIT 1;`;
          value = res.rows[0].id
        }

        return client.sql`
        UPDATE homeprops SET value = ${value}
        WHERE property = ${property};
      `;
      }),
    );

    console.log(`Updated ${inserted.length} home properties`);

    return {
      insertedUsers: inserted
    };
  } catch (error) {
    console.error('Error seeding "contact":', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await fillPages(client);
  await fillServices(client);
  await fillRessources(client);
  await fillStudio(client);
  await fillAudio(client);
  await fillVideo(client);
  await fillContact(client);
  await fillHomeProps(client);
  await fillComments(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to create the database:',
    err,
  );
});
