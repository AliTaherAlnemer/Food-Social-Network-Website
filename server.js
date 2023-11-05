

const uri = "mongodb+srv://alitalnemer:A123AliAln@cluster0.y0qrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const port = 3000;
const process=require('process');
const fs=require('fs');
const multer = require('multer');
const mongoose = require('mongoose')
const express = require('express')
const cookieParser =require('cookie-parser');
const crypto =require('crypto');
let app=express();
const parser= require('body-parser')

const db=mongoose.connection;
const hostname = '127.0.0.1'
const mongoDBURL=uri;
app.use(cookieParser());
app.use(parser.json())
app.use(parser.urlencoded({extended: true}));
mongoose.connect(uri,
	{ useNewUrlParser: true , useUnifiedTopology: true })
	.then(()=>{ return console.log("Connected to MongoDB Localhost...");
	})
	.catch(err => console.log("Could not connect",err))
mongoose.connect(mongoDBURL,{useNewUrlParser: true});
db.on('error',console.error.bind(console,' Mongodb connection error'));

var upload = multer({dest: __dirname + '/uploads/images' });

var sessionsKeys={};
var save3="";

function updateSessions(){
	let now =Date.now();
	for(x in sessionsKeys){
		if(sessionsKeys[x][1]<(now-300000)){
			delete sessionsKeys[x];
		}

	}
}
setInterval(updateSessions,2000);

var Schema=  mongoose.Schema;
var ChatMessageSchema= new Schema({
	time:Number,
	alias:String,
	message:String,
});
var ChatMessage =mongoose.model('ChatMessage', ChatMessageSchema);
var chatSchema= new Schema({
	user1:String,
	user2:String,
	store: [{type: Schema.Types.ObjectId, ref: "ChatMessage"}],
});
var chats =mongoose.model('chats', chatSchema);

var postSchema= new Schema({

		title: String,
		username:String,
		steps: String,
		image: String,
		link: String,
		stat:String,
		ingredient:String,
		type:String
});


var posts =mongoose.model('posts', postSchema);
var userSchema= new Schema({ 
	name:String,
	username: String,
	salt:String,
	hash:String,
	picture:String,
	followers: [{type: Schema.Types.ObjectId, ref: "users"}],
	myPosts: [{type: Schema.Types.ObjectId, ref: "posts"}]

});

var users =mongoose.model('users', userSchema);


function authenticate(req,res,next){

	if(Object.keys(req.cookies).length>0){
		let u=req.cookies.login.username;
		let k=req.cookies.login.key;

		for(x in sessionsKeys){
			console.log(x+"_**______"+sessionsKeys[x]);
		}
		if(sessionsKeys[u]!=undefined){
		if(Object.keys(sessionsKeys[u]).length>0&&sessionsKeys[u][0]==k){
			next();

		}
		else{
			res.send(req.cookies);
		}
		}
		else{
			res.send("Invalide Login");
		}
	}
	else{
		res.send("Invalide Login");
	}

}
app.use('/post.html',authenticate);
app.use('/postByType.html',authenticate);
app.use('/home.html',authenticate);
app.use('/myPosts.html',authenticate);
app.use('/fPosts.html',authenticate);
app.use('/chat.html',authenticate);
app.use(express.static('public_html'));


app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));


app.post('/upl08oad', upload.single('img'), (req, res) => {
	    if(req.file) {
		let last=JSON.parse(req.file);

		        }
	    else throw 'error';
});


