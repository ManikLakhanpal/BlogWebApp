import express from "express";
import 'dotenv/config';
import pg from "pg";

const port = 4000;
const app = express();

// NOTE: CREATE A '.env' OR REPLACE THE "process.env"s WITH THE VALID VALUES

const db = new pg.Client({  // ACCESSES THE DATABASE
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
        console.log(data.rows);
        res.send(data.rows);
        
    } catch (err) {
        console.log(`[SERVER] : There was some problems while retrieveing data ${err}`);
        res.status(404);
    }
});

app.post('/register', async (req, res) => { // REGISTERS THE USER WORK IN PROGRESS
    try {
        const data = await db.query("SELECT * FROM users");
        console.log(data.rows);
        res.send("done");
    } catch(err) {
        res.send("done")
    }
});

app.get('/otp-gen', async (req, res) => { //GENERATES A 6 DIGIT OTP
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    console.log(randomNumber);
    res.status(200).send(randomNumber.toString());
});

app.listen(port, () => {
    console.log(`[SERVER] : The API server is up and running on port ${port}`)
});