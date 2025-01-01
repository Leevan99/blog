# Node.js Application

## Descrizione
Un'applicazione Node.js progettata per gestire è pubblicare articoli di un blog. Questo progetto richiede alcune configurazioni iniziali per essere eseguito correttamente.

## Prerequisiti
Assicurati di avere i seguenti strumenti installati:

- [Node.js](https://nodejs.org/) (v14 o superiore consigliata)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/) (incluso con Node.js)
- Un database ([MySQL](https://www.mysql.com/)

## Configurazione del Progetto

1. **Clona il repository**

   ```bash
   git clone https://github.com/Leevan99/blog
   cd blog
   ```

2. **Installa le dipendenze**

   ```bash
   npm install
   # oppure
   yarn install
   ```

3. **Configura il file `.env`**

   Copia il file di esempio `.env.example` e rinominalo in `.env`. Modifica i valori come necessario:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=user
   DB_PASS=password
   DB_NAME=blog
   DB_PORT=3306
   SESSION_SECRET=secret
   ```

4. **Esegui l'inizializzazione del database**

   ```bash
   npm run initDB
   ```

5. **Avvia il server**

   ```bash
   npm start
   ```

   Il server sarà attivo su `http://localhost:3000` (o sulla porta configurata).

## Script Disponibili

- `npm start`: Avvia l'applicazione in modalità produzione.
- `npm run dev`: Avvia l'applicazione in modalità sviluppo con hot-reloading.

## Struttura del Progetto

```plaintext
blog/
├── routes/         # Definizione delle route
├── views/          # Template pug
    ├── includes    # Componenti Riutilizzabili
├── middlewares/    # Middleware
    ├── db/         # Middleware del Database
├── index.js        # Configurazione principale dell'app
├── public/         # File statici
├── .env.example    # Esempio di file di configurazione
├── package.json    # Gestione delle dipendenze
└── README.md       # Documentazione del progetto
```

## Contributi
I contributi sono ben accetti! Per favore, apri un'issue o un pull request per suggerimenti o modifiche.

## Licenza
Questo progetto è distribuito sotto la licenza [GPL-3.0-only](https://opensource.org/licenses/GPL-3.0).
