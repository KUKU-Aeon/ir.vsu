
const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload");
const firebase = require("firebase");
require("firebase/firestore");
require("firebase/auth");
require("firebase/database");

const bodyParser = require("body-parser");

const admin = require("firebase-admin");
const credentials = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

let initial_path = path.join(__dirname, "../vercel-node-app/public");

console.log(initial_path)

const app = express();

app.use(express.static(initial_path));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:   false
}));

app.use(fileupload({
    useTempFiles : true,
    tempFileDir : initial_path,
}));

app.use("/api/product", product);

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
});

app.get("/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "admin.html"));
});

//link uploads

app.post("/uploads", (req, res) =>{
    let file = req.files.image;
    console.log(req.files.name);
    let date = new Date();
    let filename = date.getDate() + date.getTime() + file.name;
    let path = "uploads/" + filename;
    console.log(path);
    file.mv(path, (err, result) => {
        if(err)
        {
            throw err;
        }
        else
        {
            res.json(`uploads/${filename}`);

        }
    });
});

app.post("/uploads/files/", (req, res) =>{
    let file = req.files.application;
    console.log(req.files.name);
    let date = new Date();
    let filename = date.getDate() + date.getTime() + file.name;
    let path = "uploads/files/" + filename;
    console.log(path);
    file.mv(path, (err, result) => {
        if(err)
        {
            throw err;
        }
        else
        {
            res.json(`uploads/files/${filename}`);

        }
    });
});

app.get("/profile/:profile", function (req, res){
    res.sendFile(path.join(initial_path, "/pages/profile.html"));

})

app.get("/:blog", function (req, res) {
    res.sendFile(path.join(initial_path, "/pages/blog.html"));
})



app.use((req, res) => {
    res.json("404");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("listening...")
});
