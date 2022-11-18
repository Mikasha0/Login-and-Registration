const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'userLogin'
})

app.post('/register', (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const pass = req.body.pass;

    db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)',
    [user, email, pass],(err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.send("values inserted")
        }
    });
});

app.post('/login', (req, res) => {
    const user = req.body.user;
    const pass = req.body.pass;

    db.query('SELECT * FROM users WHERE username= ? AND password= ?',
    [user, pass],(err, result) => {
        if (err) {
            console.log({err:err})
        }else {
            if(result.length > 0) {
                res.send(result);
            }else{
                res.send({message:"wrong username/password combination"});
            }
        }
    });
});

app.listen(4100,() => { 
    console.log("server running on port 4100.")
})