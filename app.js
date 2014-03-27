var express = require("express");
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(express.cookieParser('Ronaldinho'));
app.use(express.session());

app.get('/', function(req,res) {
	res.render("index.ejs", {
		requestText: req.session.reqTxt,
		responseText: req.session.resTxt
	});
});

app.post('/login', function(req,res) {
	req.session.reqTxt = "Hello";
	req.session.resTxt = "World";
	res.redirect('/');
});

var port = Number(process.env.PORT || 8888);
app.listen(port);
console.log("Listening on port " + port);