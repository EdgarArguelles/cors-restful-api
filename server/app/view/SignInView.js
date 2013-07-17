exports.init = function (req, res) {

	var passport = req._passport.instance;

	var validate = function() {
		if (!req.body.username) {
			return res.send(400, 'Username required');
		}

		if (!req.body.password) {
			return res.send(400, 'Password required');
		};

		attemptLogin();
	};
	
	attemptLogin = function() {
		passport.authenticate('local', function(err, player, info) {
			if (err) return res.send(500, err);
			
			if (!player) {
				return res.send(400, 'Username and password combination not found.');
			} else {
				req.login(player, function(err) {
					if (err) return res.send(500, err);
					
					req.session.playerId = player._id;
					player.password = undefined;
					player.email = undefined;
					res.send(200, { player: player });
				});
			}
		})(req, res);
	};
	
	validate();
};