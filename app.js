var XMLWriter = require('xml-writer');
var pd = require("pretty-data").pd;
var request = require("request");
var express = require("express");
var app = express();

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.urlencoded());
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
	var reqxml = new XMLWriter();
	reqxml.startElement('tsRequest').startElement('credentials').writeAttribute('name', req.body.Username)
		.writeAttribute('password', req.body.Pass).startElement('site').writeAttribute('contentUrl', '');
	req.session.reqTxt = pd.xml(reqxml.toString());
	request.post(
		{
			url: 'http://localhost/api/2.0/auth/signin',
			body: reqxml.toString(),
			headers: {'Content-Type': 'text/xml'}
		},
		function(err, response, body) {
			if(err) {
				req.session.resTxt = err;
			} else {
				req.session.resTxt = body;
			}
			res.redirect('/');
		}
	);
});

var port = Number(process.env.PORT || 8000);
app.listen(port);
console.log("Listening on port " + port);