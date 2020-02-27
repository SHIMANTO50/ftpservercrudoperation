var express 	= require('express');
var router 		= express.Router();
var userModel   = require.main.require('./models/user-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){	
	if(req.cookies['username'] != null){
		userModel.getByUname(req.cookies['username'], function(result){
			res.render('home/index', {user: result});
		});
	}else{
		res.redirect('/logout');
	}
});

router.get('/alluser', function(req, res){
	userModel.getAll(function(results){
		if(results.length > 0){
			res.render('home/alluser', {userlist: results});
		}else{
			res.send('invalid username/password');
		}
	});
})


router.get('/edit/:userid', function(req, res){
	
	userModel.getById(req.params.userid, function(result){
		res.render('home/edit', {user: result});
	});
})

router.post('/edit/:userid', function(req, res){
	
	var user = {
		username:req.body.username,
		firstname: req.body.firstname,
		contactno:req.body.contactno,
		email:req.body.email,
		password:req.body.password,
		type: req.body.type,
		userid: req.params.userid
	};

	userModel.update(user, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/edit/'+req.params.id);
		}
	});
})


router.get('/delete/:userid', function(req, res){
	
	userModel.getById(req.params.userid, function(result){
		res.render('home/delete', {user: result});
	});
})

router.post('/delete/:userid', function(req, res){
	
	userModel.delete(req.params.id, function(status){
		if(status){
			res.redirect('/home/alluser');
		}else{
			res.redirect('/home/delete/'+req.params.id);
		}
	});
})
router.post('/', function(req, res){
		
		var user ={
			employeename: req.body.fullname,
			username: req.body.uname,
			password: req.body.password,
			type: req.body.type
		};

		userModel.insert(user, function(status){
			if(status){
				res.redirect('/home/alluser');
			}else{
				res.redirect('/home/alluser');
			}
		});
})



module.exports = router;

