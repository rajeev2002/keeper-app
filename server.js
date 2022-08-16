const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const bodyParser= require("body-parser");
const cors = require("cors");

//routes

const notesRoute = require("./routes/notes");
const usersRoute = require("./routes/users");
const newUserRoute = require("./routes/newUser")

const app = express();

const port = process.env.PORT||8000;

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error",error => console.log(error));
db.once("open",() => console.log("connected to Database."));

app.use(express.json());   
app.use(bodyParser.json());
app.use(cors());

app.use('/api/newUser',newUserRoute);
app.use('/api/notes',notesRoute);
app.use('/api/users',usersRoute);

app.listen(port,() => console.log("server started."));

