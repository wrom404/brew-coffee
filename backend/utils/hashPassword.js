import bcrypt from "bcrypt";

async function generateHashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log("Error", error.message);
  }
}

export default generateHashPassword;
