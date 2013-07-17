exports = module.exports = function(app, mongoose) {

	var UserSchema = new mongoose.Schema({
		name: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		facebook: {
			id: { type: Number }
		}
	});

	UserSchema.statics.encryptPassword = function(password) {
		return require('crypto').createHmac('sha512', app.get('crypto_key')).update(password).digest('hex');
	};


	mongoose.model('User', UserSchema);
}