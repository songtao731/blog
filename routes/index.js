var User = require('../models/user.js');
var Post = require('../models/post.js');
var crypto = require('crypto');
var ccap=require('ccap');


function checkLogin(req, res, next) {
	if(!req.session.user) {
		res.redirect('/login')
	}
	next();
}

function checkNotLogin(req, res, next) {
	if(req.session.user) {
		res.redirect('back')
	}
	next();
}



module.exports = function(app) {
	//主页
	app.get('/', function(req, res, next) {
	
		if(!req.session.user) {
			return res.redirect('/login');

		};
		res.render('index', {
			title: '主页',
			user: req.session.user
		});

	});
	//注册
	app.get('/reg', checkNotLogin);
	app.get('/reg', function(req, res, next) {
	 
		res.render('reg', {
			title: '注册',
			user: req.session.user
		})
	});
	app.get('/regcode',function(req,res,next){
		var b=ccap();		
		var a=b.get();
		req.session.img=a[0];
		res.send(a[1]);
	});	

	app.post('/reg', checkNotLogin);
	app.post('/reg', function(req, res, next) {
		var name = req.body.name,
			password = req.body.password,
			repassword = req.body.repassword,
			email = req.body.email;
		if(password != repassword) {
			res.json({
				code: 10001,
				info: '两次密码输入不一样'
			})
			return;
		};
		if(!password) {
			res.json({
				code: 10002,
				info: '请输入密码'
			})
			return;
		};
		if(!name) {
			res.json({
				code: 10003,
				info: '请输入用户名'
			})
			return;
		};
		if(!email) {
			res.json({
				code: 10004,
				info: '请输入邮箱'
			})
			return;
		};

		var newUser = new User({
			name: name,
			password: repassword,
			repassword: repassword,
			email: email
		})

		User.get(newUser.name, function(err, user) {

			if(err) {
				res.json({
					code: 100021,
					info: 'shujuqi[dashj'
				})
				return
			}

			if(user) {
				res.json({
					code: 10002,
					info: '用户名已经存在'
				})
				return
			}
			newUser.save(function(err, user) {
				req.session.user = user;
				res.json({
					code: 10000,
					info: '注册成功'
				})

			})

		})

	});
   //登陆
	app.get('/login', checkNotLogin);
	app.get('/login', function(req, res, next) {
		res.render('login', {
			title: '登陆',
			user: req.session.user
		})
	});

	app.post('/login', checkNotLogin);
	app.post('/login', function(req, res, next) {
		var password = crypto.createHash('md5').update(req.body.password.toLowerCase()).digest('hex');
		User.get(req.body.name, function(err, user) {
			if(!user || user.password != password || user.name != req.body.name) {
				res.json({
					code: 10001,
					info: '账号或者密码错误'
				})
			} else {
				req.session.user = user;
				res.json({
					code: 10000,
					info: '登陆成功'
				})

			}

		})

	});
	//发表
	app.get('/post', function(req, res, next) {
		res.render('post', {
			title: '发表',
			user: req.session.user
		})

	});
	app.post('/post', checkLogin);
	app.post('/post', function(req,res,next) {
		var postname = req.session.user;		
		if(req.files.pupload){			
		var post= new Post(postname.name, req.body.title, req.body.post,req.files.pupload.path);
		}else{				
		var	post= new Post(postname.name, req.body.title, req.body.post);
		}
		post.save(function(err) {
			if(err) {
				return res.json({
					code: 10001,
					info: '发表失败'
				})
			};
			res.redirect('/')
		})

	});
	//退出
	app.get('/logout', checkLogin);
	app.get('/logout', function(req, res, next) {
		req.session.user = null;
		res.redirect('/')

	});
	
		//上传功能
	app.get('/upload',checkLogin);
	app.get('/upload',function(req,res,next){
		res.render('upload',{
			title:'文件上传',
			user:req.session.user			
			
		})	
	});
	app.post('/upload',function(req,res,next){
		var a={};
		a.text=req.body.text;
		for(var i in req.files){
			a[i]=req.files[i].path;
			
		}
		res.json(a)
	
		//res.redirect('/');
	});
	
	//获取文章列表
	app.get(/\/api\/w+/,checkLogin);	
	app.get('/api/getAll',function(req, res, next){		
		Post.getAll(req.session.user.name, function(err, user) {
			if(err) {
				return res.json({
					code: 10001,
					info: '获取失败'
				})
			}
			return	res.json(user);
		})
	});
	
	/*	app.get('/api/:name',function(req,res){
		Post.getAll(req.params.name,function(err,posts){
			if(!posts){
				return res.redirect('/');
			}
			return	res.json(posts)
					
		})		
	});*/
	
	app.get(/\/u\/\w+/,checkLogin);		
	app.get('/u/:name',function(req,res){
		res.render('user',{
				title:req.params.title,
				user:req.session.user
				
		})
		
	});
	app.get(/\/api\/\w+/,function(req, res, next){	
		Post.getAll(req.session.user.name, function(err, user) {
			if(err) {
				return res.json({
					code: 10001,
					info: '获取失败'
				})
			}
			return	res.json(user);
		})
	});
	
	
	
	app.get('/u/:name/:day/:title',function(req,res){
		Post.getOne(req.params.name,req.paramsday,req.params.title,function(err,post){
			if(err){
				return res.redirect
			}
			res.render('article',{
				title:req.params.title,
				post:post,
				user:req.session.user
				
			})
			
		})
		
	})
	
	

};
	
