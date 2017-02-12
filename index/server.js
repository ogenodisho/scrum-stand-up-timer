const express = require('express');

const app = express();

app.use('/webpack', express.static(__dirname + '/../webpack'));

app.get('*', function(req, res) {
    res.sendfile('index.html');
});

app.listen(3000);
