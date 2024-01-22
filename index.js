import express from "express";

const app = express();
const port = 7777;

function logger(req, res, next) {
    var time = new Date().toLocaleString();

    console.log(`[SERVER] [${time}] : URL accessed ${req.url}.`);
    next();
}

app.use(logger);
app.use(express.static('public'));

app.get('/home', (req, res) => {
    res.render("home.ejs", {
        title: "Home",
    })
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

app.listen(port, () => {
    console.log(`[SERVER] : The server is up and running on port ${port}`);
})