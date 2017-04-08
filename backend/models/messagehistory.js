

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
	usr: { type: String, required: true },
	msg: { type: String, required: true }
});

mongoose.model('messageSchema', messageSchema);



