

module.exports = function(app){
	app.get('/', function(req, res, next) {
       res.render('index', { title: 'Express' });
  });
	app.get('/reg',function(req,res,next){
		 res.render('req',{})
		
		
	})
};
