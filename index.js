import express from "express";
import axios from "axios";

const app = express();
const port = 7777;
const api_url = "http://localhost:4000";

function logger(req, res, next) {
    var time = new Date().toLocaleString();
    console.log(`[SERVER] [${time}] : URL accessed ${req.url}.`);
    next();
}

app.use(logger);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect("/home");
})

app.get('/home', async (req, res) => {
    const posts_response = await axios.get(`${api_url}/posts`)

    const posts_result = posts_response.data;
    try {
        res.render("home.ejs", {
            title: "Home",
            posts: posts_result
        })
    }
    catch (error) {
    res.render("home.ejs", {
        title: "HOME",
    })
}
})

app.get('/signin', (req, res) => {
    res.status(200).redirect("/home");
})

app.get('/register', (req, res) => {
    res.status(200).render("register.ejs", {
        title: "Register",
    });
})

app.post('/register', async (req, res) => {
    const data = await axios.post(`${api_url}/register`);
    res.redirect("/home");
})

app.get('/contact', (req, res) => {
    res.status(200).redirect("/home");
})

app.get('/api', async (req, res) => {
    try {
        let data = await axios.get(`${api_url}/posts`);
        let index = Math.floor(Math.random() * 3);
        res.status(200).send(data.data[index]);
    } catch(err) {
        res.status(404).send("Something happened");
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`[SERVER] : The server is up and running on port ${port}`);
})