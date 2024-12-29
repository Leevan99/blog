const mysql = require('mysql2/promise');
require('dotenv').config();

async function initDatabase() {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    });

    try {
        // Crea il database se non esiste
        await db.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        console.log(`Database ${process.env.DB_NAME} creato o già esistente`);

        // Cambia la connessione per utilizzare il nuovo database
        await db.changeUser({ database: process.env.DB_NAME });

        // Definisci le query per creare le tabelle
        const initUsers = `
        CREATE TABLE IF NOT EXISTS users (
            idUtente int auto_increment not null unique primary key,
            nome varchar(255) not null,
            cognome varchar(255) not null,
            username varchar(255) not null unique,
            email varchar(255) not null unique,
            password varchar(255) not null
        );`;

        const initArticoli = `
        CREATE TABLE IF NOT EXISTS articoli (
            idArticoli int auto_increment not null unique PRIMARY KEY,
            titolo varchar(255),
            corpo text,
            autore varchar(255),
            idAutore int not null,
            publish bool not null,
            srcImg varchar(255) not null,
            FOREIGN KEY (idAutore) REFERENCES users(idUtente)
        );`;

        // Esegui le query per creare le tabelle
        await db.execute(initUsers);
        console.log('Tabella users creata o già esistente');

        await db.execute(initArticoli);
        console.log('Tabella articoli creata o già esistente');
    } catch (err) {
        console.error(err);
    } finally {
        await db.end();
    }
}

initDatabase();