const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    description: {
        type: "String"
    },

    

    image: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
        set: v => v === "" ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" : v
    },

    price: {
        type: Number
    },  
    location: {
        type: "String"
    },
    country: {
        type: "String"
    }
});


const Listing = mongoose.model("Listing", listSchema);

module.exports = Listing;
