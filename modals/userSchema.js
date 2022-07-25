const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name:{
		type:String,
		required:true  
	},
	password:{
		type:String,
		required:true
	},
	imgUrl:String
});


const UserModel = mongoose.model("users",UserSchema);


module.exports = UserModel;