const bcrypt = require("bcrypt");

async function validatePassword(plainTextPassword: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    console.log("Error: ", error)
  }
}

export default validatePassword;