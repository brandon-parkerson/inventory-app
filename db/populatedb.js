const { Client } = require("pg");

// TODO populate db
const SQL = `
    INSERT INTO genre (genre_name) VALUES 
      ('Action'), 
      ('RPG'), 
      ('Strategy');

      INSERT INTO developer (developer_name) VALUES 
      ('Bungie'), 
      ('Riot Games'), 
      ('BioWare');

      INSERT INTO games (name, genre_id, developer_id) VALUES 
      ('Halo', 1, 1),
      ('Mass Effect', 2, 3),
      ('League of Legends', 3, 2);
`

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://postgres:VZmeunFWKTziJdJMsaexvCqfxpNjaDFZ@yamabiko.proxy.rlwy.net:30980/railway",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();