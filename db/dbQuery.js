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
INSERT INTO articoli (titolo, corpo, autore, idAutore)
VALUES(?, ?, ?, ?)`