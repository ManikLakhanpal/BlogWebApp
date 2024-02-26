import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import axios from "axios";

// NOTE: CREATE A '.env' OR REPLACE THE "process.env"s WITH THE VALID VALUES

const app = express();
const port = 7777; // YOU CAN ACCESS SITE ON "http://localhost:7777/"
const api_url = "http://localhost:4000"; // API WILL RUN ON PORT 4000

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,    // EMAIL WHICH WILL BE USED TO SEND EMAILS
        pass: process.env.EMAIL_PASSWORD // APP PASSWORD FOR THAT EMAIL
    },
});

async function sendMail() {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL, // EMAIL WHICH WE ARE USING TO SEND DATA
            to: "lakhanpalmanik@protonmail.com", // RECIEVER'S EMAIL
            subject: "OTP", // SUBJECT OF EMAIL
            text: `Your OTP is ${otp}`,
            html: `<b>Your OTP is ${otp}</b>`,
        });

        console.log("Mail was sent.")
    } catch (err) {
        console.log("Couldn't send email.")
    }
};

function logger(req, res, next) {
    var time = new Date().toLocaleString(); // GETS THE LOCAL TIME OF YOUR MACHINE
    console.log(`[SERVER] [${time}] : URL accessed ${req.url}.`);
    next();
}

var otp; // CURRENTLY STORING OTPs HERE 

app.use(logger);
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect("/home");
})

app.get('/home', async (req, res) => {
    const posts_response = await axios.get(`${api_url}/posts`) // GETS ALL THE EMAILS

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
    const data = await axios.post(`${api_url}/register`); // DOES STEPS FOR REGISTRATION OF USER
    res.redirect("/home");
})

app.post('/generate-otp', async (req, res) => {
    try {
        const otpData = await axios.get(`${api_url}/otp-gen`); // GENERATES OTP
        otp = otpData.data;
        console.log(otp);
        await sendMail(); // SENDS THE EMAIL
        res.sendStatus(200); // IF SUCCESSFUL THEN WEBSITE WILL FLASH SUCCESSS
    } catch(err) {
        res.sendStatus(404); // IF FAIL THEN WEBSITE WILL FLASH FAIL
    }
})

app.get('/contact', (req, res) => {
    res.status(200).redirect("/home");
})

app.get('/api', async (req, res) => { // USED TO GET 1 POST AT A TIME
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