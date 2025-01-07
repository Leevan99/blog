const bcrypt = require('bcrypt')

const password = "password"

async function hashPassword(password) {
  try {
    const hash = await bcrypt.hash(password, 10)
    return hash;
  } catch (err) {
    console.error(err)
  }
}

async function main() {
  const hashedPassword = await hashPassword(password)
  console.log(hashedPassword)
}

main()