app.get('/current/:x',function(req,res){
	var x=req.params.x;
	save3=x;
});
app.post('/login/',function(req,res){
	var v =mongoose.model('users', userSchema);
	var whole=(req.body.user);
	let last=JSON.parse(whole);
	var u=last.username;	
	var p=last.passwords;	

	v.find({ username:u}).exec(function(err,results){
		if(err){console.log(err);}
			if(results.length==1){
				var salt=results[0].salt;
				var iterations=1000;
				crypto.pbkdf2(p,salt,iterations,64,'sha512',(err,hash)=>{
				if(err)throw err;
			var hashS=(hash.toString('base64'));
			if(results[0].hash==hashS){

				let sessionsKey=Math.floor(Math.random() *1000);
				sessionsKeys[u]=[sessionsKey,Date.now()];
				res.cookie("login",{username: u,key:sessionsKey},{maxAge:300000});
				res.send('OK');
			}
			else{
				res.send('ERROR');
			}
			flag=1;	
	});

			}
			else{
				res.send('ERROR');
			}



	});
});
/*
function hashPass(pass){
	var salt=crypto.randomBytes(64).toString('base64');
	var iterations=1000;
	crypto.pkdf2(pass,salt,iterations,'sha512'(err,hash)=>{
		if(err)throw err;
		let res={salt:salt,hash:hash.toString('base64'),iterations:iterations};

	});

}*/
app.post('/upload', upload.single('myImg'), (req, res) => {
	var v =mongoose.model('users', userSchema);
	var whole=(req.body.user);
	var u=req.body.user;	
	var n=req.body.name;	
	var p=req.body.pass;	
	var pic;
	    if(req.file) {
		 pic=req.file.path;
	    }
		else{
			pic="";

		}
	var flag=0;
	v.find({username:u}).exec(function(error,results_){
		if(results_.length<1){
	var salt=crypto.randomBytes(64).toString('base64');
	var iterations=1000;
	crypto.pbkdf2(p,salt,iterations,64,'sha512',(err,hash)=>{
		if(err)throw err;
		let res={salt:salt,hash:hash.toString('base64'),iterations:iterations};
		var hashS=(hash.toString('base64'));
			flag=1;	
			var newSend=new users({ username:u,salt:salt,hash:hashS,name:n,picture:pic, followers:[],myPosts:[]});
			newSend.save(function(err){
				if(err){console.log(err);}
			});
	});
		    	res.redirect('/index.html');
			res.end();
		}
		else{
		    	res.redirect('/index.html');
			res.end();
		}


	});

});
app.get('/users/posts/:key',(req,res)=>{
	var key=req.params.key;
	if(key=='--x--'){
		key=req.cookies.login.username;
	}
	var v =mongoose.model('posts', postSchema);
	var save="";

	var list={};
	var num=0;
	v.find({username:key}).exec(function(error,results){
		for(i in results){
			if(results[i]!=undefined){
					list[num]=results[i]

					num+=1;

			}
		}
		res.send(list);
	});
});	
app.get('/search/posts/:key',(req,res)=>{
	var key=req.params.key;
	var v =mongoose.model('posts', postSchema);
	var save="";

	var list={};
	var num=0;
	v.find({type:key}).exec(function(error,results){
		for(i in results){
			if(results[i]!=undefined){
					list[num]=results[i]

					num+=1;

			//	}
			}
		}
		res.send(list);
	});
});	

app.get('/search/users/:key',(req,res)=>{
	var usersave=req.params.key;
	var v =mongoose.model('users', userSchema);
	var v2 =mongoose.model('items', itemsSchema);
	var save="";
	var list={};
	var num=0;
	v.find({}).exec(function(error,results){

		for(i in results){
			if(results[i]!=undefined){
				if((results[i].username).includes(usersave) ){
					list[num]=results[i];

					num+=1;

				}
			}
		}
		res.send(list);
	});

});
app.get('/get/followers/:user/',(req,res)=>{
	var usersave=req.params.user;
	
	var v =mongoose.model('users', userSchema);
	var v2 =mongoose.model('posts', postSchema);
	var save="";
	v.find({username:usersave}).populate('followers').exec(function(error,results){


		for (i in results){
			var copy2=results[i];
			save+=(JSON.stringify(results[i].followers));

		}
		res.send((save));
	});

});
app.get('/get/listings/:user/',(req,res)=>{
	var usersave=req.params.user;
	var v =mongoose.model('users', userSchema);
//	var v2 =mongoose.model(s'', itemsSchema);
	
	var save="";
	v.find({username:usersave}).populate('listings').exec(function(error,results){

		for (i in results){
			var copy2=results[i];
			save+=(JSON.stringify(results[i].listings));

		}
		res.send((save));
	});

});
app.get('/get/items/',(req,res)=>{
	var v =mongoose.model('posts', postSchema);
	v.find({}).exec(function(error,results){
		res.send(JSON.stringify(results));
	});
});


