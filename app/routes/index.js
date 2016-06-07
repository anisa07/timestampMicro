'use strict';
var path = process.cwd();

module.exports = function (app, passport) {
	
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	
	app.get(/\/.+/, function(req, res){
		var result = {}
		if (req.originalUrl !== "/favicon.ico"){
			var part = req.originalUrl.replace(/\//g, "").replace(/%20/g, " ");
			if (!isNaN(parseInt(part))){
				var date = new Date(parseInt(part))
				result.unix = parseInt(part);
				var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				result.natural = monthNames[date.getMonth()] + " " + date.getDate() +", "+ date.getFullYear(); 
			} else {
				var date = new Date(part)
				if (date.toString() === "Invalid Date") {
					result.unix = null;
					result.natural = null;
				} else {
					result.unix = Date.parse(part);
					result.natural = part;	
				}
			}
		}
		res.json({ unix: result.unix ,  natural: result.natural});
	})
};
