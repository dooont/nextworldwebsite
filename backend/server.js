import express from 'express';
import pg from 'pg';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv/config';
import session from 'express-session';

const app = express();
const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

//store sessions for an hour
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  })
);

db.connect();

//error messages will be sent through the backend!
//All endpoints will send a 500 error is error with query

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
    return res.status(500).json({ message: "Server error creating user" });
  }
});

//login endpoint
app.post('/admin/login', async (req, res) => {
  const { email } = req.body;
  const { password: unhashedPassword } = req.body;

  try {
    const { rows: users } = await db.query('SELECT * FROM admin_users WHERE email = $1', [email]);
    if (users.length === 1) { //user exists
      const storedPassword = users[0].password;
      const isMatch = await bcrypt.compare(unhashedPassword, storedPassword);
      if (isMatch) { //passwords match
        req.session.user = { email: email };
        return res.status(200).send();
      } else { //passwords don't match
        console.log("Passwords don't match")
        return res.status(401).json({ message: "Login Failed" })
      }
    } else { //user doesn't exist
      console.log("User doesn't exist");
      return res.status(401).json({ message: "Login failed" });
    }
  } catch (e) {
    console.log("Server error logging in user");
    return res.status(500).json({ message: "Server error logging in user" });
  }
});

//logout endpoint
app.delete("/admin/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) { //error while destroying session
        throw Error("Session not destroyed");
      } else {
        res.clearCookie('connect.sid');
        return res.status(200).send();
      }
    });
  } catch (e) {
    console.log("Server error while logging out user: ");
    console.log(e);
    return res.status(500).json({ message: "Could not log you out" });
  }
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("server started on port: " + process.env.SERVER_PORT);
});

