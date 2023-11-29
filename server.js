const express = require("express");
require('dotenv').config()
const mongoose = require("mongoose")
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/", require("./routes/routes.js"));

const Url = process.env.dbURI;

mongoose.connect(Url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        const PORT = process.env.PORT || 8888;
        app.listen(PORT, () => {
            console.log("server is created");
        });
    })
    .catch((err) => console.log(err));









