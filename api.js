import express from "express";
import 'dotenv/config';
import pg from "pg";
import bodyparser from "body-parser";
import bcrypt from "bcrypt";

const port = 4000;
const app = express();
const saltRounds = 10;

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// NOTE: CREATE A '.env' OR REPLACE THE "process.env"s WITH THE VALID VALUES

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "data",
    password: process.env.PASSWORD,
    port: 5432
  });

db.connect(); // CONNECTS US WITH THE DATABASE

app.get('/posts', async (req, res) => { // THIS SENDS BACK ALL THE POSTS IN DATABASE
    try {
        const data = await db.query("SELECT * FROM posts");
        console.log(`[SERVER] : All the posts are sent.`);
        res.json(data.rows);
        
    } catch (err) {
        console.log(`[SERVER] : There was some problems while retrieveing data ${err}`);
        res.status(404);
    }
});

app.post('/register', async (req, res) => { 
    try {
        const data = await db.query("SELECT * FROM users WHERE email = $1 OR username = $2", // CHECKS IF ID ALREADY EXISTS OR NOT
        [req.body.email, req.body.username]);
        
        if (data.rows.length == 0 ) { // IF NOT INSERTS DATA TO THE DATABASE
            try {
                // The following code hashes password and stores it to the database.
                bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
                    if (err) { // If any error in hashing api will pass a error.
                        console.log(err);
                        res.send("Internal Server error.");

                    } else {
                        
                        const resp = await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
                        [req.body.username, req.body.email, hash]);

                        console.log(`SERVER : ACCOUNT CREATED ${req.body.username}\t${req.body.email}\n`);
                        res.send("User added");
                    }
                });

            } catch (err) {
                console.log("User not added because ", err, "\n");
                res.send("User not added because ", err);
            }
        }
        else { //IF USER ALREADY IN THE DATABSE
            console.log("EMAIL OR USERNAME ALREADY EXISTS\n")
            res.send("EMAIL OR USERNAME ALREADY EXISTS");
        }

    } catch(err) {
        console.error("Internal Server Error", err);
        res.send("Internal Server Error");
    }
});

app.post('/otp-gen', async (req, res) => { //GENERATES A 6 DIGIT OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`[SERVER] : New otp generated : ${otp}`);
    res.status(200).json({otp});
});

app.post('/post', async (req, res) => { // ADDS POST TO THE DATABASE
    try {
        console.log(req.body);
        await db.query("INSERT INTO posts (title, content, author, date) VALUES ($1, $2, $3, $4)", 
        [req.body.title, req.body.content, req.body.author, req.body.date]);
        res.sendStatus(200);
    } catch(err) {
        console.log("Error while adding post", err);
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`[SERVER] : The API server is up and running on port ${port}`)
});