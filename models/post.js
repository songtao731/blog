var mongoose=require('mongoose');

function Post(name,title,post,url){
	this.name=name;
	this.title=title;
	this.post=post;	
	this.url=url;
}


var postschema=new mongoose.Schema({
	name:String,
	title:String,
	post:String,
	time:String,
	url:String
})

var postmodel=mongoose.model('Post',postschema); 

Post.getAll=function(name,callback){	
  postmodel.find({name:name},function(err,user){
  	 if(err){
  	 	return callback(err)
  	 }
  	 callback(null,user)
  })			
};
Post.prototype.save=function(callback){	

	var date=new Date(),time;
	time=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDay()+' '+date.getHours()+':'+date.getSeconds()+':'+date.getMinutes();	
	var post={
		name:this.name,
		title:this.title,
		post:this.post,
		time:time,
		url:this.url
	};

	var newpost=new postmodel(post);
	
	newpost.save(function (err,user){
		console.log(user)
		if(err){
			return callback(err)
		}
		callback(null,user);
	})		

	
}
module.exports=Post;