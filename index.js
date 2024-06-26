import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';
import axios from "axios";
import bodyparser from "body-parser";
import session from "express-session";

// NOTE: CREATE A '.env' OR REPLACE THE "process.env"s WITH THE VALID VALUES

const app = express();
const port = 7777; // YOU CAN ACCESS SITE ON "http://localhost:7777/"
const api_url = "http://localhost:4000"; // API WILL RUN ON PORT 4000

var otp=process.env.OTP;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,    // EMAIL WHICH WILL BE USED TO SEND EMAILS
        pass: process.env.EMAIL_PASSWORD // APP PASSWORD FOR THAT EMAIL
    },
});

// Takes Subject, message and reciver's email address as parameters.
async function sendMail(subject, message, reciever) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL, // EMAIL WHICH WE ARE USING TO SEND DATA
            to: reciever, // RECIEVER'S EMAIL
            subject: `${subject}`, // SUBJECT OF EMAIL
            text: `${message}`,
            html: `<b>${message}</b>`,
        });

        console.log(`~[SERVER] : Mail was sent to ${reciever} `);
    } catch (err) {
        console.log("~[SERVER] : Couldn't send email.", err);
    }
};

function logger(req, res, next) {
    var time = new Date().toLocaleString(); // GETS THE LOCAL TIME OF YOUR MACHINE
    console.log(`[SERVER] [${time}] : URL accessed ${req.url}.`);
    next();
}

app.use(logger);
app.use(express.static('public')); // Tells express to use items inside public folder as static
app.use(bodyparser.urlencoded({ extended: true })) // Allows to access the parsed form data in your Express route handlers using req.body
app.use(bodyparser.json()); // Enables the use of JSON in express server req.body

app.use(session({ // Session is used to store data in the server.
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.redirect("/home");
})

app.get('/home', async (req, res) => {
    const data = await axios.get(`${api_url}/posts`) // GETS ALL THE CURRENT POSTS

    const posts_result = data.data;
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

app.get('/signin', (req, res) => { // Working on it.
    res.status(200).redirect("/home");
})

app.get('/register', (req, res) => {
    res.status(200).render("register.ejs", { // Renders register page
        title: "Register",
    });
})

app.post('/register', async (req, res) => { // Takes the data from the form and posts it to API.
    const formData = req.body; 

    if (req.session.otp == formData.otp) { // Checks if generated OTP is same as entered OTP.
        const resp = await axios.post(`${api_url}/register`, formData); // sends form data to API
        console.log("API RESPONSE :", resp.data);
            
        if (resp.data === "User added") {
            // This will send email upon successful creation of account.
            sendMail("Account Created", 
            `Hey ${formData.username},<p>Your account was created on BlogWebApp`, 
            formData.email,) 

            // Redirects to home on successful creation of account.
            res.redirect('/home');
        } else {
            res.render("register.ejs", {
                title: "Register",
                error: resp.data
            });
        }
        
    } else {
        console.log("OTP entered is Wrong.");
        // Renders the register page and shows the wrong OTP error in red.
        res.render("register.ejs", {
            title: "Register",
            error: "OTP entered is Wrong."
        });
    }
});


app.post('/generate-otp', async (req, res) => {
    try {
        const resp = await axios.post(`${api_url}/otp-gen`); // GENERATES OTP WITH MESSAGE
        console.log(resp.data.otp);
        req.session.otp = resp.data.otp; // SAVES THE OTP IN SESSION

        const recieverEmail = req.body.data;
        console.log("Email:", recieverEmail);

        await sendMail("OTP", `Your otp is : ${req.session.otp}`, recieverEmail); // SENDS THE EMAIL
        res.sendStatus(200); // IF SUCCESSFUL THEN WEBSITE WILL FLASH SUCCESSS

    } catch(err) {
        res.sendStatus(404); // IF FAIL THEN WEBSITE WILL FLASH FAIL
    }
});

app.get('/contact', (req, res) => {
    res.status(200).redirect("/home");
});

app.get('/api', async (req, res) => { // USED TO GET 1 POST AT A TIME IN JSON
    try {

        let data = await axios.get(`${api_url}/posts`); // RETRIEVES ALL POSTS FROM DATABASE
        let index = Math.floor(Math.random() * 3);

        res.status(200).send(data.data[index]); 

    } catch(err) {
        res.status(404).send("Something happened");
        console.log(err);
    }
});

app.get('/post', (req, res) => {
    try {
        res.render('post.ejs', {
            title: "Post"
        });
        }
        catch (err) {
            res.send("Error ", err);
        }
});

app.post('/post', async (req, res) => {
    console.log(req.body);
    try {
        const resp = await axios.post(`${api_url}/post`, req.body); // POSTS THE DATA TO API
        res.redirect('/home'); // REDIRECTS TO HOME PAGE

    } catch (err) {
        res.send("Error ", err);
    }
});

app.listen(port, () => {
    console.log(`[SERVER] : The server is up and running on port ${port}`);
});