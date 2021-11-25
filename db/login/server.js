const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
// Middleware
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true }));

// To parse cookies from the HTTP Re

// Route to Homepage
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/static/index.html');
})
// Route to Login Page
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/static/index.html');
})

app.post('/login', (req,res) => {
    // Insert Login Code Here
    let username = req.body.username;
    let password = req.body.password;
    res.send(`Username: ${username} Password: ${password}`);
});

const port = 3000

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));