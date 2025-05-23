import express from 'express';
import pg from 'pg';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv/config';
import session from 'express-session';
import { unlink } from 'fs/promises';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import multer from 'multer';
const upcomingFlyersStorage = multer.diskStorage({ //stores flyer for new upcoming event
  destination: 'upcomingShowFlyers',
  filename: function (req, file, cb) {
    const fileName = "upcomingFlyer" + req.flyerId + '.' + file.originalname.split('.')[1];
    req.insertedFileName = fileName;
    cb(null, fileName);
  }
});
const uploadUpcomingFlyers = multer({ storage: upcomingFlyersStorage });

const storeUpdateFlyer = multer.diskStorage({ //stores flyer when updating flyer for upcoming event
  destination: 'upcomingShowFlyers',
  filename: function (req, file, cb) {
    const fileName = "upcomingFlyer" + req.params.id + '.' + file.originalname.split('.')[1]; //names it based on which one is being updated (through id)
    req.insertedFileName = fileName; //to compare with stored file name and see if a new filetype was added (extension)
    cb(null, fileName);
  }
});
const uploadUpdated = multer({ storage: storeUpdateFlyer });

const pastFlyersStorage = multer.diskStorage({ //for storing flyers for new past events
  destination: 'pastFlyers',
  filename: function (req, file, cb) {
    const fileName = "pastFlyer" + req.flyerId + '.' + file.originalname.split('.')[1];
    req.insertedFileName = fileName;
    cb(null, fileName);
  }
});
const uploadPastFlyers = multer({ storage: pastFlyersStorage });

const membersImageStorage = multer.diskStorage({
  destination: 'memberImages',
  filename: function (req, file, cb) {
    const fileName = "memberImage" + req.memberId + '.' + file.originalname.split('.')[1];
    req.insertedFileName = fileName;
    cb(null, fileName);
  }
});
const uploadMemberImage = multer({ storage: membersImageStorage });

const storeUpdateMemberImage = multer.diskStorage({
  destination: 'memberImages',
  filename: function (req, file, cb) {
    const fileName = 'memberImage' + req.params.id + '.' + file.originalname.split('.')[1];
    req.insertedFileName = fileName;
    cb(null, fileName);
  }
});
const uploadUpdatedMemberImage = multer({ storage: storeUpdateMemberImage });

const app = express();
const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME
});

//store sessions for an hour
//logged in user is stored in req.session.user (email)
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

//static image fetching
app.use('/flyers', express.static('upcomingShowFlyers'));
app.use('/pastFlyers', express.static('pastFlyers'));
app.use('/memberImages', express.static('memberImages'));

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

