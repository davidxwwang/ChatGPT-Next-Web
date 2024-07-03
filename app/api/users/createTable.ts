import pool from "./connect";
// import fs from 'fs';
// import path from 'path';

export async function createTable() {
  console.log("david_Route begin createTable-0.");
  let createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        weichat_id VARCHAR(255) NOT NULL,
        level TEXT NOT NULL,
        token_info TEXT,
        extras TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
  const connection = (await pool).query(createTableSQL);
  console.log("david_Route begin createTable-1.");
  try {
    // await connection.connect((err: any) => {
    //   if (err) {
    //     console.error('Error connecting to database:', err.stack);
    //     return;
    //   }
    //   console.log('Connected to MySQL database.');
    // });
    let createTableSQL = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nickname VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        weichat_id VARCHAR(255) NOT NULL,
        level TEXT NOT NULL,
        token_info TEXT,
        extras TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    `;
    //fs.readFileSync(path.join(__dirname, 'createUserTable.sql'), 'utf8');
    // await connection.query(createTableSQL);
    console.log("User table created successfully.");
  } catch (error) {
    console.error("Error creating user table:", error);
  } finally {
    // connection.release();
  }
}

// createTable().catch(console.error);
