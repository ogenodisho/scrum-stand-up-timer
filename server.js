const express = require('express');

const app = express();

app.use('/webpack', express.static(__dirname + '/webpack'));

app.get('*', function(req, res) {
    res.sendfile('index/index.html');
});

app.listen(process.env.PORT || 3000);
