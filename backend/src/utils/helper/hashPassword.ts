const bcrypt = require("bcrypt");

async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword: ", hashedPassword)
    return hashedPassword;
  } catch (error) {
    console.log("Error: ", error)
  }
}

export default hashPassword;