
var vogels = require('vogels');
vogels.AWS.config.loadFromPath('./config.json');

/*
Define Contact model
 */
var Contact = vogels.define('Contact', function (schema) {
  schema.UUID('id', {hashKey: true});
  schema.String('email');
  schema.String('name'); 
  schema.Number('age'); 
});
Contact.config({tableName: 'Contacts'});

/*
 * GET contact listing.
 */

exports.list = function(req, res, next){
	Contact.scan().exec(function(err,contacts){
	  if (err) {
			res.statusCode = 500;
			res.json(err);
    		return;
	  }
	  else {
	  	res.json(contacts);	
	  }

	});
	
};


exports.getById = function(req, res, next){
	Contact.get(req.param("id"), function (err, contact) {
		if(contact == null){
			res.statusCode = 404;
			res.json({"message":"Contact not found"});
			return;
		}
		res.json(contact);
	});	
};

exports.create = function(req, res){
	var email = req.param("email");
	if(email == null){
		res.statusCode = 400;
		res.json({"message":"Email parameter missing"});
		return;
	}
	var age = req.param("age");
	if(age == null){
		res.statusCode = 400;
		res.json({"message":"Age parameter missing"});
		return;
	}
	var name = req.param("name");
	if(name == null){
		res.statusCode = 400;
		res.json({"message":"Name parameter missing"});
		return;
	}

	Contact.create({email: email, name: name, age: age}, function (err, acc) {
	  if (err) {
			res.statusCode = 500;
			res.json(err);
    		return;
	  }
	  else {
			res.statusCode = 200;
			res.json({ message: 'Contact created' });	
	  }
	});	
};

exports.update = function(req, res){
	var id = req.param("id");
	if(id == null){
		res.statusCode = 400;
		res.json({"message":"Id parameter missing"});
		return;
	}

	var email = req.param("email");
	if(email == null){
		res.statusCode = 400;
		res.json({"message":"Email parameter missing"});
		return;
	}
	var age = req.param("age");
	if(age == null){
		res.statusCode = 400;
		res.json({"message":"Age parameter missing"});
		return;
	}
	var name = req.param("name");
	if(name == null){
		res.statusCode = 400;
		res.json({"message":"Name parameter missing"});
		return;
	}

	Contact.update({id:id, email: email, name: name, age: age}, function (err, acc) {
	  if (err) {
			res.statusCode = 500;
			res.json(err);
    		return;
	  }
	  else {
			res.statusCode = 200;
			res.json({ message: 'Contact updated' });	
	  }
	});	
};

exports.delete = function(req, res){
	var id = req.param("id");
	if(id == null){
		res.statusCode = 400;
		res.json({"message":"Id parameter missing"});
		return;
	}
	Contact.destroy('foo@example.com', function (err) {
	  if (err) {
			res.statusCode = 500;
			res.json(err);
    		return;
	  }
	  else {
			res.statusCode = 200;
			res.json({ message: 'Contact deleted' });	
	  }
	});
};