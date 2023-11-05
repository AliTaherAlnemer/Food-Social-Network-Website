//Ali Alnemer  
//7/10/21
//This function is the Ajax function that takes the name from the left box , the two laungues and sends them in the url 
//The url should look like :/translate/e2s/:word'
function getItem(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				console.log("OOO");
	//		let results=request.responseText;
	//		document.getElementById('results').innerText=results;
			}	
			
		}
	
	}
	let title2=document.getElementById('title').value;
//	document.getElementById('').value=request.responseText;
	let desc=document.getElementById('desc').value;
	let image2=document.getElementById('img').value;
	let price2=document.getElementById('price').value;
	let stat2=document.getElementById('stat').value;
	let user=document.getElementById('user2').value;



	url='/add/'+'item/'+user;
	let  itemsSchema={title:title2,description:desc,image:image2,price:price2,stat:stat2};
	let chatStr=JSON.stringify(itemsSchema);
	let perms='item='+chatStr;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}


function loginInfo(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
			let results=request.responseText;
				documenults=request.responseText;
					console.log(results=='OK');
					if(request.responseText !='Ok'){
																	
						let user=document.getElementById('userL').value;
						window.location='/post.html';
						document.getElementById('name').innerHTML=user;
					}
					else{
						alert("Invalid login");
					}	
			
		}
	
	}
	}
	let user=document.getElementById('userL').value;
	let pass=document.getElementById('passL').value;

//	document.getElementById('').value=request.responseText;
/*	let message=document.getElementById('message').value;
	let saveAlias=alias.slice();
	let saveMessage=message.slice();
	document.getElementById('alias').value="";
	document.getElementById('message').value="";

*/

	url='/login/';
	let userSchema ={name:"",username:user, passwords:pass, followers:[],myPosts:[]};
	let chatStr=JSON.stringify(userSchema);

	let perms='user='+chatStr;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}
function getMessage(){

	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				//setInterval(function(){
				let results=JSON.parse(request.responseText);
				let save='';
				for(i in results){
					save+='<b>'+results[i].alias+': '+'</b>'+results[i].message+'<br></br>';
				}
//				document.getElementById('info').innerHTML=save;
			document.getElementById('chat').innerHTML=save;
					
			//	},1000);
				
			}	
			
		}
	
	}

	url='/'+'chats';
	request.open('GET', url);
	request.send();


}
