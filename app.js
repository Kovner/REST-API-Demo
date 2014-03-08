var express = require("express");
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
	res.render("index.html");
});

var port = Number(process.env.PORT || 8888);
app.listen(port);
console.log("Listening on port " + port);