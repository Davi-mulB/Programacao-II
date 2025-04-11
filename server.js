const express = require('express');
const app = express();
const path = require('path');

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";
const isInvalidTimezone = (timezone) => timezone < -12 || timezone > 12;
const setTimezone = (timezone) => {if(timezone < -12){
        timezone = -12;
        return timezone;
    } if(timezone > 12){
        timezone = 12
        return timezone;
    }
}

app.get("/api/:date", function(req, res){
    let date = new Date(req.params.date);
    let timezone = parseFloat(req.query.timezone);

    if(isInvalidDate(date)){
        date = new Date(+req.params.date);
    };

    if(isInvalidDate(date)){
        res.json({error: "Invalid Date"});
        return;
    };

    if(!isNaN(timezone)){
        if(isInvalidTimezone(timezone)){
            timezone = setTimezone(timezone);
        }
        date.setHours(date.getHours() + timezone);
    }

    res.json({
        unix: date.getTime(),
        utc: date.toUTCString(),
        timezone: timezone
    })
});

app.get("/api/diff/:date1/:date2", function(req, res){
    let date1Raw = req.params.date1;
    let date2Raw = req.params.date2;

    
    let date1;
    if (isNaN(date1Raw)) {
        date1 = new Date(date1Raw);
    } else {
        date1 = new Date(Number(date1Raw));
    }

    let date2;
    if (isNaN(date2Raw)) {
        date2 = new Date(date2Raw);
    } else {
        date2 = new Date(Number(date2Raw));
    }

    if (isInvalidDate(date1) || isInvalidDate(date2)) {
        return res.json({error: "Invalid Date(s)"});
    }

    let diffMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    let diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24));
    let diffHours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    let diffSeconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000);

    res.json({
        date1: date1.toUTCString(),
        date2: date2.toUTCString(),
        difference: {
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        }
    });
});

app.get("/api", function(req, res){
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString(),
    })
});

app.use(express.static(path.join(__dirname, 'frontend')));

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); 
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);