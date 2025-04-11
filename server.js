const express = require('express');
const app = express();
const path = require('path');

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

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
    let date1 = new Date(req.params.date1);
    let date2 = new Date(req.params.date2);

    let date1Unix = date1.getTime();
    let date2Unix = date2.getTime();
    
    let diff = Math.abs(date1Unix - date2Unix);
    
    let diffMilliseconds = diff;
    let diffSeconds = diffMilliseconds / 1000;
    let diffMinutes = diffSeconds / 60;
    let diffHours = diffMinutes / 60;
    let diffDays = diffHours / 24;

    res.json({
        date1: date1.toUTCString(),
        date1Unix: date1Unix,
        date2Unix: date2Unix,
        difference_milliseconds: diffMilliseconds,
        difference_seconds: diffSeconds,
        difference_minutes: diffMinutes,
        difference_hours: diffHours,
        difference_days: diffDays
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