app.get('/get/users/',(req,res)=>{
	var v =mongoose.model('users', userSchema);
	v.find({}).exec(function(error,results){
		res.send(JSON.stringify(results));
	});

});
app.post('/add/buy/:user',(req,res)=>{
	var v =mongoose.model('users', userSchema);
	var v2 =mongoose.model('posts', postSchema);
	var ob;
		let u=req.cookies.login.username;


	var key=req.params.user;
	v.find({username:(key)}).exec(function(errors,results1){
	v.find({username:(u)}).exec(function(errors,results){
		if(errors){console.log(errors);}
		for (i in results){
			var save=results[i].followers;
			for (x in save){
				if(save[x]!=null){
				if(save[x].toString()==results1[0]._id.toString()){
					
					return;
				}
				}	
			}
			if(results1[0]._id!=results[0]){
			save.push(results1[0]._id);
			
			var copy2=results[i];
			v.updateOne(
				{username: (u)},
				{followers: save  },function(err,docs){
					
					if(err){
						console.log(err);
					}
				}
			)
			}
/*			var last2=new users({copy2});
			//	newSend.save(function(err){
			//		if(err){console.log(err);}
			//	});
			var save=results[i].listings;
			save.push(newSend._id);
			v.updateOne(
				{username: (req.params.user)},
				{ purchases: save },function(err,docs){
					if(err){
						console.log(err);
					}
				}
			);
		}       	*/

	}
	});
	});

});
app.post('/upl8oad', upload.single('img'), (req, res) => {
	var v =mongoose.model('users', userSchema);
	var v2 =mongoose.model('posts', postSchema);
	var whole=(req.body.item);
	console.log("___________"+req.body.type);
	var copy=(req.body);
	console.log("___________"+copy.type);
	var title1=(copy.title2);
	var steps2=(copy.steps);
	var link2=(copy.link);
	var user=req.cookies.login.username;
	var stat1="";
	var type1=(copy.type);
	var ing=(copy.ing);
	var pic;
	if(req.file) {
		 pic=req.file.path;
	}
	else{

		pic="";
	}

	var last=new posts({title:title1,username:user,steps:steps2,image:pic,link:link2,type:type1,stat:stat1,ingredient:ing });
	var newSend=last;
	console.log(newSend);
	v.find({username:(user)})/*.populate('items')*/.exec(function(errors,results){
		console.log("_______"+results);
		if(errors){console.log(error);}
		for (i in results){
		console.log("_______");

			var copy2=results[i];
			var last2=new users({copy2});
			newSend.save(function(err){
				if(err){console.log(err);}
				console.log("Gooog");
			});
			var save=results[i].myPosts;
			save.push(newSend._id);
			
			v.updateOne(
				{username: (copy.user)},
				{myPosts: save  },function(err,docs){
					
					if(err){
						console.log(err);
					}
				}
			)
		}
	});
		    	res.redirect('/post.html');
		//	alert("Already Taken ");
			res.end();
});
app.post('/chats/post/:u2',(req,res)=>{
	var usersave=save3;
	let u=req.cookies.login.username;
	console.log(usersave);
	var copy=(req.body.chat);
	var flag=0;
	var flag2=0;
	const stamp= new Date().getTime();
	var time=(stamp).toString();
	var save2="time";
	let bye=JSON.stringify(save2);
	var save="{"+bye+":"+time+',';
	var last= copy;
	var save=[];
	let message=JSON.parse(last);
	var v =mongoose.model('ChatMessage', ChatMessageSchema);
	var v2 =mongoose.model('chats', chatSchema);
	console.log(u+"_____"+usersave);
						
		var newSend=new ChatMessage(message);
		newSend.time=time;
		newSend.alias=u;
	console.log(newSend);
	console.log(usersave+"_____"+u);
		newSend.save(function(err,doc){if(err){console.log(err);}// });
		});
	v2.find({user2:usersave,user1:u}).exec(function(error,results){
		if(results.length==0){flag=0;}
		else{
			console.log("12------"+results);
		for(i in results){
			save=results[i].store;
			save.push(newSend._id);
			v2.updateOne(
				{user2:usersave,user1:u},
				{store: save  },function(err,docs){
					
					if(err){
						console.log(err);
					}
				}
			)
				flag=1;
		}
	}
	if(results.length==0){

	v2.find({user1:usersave,user2:u}).exec(function(error,results2){
	console.log("11111-------"+results2);
		if(results2.length==0){flag2=0;}
		else{
		for(i in results2){
			save=results2[i].store;
			save.push(newSend._id);
			v2.updateOne(
				{user1:usersave,user2:u},
				{store: save  },function(err,docs){
					
					if(err){
						console.log(err);
					}
				}
			)
			console.log("PPPP");
				flag2=1;
			}
	}
		if(results2.length==0){
			save.push(newSend._id);

	console.log(u+"  ((W(((S(WDW(D( ssdedef");
			var newSend2=new chats({user1:usersave,user2:u,store:save});
		newSend2.save(function(err,doc){if(err){console.log(err);}// });
		});

		}


	});

	}	

	});
	console.log(u+"   ssdedef");
	console.log(usersave+"   ssdedef");
	res.send(usersave);

});


app.get('/chats/:u2',(req,res)=>{
	var usersave=req.params.u2;
	console.log(usersave);
	var usersave=req.params.u2;
	let u=req.cookies.login.username;
	var v =mongoose.model('ChatMessage', ChatMessageSchema);
	var v2 =mongoose.model('chats', chatSchema);
	var save={};

	v2.find({user1:save3, user1:u}).populate('store').sort({"time":1}).exec(function(error,results){
		for(i in results){
			if(results.length!=0){
			var store=results[i].store;
			for(x in store){
				save[x]=((store[x]));
			}
			}

		}
		v2.find({user2:save3, user2:u}).populate('store').sort({"time":1}).exec(function(error,results2){
		for(z in results2){
			if(results2.length!=0){
			var store2=results2[z].store
			for(y in store2){
				save[y]=((store2[y]));
			}
			}
		}

		res.send(JSON.stringify(save));
		});
	});

});


app.get('/hello',(req,res)=>{
	let u=req.cookies;
	res.send(u);
});
	app.listen(port,()=>{
		console.log(`app listening at http://${hostname}:${port}/`)
	});


