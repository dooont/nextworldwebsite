import express from 'express';
import pg from 'pg';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv/config';
import session from 'express-session';
import multer from 'multer';
const storage = multer.diskStorage({
  destination: 'upcomingShowFlyers',
  filename: function (req, file, cb) {
    const fileName = "upcomingFlyer" + req.flyerId + '.' + file.originalname.split('.')[1];
    req.insertedFileName = fileName;
    console.log("Name created ma boi")
    cb(null, fileName);
  }
});
const upload = multer({ storage: storage });

//logged in user is stored in req.session.user (email)

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

// endpoint template
/*app.post("", async (req, res) => {
  try {
    if (req.session.user) { //if logged in
      
      if (inserted.length > 0) { //if it was ...
        return res.status(200).send();
      } else { //not ...
        throw new Error("");
      }
    } else { //not logged in
      return res.status(401).send({ message: "You do not have permission to do this action" });
    }
  } catch (e) {
    console.error("Error while : ", e);
    return res.status(500).json({ message: "" });
  }
});*/

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

//ADMIN ENDPOINTS//

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


//ARTICLES BACKEND//

//get all articles
app.get("/articles", async (req, res) => {
  try {
    if (req.session.user) { //logged in
      const { rows: articles } = await db.query("SELECT * FROM articles");
      return res.status(200).json({ articles: articles });
    } else { //not logged in
      return res.status(401).send({ message: "You do not have permission to do this action" });
    }
  } catch (e) {
    console.error("There was an error getting all articles: ", e);
    return res.status(500).json({ message: "Could not get articles" })
  }
});

//create new article
app.post("/articles", async (req, res) => {
  const { title, source, date, description, link } = req.body;
  try {
    if (req.session.user) { //if logged in
      const { rows: inserted } = await db.query("INSERT INTO articles(title, source, date, description, link) VALUES ($1, $2, $3, $4, $5) RETURNING *", [title, source, date, description, link]);
      console.log("Returned array: ", inserted);
      if (inserted.length > 0) { //if it was inserted
        return res.status(200).send();
      } else { //not inserted
        throw new Error("Pg was unable to insert the article into the database");
      }
    } else { //not logged in
      return res.status(401).send({ message: "You do not have permission to do this action" });
    }
  } catch (e) {
    console.error("Error while inserting new article: ", e);
    return res.status(500).json({ message: "Article not inserted" });
  }
});

//edit article
app.put("/articles/:id", async (req, res) => {
  const { id } = req.params;
  const { title, source, date, description, link } = req.body;
  try {
    if (req.session.user) { //if logged in
      const { rows: inserted } = await db.query("UPDATE articles SET title = $1, source = $2, date = $3, description = $4, link = $5 WHERE id = $6 RETURNING *", [title, source, date, description, link, id]);
      if (inserted.length > 0) { //article inserted
        return res.status(200).send();
      } else { //not inserted
        throw new Error("Pg could not edit the article");
      }
    } else { //not logged in
      return res.status(401).send({ message: "You do not have permission to do this action" });
    }
  } catch (e) {
    console.error("Error while editing article with id: " + id, e);
    return res.status(500).json({ message: "Article not edited" });
  }
});

//delete article
app.delete("/articles/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.session.user) { //if logged in
      const { rows: deleted } = await db.query("DELETE FROM articles WHERE id = $1 RETURNING *", [id]);
      if (deleted.length > 0) { //if successfully deleted
        res.status(200).send();
      } else { //if not deleted
        throw new Error("Pg was unable to remove article");
      }
    } else { //not logged
      return res.status(401).send();
    }
  } catch (e) {
    console.error("Error while deleting article with id: " + id, e);
    return res.status(500).json({ message: "Article not deleted" });
  }
});

// UPCOMING EVENTS //

//add upcoming event (and it's middlware)
function authenticateUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).send({ message: "You do not have permission to do this action" });
  }
}

async function storeUpcomingEvent(req, res, next) {
  try {
    const { title, subtitle, url } = req.body;
    const { rows: inserted } = await db.query("INSERT INTO upcoming_events (title, subtitle, url) VALUES ($1, $2, $3) RETURNING *", [title, subtitle, url]);
    req.flyerId = inserted[0].id;
    next();
  } catch (e) {
    console.log("Error while inserting upcoming event: ", e);
    return res.status(500).json({ message: "Upcoming event not inserted" });
  }
}

app.post("/upcoming-events", authenticateUser, storeUpcomingEvent, upload.single("flyerImage"), async (req, res) => {
  try {
    //insert file name
    const { title, url, subtitle } = req.body;
    await db.query("UPDATE upcoming_events SET flyer_file_name = $1, title = $2, subtitle = $3, url = $4 WHERE id = $5", [req.insertedFileName, title, subtitle, url, req.flyerId]);
    return res.status(200).send();
  } catch (e) {
    console.error("Error while : ", e);
    return res.status(500).json({ message: "Upcoming show not added" });
  }
});
//user gets authenticated
//-> upcoming events gets stored with empty data -> id gets passed to multer through req
//->filename is generated in multer -> generated name passed to final middleware to insert to database, along with other provided info from form (need to happen at end since multer need to parse form-data)


app.listen(process.env.SERVER_PORT, () => {
  console.log("server started on port: " + process.env.SERVER_PORT);
});

