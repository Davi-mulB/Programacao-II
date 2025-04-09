const express = require('express');
const app = express();
const path = require('path')

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
})

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT)