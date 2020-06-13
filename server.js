var express=require('express');
var app=express();

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.listen(3000, function() {
    console.log('Server is running at http://127.0.0.1:3000');
});