import express from "express";
import 'dotenv/config';
import pg from "pg";

const port = 4000;
const app = express();

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "data",
    password: process.env.PASSWORD,
    port: 5432
  });

db.connect();

app.get('/posts', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM posts");
        console.log(data.rows);
        res.send(data.rows);
        
    } catch (err) {
        console.log(`[SERVER] : There was some problems while retrieveing data ${err}`);
        res.status(404);
    }
})

app.post('/register', async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM users");
        console.log(data.rows);
        res.send("done");
    } catch(err) {
        res.send("done")
    }
})

app.listen(port, () => {
    console.log(`[SERVER] : The API server is up and running on port ${port}`)
})