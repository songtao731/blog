var User = require('../models/user.js');

module.exports = function(app) {
	app.get('/', function(req, res, next) {
		res.render('index', {
			title: '主页'
		});
	});
	app.get('/reg', function(req, res, next) {
		res.render('reg', {
			title: '注册'
		})
	});
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

			if(err){
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
				
				res.json({
					code: 10000,
					info: '注册成功'
				})

			})

		})

	});
	app.get('/login', function(req, res, next) {
		res.render('login', {
			title: '登陆'
		})
	});
	app.get('/login', function(req, res, next) {

	});
	app.get('/post', function(req, res, next) {
		res.render('post', {
			title: '发表'
		})
	});
	app.post('/post', function(req, res, next) {

	});
	app.get('/logout', function(req, res, next) {

	});

};