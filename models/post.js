var mongoose=require('mongoose');

function Post(name,title,post){
	this.name=name;
	this.title=title;
	this.post=post;	
}


var postschema=new mongoose.Schema({
	name:String,
	title:String,
	post:String	
})

var postmodel=mongoose.model('Post',postschema); 

Post.get=function(name,callback){	
  postmodel.findOne({name:name},function(err,user){
  	 if(err){
  	 	return callback(err)
  	 }
  	 callback(null,user)
  })			
};
Post.prototype.save=function(callback){	

	var date=new Date(),time;
	time=date.getFullYear()+'-'+date.getMonth()+'-'+date.getDay()+'-'+date.getHours()+'-'+date.getHours()+'-'+date.getSeconds()+'-'+date.getMinutes();	
	var post={
		name:this.name,
		title:this.title,
		post:this.post,
		time:time
	};
	console.log(post,33333333333)
	var newpost=new postmodel(post);
	
	newpost.save(function (err,user){
	
		if(err){
			return callback(err)
		}
		callback(null,user);
	})		

	
}
module.exports=Post;