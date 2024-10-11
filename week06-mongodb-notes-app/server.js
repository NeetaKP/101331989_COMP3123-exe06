const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // import module 

const DB_URL = "mongodb+srv://neetukoirala:7IaaxNTqeyctT4zq@cluster0.thpsb.mongodb.net/lab06=true&w=majority&appName=Cluster0"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const noteRoutes = require('./routes/NoteRoutes')

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
// updated
DB_CONNECTION_STRING = "mongodb+srv://neetukoirala:7IaaxNTqeyctT4zq@cluster0.thpsb.mongodb.net/lab06=true&w=majority&appName=Cluster0"
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/',noteRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8082, () => {
    console.log("Server is listening on port 3000");
});