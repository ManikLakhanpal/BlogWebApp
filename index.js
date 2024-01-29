import express, { response } from "express";
import axios from "axios";
import fs from "fs";
import { title } from "process";

const app = express();
const port = 7777;

function logger(req, res, next) {
    var time = new Date().toLocaleString();
    readJson();
    console.log(`[SERVER] [${time}] : URL accessed ${req.url}.`);
    next();
}

let json;

function readJson() {
    try {
        json = fs.readFileSync("data.json", "utf8");

    } catch (err) {
        console.error('Error reading the JSON file:', err);
    }
}

readJson();

let jsonArray = JSON.parse(json);

app.use(logger);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect("/home");
})

app.get('/home', async (req, res) => {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
    const result = response.data;
    try {
        res.render("home.ejs", {
            title: "Home",
            joke: JSON.stringify(result.joke),
        })
    }
    catch (error) {
    res.render("home.ejs", {
        title: "HOME",
        joke: JSON.stringify(result.delivery),
    })
}
})

app.get('/signin', (req, res) => {
    res.redirect("/home");
})

app.get('/about', (req, res) => {
    res.redirect("/home");
})

app.get('/contact', (req, res) => {
    res.redirect("/home");
})

app.get('/api', (req, res) => {
    let index = Math.floor(Math.random() * 3); // Floor rounds the number to nearest integer and random generates from 0.0 to 1.0 only
    res.send(jsonArray[index]);
})

app.listen(port, () => {
    console.log(`[SERVER] : The server is up and running on port ${port}`);
})