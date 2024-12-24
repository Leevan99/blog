exports.queryArticoli = `
SELECT * 
FROM articoli
ORDER BY idArticoli DESC`

exports.queryArticolo = `
SELECT * 
FROM articoli
WHERE idArticoli = ?`

exports.queryControllo = `
SELECT username, email
FROM users
WHERE username = ? OR email = ?`

exports.queryRegistrazione = `
INSERT INTO users (nome, cognome, username, email, password)
VALUE(?, ?, ?, ?, ?)`

exports.queryLogin = `
SELECT *
FROM users
WHERE username = ? OR email = ?`


exports.queryPost = `
INSERT INTO articoli (titolo, corpo, autore, idAutore, publish)
VALUES(?, ?, ?, ?, true)`

exports.queryArticoliUtente = `
SELECT * 
FROM articoli
WHERE idAutore = ?
ORDER BY idArticoli DESC`


exports.queryDelete = `
DELETE FROM articoli
WHERE idArticoli = ?`


exports.queryAggiorna = `
UPDATE articoli
SET titolo = ?, corpo = ?
WHERE idArticoli = ?`

exports.queryPublish = `
UPDATE articoli
SET publish = ?
WHERE idArticoli = ?`