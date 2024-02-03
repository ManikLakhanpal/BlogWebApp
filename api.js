import express from "express"
import fs from "fs";

const port = 4000;
const app = express();

app.get('/posts', (req, res) => {
    try {
        const js = fs.readFileSync("data.json", "utf8");
        res.send(JSON.parse(js)).status(200);
        
    } catch (err) {
        console.log(`[SERVER] : There was some problems while retrieveing data ${err}`);
        res.status(404);
    }
})


app.listen(port, () => {
    console.log(`[SERVER] : The API server is up and running on port ${port}`)
})