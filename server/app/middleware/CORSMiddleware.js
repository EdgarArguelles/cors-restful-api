exports = module.exports = function(app) {

	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "http://localhost:9000");
		res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
		res.header("Access-Control-Allow-Credentials", "true");
		next();
	});

	app.options('*', function(req, res){
		res.send(200); 
	});

}