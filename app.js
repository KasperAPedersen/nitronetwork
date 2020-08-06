let express = require('express');
let morgan = require('morgan');
const gamedig = require('gamedig');
let mysql = require('mysql');

let app = new express();

app.use(morgan('dev'));
app.use(express.static('public'));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vrpfx"
});

con.connect();

app.get('/getPlayers', (req, res) => {
    if (req.query["ip"] != "" && req.query["ip"] != 0 && req.query["ip"] != undefined) {
        gamedig.query({
            type: 'fivem',
            host: req.query["ip"]
        }).then((state) => {
            res.send(state.players);
            res.end();
        }).catch((error) => {
            console.log("Server is offline");
            res.end();
        });
    }
});

app.get('/getCurrentPlayers', (req, res) => {
    let currentPlayers = 0;

    con.query(`SELECT * FROM swoopweb`, (err, result, fields) => {
        if(result != undefined) {
            currentPlayers = currentPlayers + result.length;
            res.json({
                'currentAmountOfPlayers': currentPlayers
            });
            res.end();
        }
    });
});

app.get('/getCurrentAdmins', (req, res) => {
    let currentAdmins = 0;

    con.query(`SELECT * FROM swoopweb WHERE admin = 1`, (err, result, fields) => {
        if(result != undefined) {
            currentAdmins = currentAdmins + result.length;
            res.json({
                'currentAmountOfAdmins': currentAdmins
            });
            res.end();
        }
    });
});

app.get('/getPlayerCount', (req, res) => {
    let amountOfPlayers = 0;

    con.query(`SELECT COUNT(*) FROM vrp_users`, (err, result, fields) => {
        if(result != undefined && err == undefined) {
            amountOfPlayers = result.length;
            res.json({
                'currentAmountOfPlayers': amountOfPlayers
            });
            res.end();
        }
    });
});

app.listen(3000, (err) => {
    console.log(err ? err : `Listening on port 3000`);
});