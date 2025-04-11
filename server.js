const express = require('express');
const app = express();
const path = require('path');

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date", function(req, res){
    let date = new Date(req.params.date);
    let fuso = parseFloat(req.query.fuso);

    if(isInvalidDate(date)){
        date = new Date(+req.params.date);
    };

    if(isInvalidDate(date)){
        res.json({error: "Invalid Date"});
        return;
    };

    if(!isNaN(fuso)){
        if(fuso > 12 || fuso < -12){
            if(fuso > 12){
                fuso = 12;
            }
            if(fuso < -12){
                fuso = -12;
            }
            res.redirect(`/api/${req.params.date}?fuso=${fuso}`);
        }
        if(fuso > 12){
            fuso = 12;
        }
        if(fuso < -12){
            fuso = -12;
        }
        date.setHours(date.getHours() + fuso);
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
        fuso_horario: fuso
    })
});

app.get("/api", function(req, res){
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString(),
    })
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT);