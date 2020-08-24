// --
let discordToken = "NzQyODU2MjA5Nzk0NTk2OTU1.XzMMwg.EvFb0uuKzXDfZv5e9oW8fz_7VVg";
// --

let express = require('express');
let morgan = require('morgan');
const gamedig = require('gamedig');
let mysql = require('mysql');
let discordjs = require('discord.js');

let bot = new discordjs.Client();
let app = new express();

app.use(morgan('dev'));
app.use(express.static('public'));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vrpfx"
});

bot.on('ready', () => {
    console.log(`[~] Discord bot connected (${bot.user.tag})`);
});

con.connect();
bot.login(discordToken);

app.get('/getPlayers', (req, res) => {
    if (req.query["ip"] != "" && req.query["ip"] != 0 && req.query["ip"] != undefined) {
        gamedig.query({
            type: 'fivem',
            host: req.query["ip"]
        }).then((state) => {
            res.send(state.players);
            res.end();
        }).catch((error) => {
            res.send([]);
            res.end();
        });
    }
});

app.get('/sendApplication', (req, res) => {
    let dId = req.query['dId'];
    let pId = req.query['pId'];
    let navn = req.query['navn'];
    let alder = req.query['alder'];
    let why = req.query['why'];
    let desc = req.query['desc'];
    if(dId != "" && dId != undefined && dId != 0 && pId != "" && pId != undefined && pId != 0 && navn != "" && navn != undefined && navn != 0 && alder != undefined && alder != "" && alder != 0 && why != "" && why != undefined && why != 0 && desc != "" && desc != undefined && desc != 0) {
        bot.channels.cache.get('747599441669783583').send(`<@293072294702481409> En ny ansøgning er kommet fra hjemmesiden\n> **Ansøgning til:** ${req.query['application']}\n> **Discord Id:** ${dId.replace("-(/swp/)-","#")}\n> **Spiller ID:** ${pId}\n> **Navn:** ${navn}\n> **Alder:** ${alder}\n> **Hvorfor skal vi vælge dig:** ${why}\n> **Beskriv dig selv:** ${desc}`); 
    }
    res.end();
});

app.get('/sendSupportMessage', (req, res) => {
    if(req.query['email'] != "" && req.query['email'] != undefined && req.query['pId'] != "" && req.query['pId'] != undefined && req.query['subject'] != "" && req.query['subject'] != undefined && req.query['message'] != "" && req.query['message'] != undefined) {
        bot.channels.cache.get('747596991781142638').send(`<@293072294702481409> En ny support besked er kommet fra hjemmesiden\n> Email: ${req.query['email']}\n> Spiller ID: ${req.query['pId']}\n> Emne: ${req.query['subject']}\n> Besked: ${req.query['message']}`); 
    }
    res.end();
});

app.get('/sendDonationCheckup', (req, res) => {
    if ( (req.query["pId"] != "" && req.query["pId"] != 0 && req.query["pId"] != undefined) && (req.query["idDiscord"] != "" && req.query["idDiscord"] != 0 && req.query["idDiscord"] != undefined) && (req.query["pName"] != "" && req.query["pName"] != 0 && req.query['pName'] != undefined && req.query["pName"] != undefined) && (req.query["pPhone"] != "" && req.query["pPhone"] != 0 && req.query["pPhone"] != undefined) ) {
        bot.channels.cache.get('747596725790703747').send(`<@293072294702481409> Et nyt donationstjek er kommet fra hjemmesiden.\n> Spiller id: ${req.query['pId']}\n> Discord id: ${req.query['idDiscord'].replace("-(/swp/)-","#")}\n> Navn: ${req.query['pName']}\n> Tlf. Nr. ${req.query['pPhone']}`);
    }
    res.end();
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