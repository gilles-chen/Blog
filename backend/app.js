const express = require("express"); //import express
const app = express(); //initialize app with express
const Post = require("./api/models/posts");
var multer = require("multer");
const postsData = new Post();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
});

const getExt = (mimetype) => {
    switch(mimetype){
        case "image/png":
            return '.png';
        case "image/jpeg":
            return '.jpg';
    }
}

var upload = multer({ storage: storage });

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Allow anyone to access the api data
    next();
})

app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
})

app.post("/api/posts", upload.single("post-image"), (req, res) => {
    let filePath = req.file.path.replace("\\","/");
    const newPost = {
        "id": `${Date.now()}`,
        "title": req.body.title,
        "content": req.body.content,
        "post_image": filePath,
        "added_date": `${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send(newPost);
})

app.use('/uploads', express.static('uploads'));  //Make the upload folder available (public)

app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const posts = postsData.get();
    const foundPost = posts.find((post) => post.id == postId);
    if (foundPost) {
        res.status(200).send(foundPost);
    } else {
        res.status(404).send("Not Found");
    }
})

app.listen(3000, () => console.log("Listening on http://localhost:3000"));