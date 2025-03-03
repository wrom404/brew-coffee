import pool from "../config/connectDb.js";
import generateHashPassword from "../utils/hashPassword.js";

export function getUsers(req, res) {
  return res.status(200).json({ success: true, message: "return all users" });
}

export async function createUser(req, res) {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields must be filled" });
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  const hashedPassword = await generateHashPassword(password);
  console.log("hashed Password:", hashedPassword);

  if (!hashedPassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password invalid" });
  }

  try {
    const isEmailExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    console.log(isEmailExist);

    if (isEmailExist.rows.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exist" });
    }

    const result = await pool.query(
      "INSERT INTO users(first_name, last_name, email, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [firstName, lastName, email, username, hashedPassword]
    );
    return res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