//reset password request. send user link to front end page to reset password.
app.get("/admin/reset-password", async (req, res) => {
  const { email } = req.body;
  const { rows: foundUser } = await db.query("SELECT * FROM admin_users WHERE email = $1", [email]);
  if (foundUser.length === 0) {
    return res.status(201).send(); //send this so users can't see if a user exists or not
  }

  //generate random tokena nd insert to database
  const id = foundUser[0].admin_id;
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600_000);
  await db.query("INSERT INTO reset_tokens VALUES($1, $2, $3) RETURNING *", [id, token, expiresAt]);

  const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

  //email user
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `nxtworldcollective <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Admin Password",
    html: `
      <h1> Password Reset Request</h1>
      <p>Click the link below to reset your password</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <br/>
      <p>Also, hi from developers: Matt and Elton :P</p>
    `
  };

  await transporter.sendMail(mailOptions);
  res.status(200).send();
});

//reset admin users password. recieves request from front end
app.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    //check if sent token is valid
    const { rows } = await db.query("SELECT * FROM reset_tokens WHERE token = $1 AND expires_at > NOW()", [token]);
    if (rows.length === 0) {
      return res.status(401).send();
    }

    const userId = rows[0].admin_user_id;
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //reset the password and delete token
    await db.query("UPDATE admin_users SET password = $1 WHERE admin_id = $2", [hashedPassword, userId]);
    await db.query("DELETE FROM reset_tokens WHERE token = $1", [token]);

    res.status(200).send();
  } catch (e) {
    console.error("Error occured while reseting password: ", e);
    return res.status(500).send();
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
    const { rows: inserted } = await db.query("INSERT INTO upcoming_events DEFAULT VALUES RETURNING *");
    req.flyerId = inserted[0].id; //this is passed to the diskStorage for multer to generate name
    next();
  } catch (e) {
    console.error("Error while inserting upcoming event: ", e);
    return res.status(500).json({ message: "Upcoming event not inserted" });
  }
}

app.post("/upcoming-events", authenticateUser, storeUpcomingEvent, uploadUpcomingFlyers.single("flyerImage"), async (req, res) => {
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

//update upcoming event
app.put("/upcoming-events/:id", uploadUpdated.single("flyerImage"), async (req, res) => { //uses different multerFunction since it needs id right away
  const id = req.params.id;
  const { title, subtitle, url } = req.body;

  //get old flyer name and check if new flyer is a different type. Delete old file if new one is different type
  try {
    const { rows: event } = await db.query("SELECT * FROM upcoming_events WHERE id = $1", [id]);

    if (event[0].flyer_file_name !== req.insertedFileName) { //delete if files are different
      await unlink("upcomingShowFlyers/" + event[0].flyer_file_name);
    }

    //insert updated upcoming event, including new file name (if updated)
    const { rows } = await db.query("UPDATE upcoming_events SET title = $1, subtitle = $2, url = $3, flyer_file_name = $4 WHERE id = $5 RETURNING *", [title, subtitle, url, req.insertedFileName, id]);
    if (rows.length === 0) {
      throw new Error("Pg could not insert updated event");
    }
    return res.status(200).send();

  } catch (e) {
    console.error("Error while editing flyer with id " + id + ": ", e);
    return res.status(500).send("Could not update flyer");
  }
});
//take uploaded file -> get old file name from database, check if stored name is different from uploaded -> delete if different. (handles new filetypes)

//delete upcoming event by id
app.delete("/upcoming-events/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: deleted } = await db.query("DELETE FROM upcoming_events WHERE id = $1 RETURNING *", [id]);
    if (!(deleted.length > 0)) { //if not deleted
      throw new Error("Pg could not delete upcoming event");
    }

    await unlink("upcomingShowFlyers/" + deleted[0].flyer_file_name);
    return res.status(200).send();
  } catch (e) {
    console.error("Error while deleting event with id:", id, e);
    res.status(500).send({ message: "Upcoming event not delete" });
  }
});//checking if thign with id exists would be beneficial, add later

//get all upcoming events
app.get("/upcoming-events", authenticateUser, async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM upcoming_events");
    if (rows.length === 0) {
      throw Error("Pg is returning 0 rows");
    }
    const events = [];
    rows.forEach((event) => {
      const storedEvent = {
        id: event.id,
        image: 'http:localhost:3000' + '/flyers/' + event.flyer_file_name, //CHANGE THE BASE PATH TO A GLOBAL VARIABLE (MAYBE ENV)
        title: event.title,
        subtitle: event.subtitle,
        url: event.url
      }
      events.push(storedEvent);
    });
    return res.status(200).json({ upcomingEvents: events });
  } catch (e) {
    console.error("Error while retrieving all upcoming events: ", e);
    return res.status(500).json({ message: "Could not retrieve all upcoming events" });
  }
});

//get upcoming event by id
app.get("/upcoming-events/:id", authenticateUser, async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query("SELECT * FROM upcoming_events WHERE id = $1", [id]);
    if (rows.length === 0) {
      throw new Error("Pg returned 0 events")
    }
    const event = {
      id: id,
      image: 'http:localhost:3000' + '/flyers/' + rows[0].flyer_file_name, //CHANGE THE BASE PATH TO A GLOBAL VARIABLE (MAYBE ENV)
      title: rows[0].title,
      subtitle: rows[0].subtitle,
      url: rows[0].url
    }
    return res.status(200).json(event);
  } catch (e) {
    console.error("Error while getting upcoming event with id: ", id, e);
    return res.status(500).send("Cold not retrieve upcoming event");
  }
});

// PAST EVENTS ENDPOINTS //

//create past event (and it's middleware). To learn how this works, look at the add upcoming event endpoint
async function storePastEvent(req, res, next) {
  try {
    const { rows: inserted } = await db.query("INSERT INTO past_events DEFAULT VALUES RETURNING *");
    req.flyerId = inserted[0].id;
    if (inserted.length === 0) {
      throw new Error("Blank entry for past event not generated.");
    }
    next();
  } catch (e) {
    console.error("Error occured while creating past event: ", e);
    return res.status(500).json({ message: "Could not create past event" });
  }
}

app.post("/past-events", authenticateUser, storePastEvent, uploadPastFlyers.single("pastFlyer"), async (req, res) => {
  const { title, subtitle, desc, artists: artistsJSON, place } = req.body
  try {
    //store past event, add event to database, create and add new artists, link artist with past event
    //store upcoming event
    const { rows: insertedEvent } = await db.query("UPDATE past_events SET past_flyer_file_name = $1, title = $2, subtitle = $3, description = $4, place = $5 RETURNING *", [req.insertedFileName, title, subtitle, desc, place]);
    if (insertedEvent.length === 0) {
      throw new Error("Pg was not able to fill in data for new past event.");
    }

    //store artists
    const artists = JSON.parse(artistsJSON);
    for (const artist of artists) { //using an advanced for loop, since forEach doesn't wait for await
      //only store artist in artist table if doesn't already exist
      const { rows: exists } = await db.query("SELECT * FROM artists WHERE name = $1", [artist.name])
      let artistId = exists[0]?.id || null;
      if (artistId === null) {
        const { rows: insertedArtist } = await db.query("INSERT INTO artists (name, contact) VALUES ($1, $2) RETURNING *", [artist.name, artist.contact]);
        if (insertedArtist.length === 0) {
          throw new Error("Pg was unable to insert artist: " + artist.name);
        }
        artistId = insertedArtist[0].id;
      }

      //insert artist and event into resolution table
      const { rows: insertedEventArtist } = await db.query("INSERT INTO past_events_artists (past_event_id, artist_id) VALUES ($1, $2) RETURNING *", [req.flyerId, artistId]); //i know weird to use flyerId, but it's okay
      if (insertedEventArtist.length === 0) {
        throw new Error("Pg was unable to insert artist/event into past_events_artists");
      }
    };

    return res.status(200).send();
  } catch (e) {
    console.error("Error occured while creating past event", e);
    return res.status(500).json({ message: "Could not create past event" });
  }
});

//delete past event
app.delete("/past-events/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    //delete the event by id
    const { rows: deletedEvent } = await db.query("DELETE FROM past_events WHERE id = $1 RETURNING *", [id]);
    if (deletedEvent.length === 0) {
      throw new Error("Pg was unable to delete past event");
    }

    await unlink("pastFlyers/" + deletedEvent[0].past_flyer_file_name);

    //return artists who aren't in any past events
    const { rows: artistIdsToDelete } = await db.query(`
        SELECT * FROM past_events_artists pea
        RIGHT JOIN artists a ON pea.artist_id = a.id
        WHERE past_event_id IS NULL;
    `);

    //delete artists who aren't in any past events
    for (const artist of artistIdsToDelete) {
      const { rows: deletedArtist } = await db.query("DELETE FROM artists WHERE id = $1 RETURNING *", [artist.id]);
      if (deletedArtist.length === 0) { //if not deleted
        throw new Error("Artist with id: " + deletedArtist.id);
      }
    }
    return res.status(200).send();
  } catch (e) {
    console.error("Error occured while deleting past event with id " + id + ":", e);
    return res.status(500).json({ message: "Could not delete event" });
  }
});

//get all past events
app.get("/past-events", authenticateUser, async (req, res) => {
  try {
    //get all past event ids
    const { rows: allPastEvents } = await db.query("SELECT * FROM past_events");
    if (allPastEvents.length === 0) {
      throw new Error("Pg retrieved 0 events");
    }

    //create past events to send per past event
    const returnPastEvents = [];
    for (const storedEvent of allPastEvents) {
      let parsedEvent = {
        id: storedEvent.id,
        imageURL: 'http:localhost:3000' + '/pastFlyers' + storedEvent.past_flyer_file_name, //CHANGE BASE PATH URL TO GLOBAL OR ENV
        title: storedEvent.title,
        subtitle: storedEvent.subtitle,
        desc: storedEvent.description,
        artists: [],
        place: storedEvent.place
      };
      //get all artists in past event and store in parsedEvent artists array
      const { rows: storedEventsArtists } = await db.query(`
          SELECT * FROM past_events_artists pea
          RIGHT JOIN artists a ON a.id = pea.artist_id
          WHERE past_event_id = $1
        `, [storedEvent.id]);
      //the query returns every artists that belong to the event

      if (storedEventsArtists.length > 0) { //only add artists if event has artists
        for (const eventArtist of storedEventsArtists) {
          parsedEvent.artists.push({ id: eventArtist.id, name: eventArtist.name, contact: eventArtist.contact });
        }
      }
      returnPastEvents.push(parsedEvent);
    }
    return res.status(200).json({ pastEvents: returnPastEvents });
  } catch (e) {
    console.error("Error while retrieving all past events: ", e);
    return res.status(500).json({ message: "Could not get all past events" });
  }
});

//get past event by id
app.get("/past-events/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: storedEventArtists } = await db.query(`
      SELECT * FROM past_events pe
      LEFT JOIN past_events_artists pea ON pe.id = pea.past_event_id
      LEFT JOIN artists a ON a.id = pea.artist_id
      WHERE pe.id = $1;
      `, [id]); //this query returns the event details along with all artists. Each entry is an artists, and all entries contain the event info
    if (storedEventArtists === 0) {
      throw new Error("Pg returned 0 rows");
    }

    //create object to send
    const parsedEvent = {
      id: storedEventArtists[0].past_event_id,
      imageURL: 'http:localhost:3000' + '/pastFlyers' + storedEventArtists.past_flyer_file_name, //CHANGE BASE PATH URL TO GLOBAL OR ENV
      title: storedEventArtists[0].title,
      subtitle: storedEventArtists[0].subtitle,
      desc: storedEventArtists[0].description,
      artists: storedEventArtists.map((eventArtist) => { return { id: eventArtist.id, name: eventArtist.name, contact: eventArtist.contact } }),
      place: storedEventArtists[0].place
    }

    return res.status(200).json({ pastEvent: parsedEvent });
  } catch (e) {
    console.error("Error occured while retrieving past event with id " + id, e);
    return res.status(500).send();
  }
});

// MEMBERS //

//create member endpoint (and middle ware)
async function generateMemberId(req, res, next) {

  try {
    const { rows: inserted } = await db.query("INSERT INTO members DEFAULT VALUES RETURNING *");
    if (inserted.length === 0) {
      throw new Error("Pg was unable to insert blank member for id generation");
    }
    req.memberId = inserted[0].id;
    next();
  } catch (e) {
    console.error("Error occured while adding member: ", e);
    return res.status(500).send();
  }
}

app.post("/members", authenticateUser, generateMemberId, uploadMemberImage.single("photo"), async (req, res) => {
  const { firstName, lastName, role, desc, funFact, type } = req.body;
  try {
    const { rows: inserted } = await db.query("UPDATE members SET first_name = $1, last_name = $2, role = $3, photo_file_name = $4, description = $5, fun_fact = $6, type = $7 WHERE id = $8 RETURNING *", [firstName, lastName, role, req.insertedFileName, desc, funFact, type, req.memberId]);
    if (inserted.length === 0) {
      throw new Error("Pg inserted 0 members");
    }
    return res.status(200).send();
  } catch (e) {
    console.error("Error occured while adding member: ", e);
    return res.status(500).send();
  }
});

//update member
app.put("/members/:id", uploadUpdatedMemberImage.single("photo"), async (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, role, photo, desc, funFact, type } = req.body;
  try {
    //get old flyer name and check if new flyer is a different type. Delete old file if new one is different type
    const { rows: member } = await db.query("SELECT * FROM members WHERE id = $1", [id]);
    if (member[0].photo_file_name !== req.insertedFileName) {
      await unlink("memberImages/" + member[0].photo_file_name);
    }

    //insert updated member details
    const { rows: updatedMember } = await db.query("UPDATE members SET first_name = $1, last_name = $2, role = $3, photo_file_name = $4, description = $5, fun_fact = $6, type = $7 WHERE id = $8 RETURNING *", [firstName, lastName, role, req.insertedFileName, desc, funFact, type, id]);
    if (updatedMember.length === 0) {
      throw new Error("Pg updated 0 members");
    }

    return res.status(200).send();
  } catch (e) {
    console.error("Error occured while updating member with id: " + id, e);
    return res.status(500).json({ message: "Could not update member" });
  }
});

//get members by type
app.get("/members/:type", authenticateUser, async (req, res) => {
  const type = req.params.type;
  if (!["executive", "other", ""].includes(type)) { //only accept certain types
    return res.status(404).json("This type doesn't exist");
  }

  try {
    const { rows: storedMembers } = await db.query("SELECT * FROM members WHERE type = $1", [type]);
    let parsedMembers = [];
    for (const storedMember of storedMembers) { //put each member in appropriate body
      const member = {
        id: storedMember.id,
        firstName: storedMember.firstName,
        lastName: storedMember.last_name,
        role: storedMember.role,
        photoUrl: "http://localhost:3000/" + "memberImages/" + storedMember.photo_file_name,
        desc: storedMember.description,
        funFact: storedMember.fun_fact,
      }

      parsedMembers.push(member);
    }

    return res.status(200).json({ members: parsedMembers });
  } catch (e) {
    console.error("Error occured while getting members: ", e);
    return res.status(500).send();
  }
});

//delete member
app.delete("/members/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { rows: deleted } = await db.query("DELETE FROM members WHERE id = $1 RETURNING *", [id]);
    if (deleted.length == 0) {
      throw new Error("Pg was unable to delete member");
    }


    //delete members photo
    await unlink("memberImages/" + deleted[0].photo_file_name);

    return res.status(200).send();
  } catch (e) {
    console.error("Error occured while deleting member with id " + id + ":", e);
    return res.status(500).send();
  }
})

app.listen(process.env.SERVER_PORT, () => {
  console.log("server started on port: " + process.env.SERVER_PORT);
});

