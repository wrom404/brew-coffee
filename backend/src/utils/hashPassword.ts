import bcrypt from "bcrypt"

async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword: ", hashedPassword)
    return hashedPassword;
  } catch (error) {
    console.log("Error: ", error)
    throw error; // Rethrow the error
  }
}

export default hashPassword;