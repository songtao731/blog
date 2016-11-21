var mongoose=require('mongoose');
var crypto=require('crypto');

var userschema=new mongoose.Schema({
	name:String,
	password:String,
	repassword:String,
	email:String	
})
var usermodel=mongoose.model('User',userschema);

function User(user){
	this.name=user.name;
	this.repassword=user.repassword;
	this.password=user.password;
	this.email=user.email;
	
}

User.prototype.save=function(callback){
	var password=crypto.createHash('md5').update(this.password.toLowerCase()).digest('hex'),
		repassword=crypto.createHash('md5').update(this.repassword.toLowerCase()).digest('hex');
	var user={
		name:this.name,
		password:password,
		repassword:repassword,
		email:this.email
	};
	var newUser=new usermodel(user);
	 newUser.save(function(err,user){
	 	if(err){
	 		return callback(err);
	 	}
	  	callback(null,user);
	 		 	
	 });		
};

User.get=function(name,callback){
	usermodel.findOne({name:name},function(err,user){
		if(err){
			return callback(err)
		}
		 callback(null,user);
		
	});	
};

module.exports=User;