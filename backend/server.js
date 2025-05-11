import express from 'express';
import pg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv/config';
import passport from 'passport';
import session from 'express-session';
import { Strategy } from 'passport-local';

const app = express();
const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

db.connect();

//error messages will be sent through the backend!

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test endpoint
app.get('/test', async (req, res) => {
  try {
    console.log("Starting");
    const results = await db.query('SELECT * FROM admin_users');
    console.log(results.rows);
    console.log('done');
    res.status(200).send();
  } catch (e) {
    console.log(e);
  }
})

//create an admin user
app.post('/admin/users', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { rows: users } = await db.query('SELECT * FROM admin_users WHERE email = $1', [email]);

    if (users.length > 0) { //if email already exists
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const storeResults = await db.query('INSERT INTO admin_users(email, password) VALUES ($1, $2)', [email, hashedPassword]);
    return res.status(200).send();
  } catch (e) {
    console.log("Server error creating user");
    return res.status(400).json({ message: "Server error creating user" });
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("server started on port: " + process.env.SERVER_PORT);
});