require("dotenv").config()

const morgan = require("morgan")
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()


const {PORT,DATABASE_URL} = process.env


/// Middlesware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
///

// MongoDB Conection 
mongoose.connect(DATABASE_URL)
mongoose.connection
.on('open', () => console.log("i'm connnected"))
.on('close', () => console.log("i'm Disconected"))
.on('error', (error) => console.log(error))
//

/// Cheese Models
const cheeseSchema = mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheese = mongoose.model('Cheese', cheeseSchema)

// IDUCS

app.get("/cheese",async(req,res)=>{
    try {
        const response = await Cheese.find({})
        res.json(response)
    } catch (error) {
        res.status(400).json(error)
    }
});

app.post("/cheese",async(req,res)=>{
    try {
        const cheese = await Cheese.create(req.body)
        res.json(cheese)
    } catch (error) {
        res.status(400).json(error)
    }
});

app.get("/cheese/:id", async(req,res)=>{
    try {
        const cheese = await Cheese.findById(req.params.id)
        res.json(cheese)
    } catch (error) {
        res.status(400).json(error)
    }
});

app.put("/cheese/:id", async(req,res)=>{
    try {
        const cheese = await Cheese.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.json(cheese)
    } catch (error) {
        res.status(400).json(error)
    }
});

app.delete("/cheese/:id", async(req,res)=>{
    try {
        const cheese = await Cheese.findByIdAndDelete(req.params.id)
        res.status(204).json(cheese)
    } catch (error) {
        res.status(400).json(error)
    }
});


// test route
app.get('/',(req,res)=>{
    res.json({Name:"test route "})
})



app.listen(PORT, () => console.log(`listening on port ${PORT}`))
