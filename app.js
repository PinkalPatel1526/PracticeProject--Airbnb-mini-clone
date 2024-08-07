//extrenal file, library and framworks
const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');

//server code->
const app = express();

//middlewheres 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//to get params data 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//for use public dir
app.use(express.static(path.join(__dirname, '/public')));

//for method override like delete, patch ect.
app.use(methodoverride("_method"));

//for ejs mate
app.engine('ejs', ejsMate);



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/HomeHavenly');
}

main().then((res) => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Hello, i am root.");
});

//all Listing route
app.get("/listing", (req, res) => {
    Listing.find({}).then((docs) => {
        res.render("listing/allListing.ejs", {docs});
    }).catch((err) => {
        console.log(err);
    });
});

//create a new listing 
app.get("/listing/new", (req, res) => {
    res.render("listing/new.ejs");
})

//show specific list(show route)
app.get("/listing/:id", async (req, res) => {
    const {id} = req.params;
    
    const docs = await Listing.findById(id);

    res.render("listing/show.ejs", {docs});

});

//post new listing data into BD
app.post("/listing", (req, res) => {
    const newDocs = req.body;

    const docs = new Listing(newDocs);

    docs.save().then(() => {
        res.redirect("/listing");
    }).catch((err) => {
        console.log(err);
    });
}); 

//for update
app.get("/listing/:id/edit", async (req , res) => {
    const {id} = req.params;

    const docs = await Listing.findById(id);
    res.render("listing/edit.ejs", {docs})
});

//update in DB 
app.put("/listing/:id", async (req, res) => {
    const {id} = req.params;
    const editedDocs = req.body;

    await Listing.findByIdAndUpdate(id,editedDocs);
    res.redirect("/listing");
       
});

//delete listing
app.delete("/listing/:id",async (req, res) => {
    const {id} = req.params;
    const del =  await Listing.findByIdAndDelete(id);

   
    res.redirect("/listing");
})

//server connection
app.listen(8080, () => {
    console.log("server run on port 8080");
});
