const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');

app.use(express.json());

app.listen(
    PORT
);

app.get('/burger', (req, res) => {
    let json = require('/Users/mathi/Documents/Projets/RestAPI/db.json');
    res.status(200).send({
        json
    })
});

app.get('/burger/:id', (req, res) => {
    const { id } = req.params;
    let json = require('/Users/mathi/Documents/Projets/RestAPI/db.json');
    const foundBurger = json.burgers.find(burger => burger.id == id);
    res.send({
        foundBurger
    })
});

app.post('/burger', (req, res) => {
    const { burgerToAdd } = req.body;
    if (!burgerToAdd) {
        res.status(418).send({ message: "We need a body" });
    } else {
        const id = burgerToAdd.id;
        let json = require('/Users/mathi/Documents/Projets/RestAPI/db.json');
        const foundBurger = json.burgers.find(burger => burger.id == id);
        if (foundBurger) {
            res.status(419).send({ message: "Burger already existing" });
        }
        else {
            let db = fs.readFileSync("/Users/mathi/Documents/Projets/RestAPI/db.json", "utf-8");
            let burgers = JSON.parse(db);
            burgers.burgers.push(burgerToAdd);
            db = JSON.stringify(burgers);
            fs.writeFileSync("/Users/mathi/Documents/Projets/RestAPI/db.json", db);
            res.status(218).send({ message: "Burger added" });
        }
    }
});
