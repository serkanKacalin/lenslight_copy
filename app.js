import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";


dotenv.config();

// connection to the DB
conn();

const app = express();
const port = process.env.PORT;

// ejs template engine
app.set('view engine', 'ejs'); // ejsyi template engine olarak belirledik.

// static files middleware(ara yazılım)
app.use(express.static('public'));
app.use(express.json()); // bu satır gönderdiğimiz json formatındaki verileri okumak için 

// routes
app.use("/", pageRoute); // "/" yani kök adresimize gelen bir isteği pageRoute dosyamıza gönderdik.
app.use('/photos', photoRoute); // /photos a bir istek geldiğinde photoRoute'a yönlendirdik

app.listen(port, () => {
    console.log("Application running on port: 3000");
});
 