//Ali Alnemer and rafal ABu Eshey 
//7/10/21
//This function is the Ajax functions that take info from three html pages and sends them to the user.
//This can take the username info when user creatd /this can take login info/ this can check which button is pressed/ 
//and  FInally this can take the ietms info
 var hello="i";
function helpP(){
		window.location="/help.html";


}
function getItem(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
			}	

		}

	}
	let title2=document.getElementById('title2').value;
	let steps2=document.getElementById('steps').value;
	let ing=document.getElementById('ing').value;
	let link2=document.getElementById('link').value;
	let type2=document.getElementById('type').value;
	let user=document.getElementById('user').value;



	url='/add/'+'item/'+user;
	let  itemsSchema={title:title2,steps:steps2,image:"",link:link2,stat:"",ingredient:ing,type:type2};
	let chatStr=JSON.stringify(itemsSchema);
	let perms='item='+chatStr;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}
function pListings(x){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
				var results=JSON.parse(whole);
				var num=0;
					$(".saveButtons").empty();	
					$(".saveButtons").css({"margin-top":"120px"});
					$(".saveButtons").empty();	
					$(".saveButtons").append("<div class=saveButtons2></div>");
					$(".saveButtons2").css({"margin-top":"120px"});
					$(".saveButtons2").append("<table class=j>");
					$(".saveButtons2").append("<tr class=rows>");
					$(".saveButtons2").append("<td ><label for=search> Search Username To View Posts: </label> </td>");
					$(".saveButtons2").append("<td><input type=text class=inputs   id=search /></td>");
					$(".saveButtons2").append("</tr>");
					$(".saveButtons2").append("<tr class=rows>");
					$(".saveButtons2").append("<td><div class=submitS></div></td>")	
					$(".submitS").append("<input type=submit class=inputs id=sentS />");
					$(".saveButtons2").append("</tr>");
					$(".saveButtons2").append("</table>");
					$("#sentS").click(function(){
						if($('#search').val()==""){
							alert('No Value Entered');
						}
						else{
							
							var saveN=$('#search').val().toString();
						searchList2(saveN,"s","saveVar");//}

						}
					});
				
					$(".saveButtons").append("<h1>Your Followers</h1>")	
				for(i in results){
					$(".saveButtons").append("<div class=newAddS"+num+"></div>")	
					$(".newAddS"+num).append("<input type=submit class=inputs3 value="+results[i].username+"  id=send"+num+" />");
					$(".newAddS"+num).css({"margin":"0px"});
					
						num++;
				}
			}	

		}

	}
	getCookie2();
	let user=document.getElementById('type').innerText;

	url='/get/'+'followers/'+user;
	request.open('GET', url,true);
	request.send();

}
function vListings(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
				var results=JSON.parse(whole);

					$(".display").empty();	
				for(i in results){
					$(".display").append("<div class=newAdd></div>")	
					$(".newAdd").css({"border":"6px solid black","margin":"10%"});
					$(".newAdd").append("<p class=title>"+(results[i].title )+"</p>");
					$(".title").css({"color":"red","font-size":"8vh"});

					$(".newAdd").append("<p> Image: "+(results[i].image)+"</p>");
					$(".newAdd").append("<p> Describtion"+(results[i].description)+"</p>");
					$(".newAdd").append("<p> Price:"+(results[i].price)+"</p>");
				}
			}	

		}

	}
	let user=document.getElementById('name').innerText;



	url='/get/'+'listings/'+user;
	request.open('GET', url,true);
	request.send();

}
function buyS(x){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
			}	

		}

	}

	if(x[1]==undefined)return;
	url='/add/'+'buy/'+x[1];
	let  itemsSchema=x;
	let chatStr=JSON.stringify(itemsSchema);
	let perms='post='+chatStr;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}
function getList(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
				var results=JSON.parse(whole);
				for(i in results){

					$(".display").append("<div class=newAdd></div>")	
					$(".newAdd").css({"border":"6px solid black","margin":"10%"});
					$(".newAdd").append("<p class=title>"+(results[i].title )+"</p>");
					$(".title").css({"color":"red","font-size":"8vh"});

					$(".newAdd").append("<p> Image: "+(results[i].image)+"</p>");
					$(".newAdd").append("<p> Describtion"+(results[i].description)+"</p>");
					$(".newAdd").append("<p> Price:"+(results[i].price)+"</p>");

					if(results[i].stat!="SOLD"){
						var send=[];
						send.push(results[i].title,results[i].image,results[i].description,results[i].price,results[i].stat);
						$(".newAdd").append("<input type=submit  value=BUY class=send />");
					}

				}

			}	

		}

	}
	url='/get/'+'listings/'+t;
	request.open('Get', url,true);
	request.send();

}
function creatPosts(){

return	window.location="/home.html";
}
function goToPosts(){

return	window.location="/postByType.html";
}
function searchList3(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
		//	window.location="/home.html";
				let whole=request.responseText;

				var results=JSON.parse(whole);
				var num=0;
					$(".display").empty();	
				for(i in results){
				//	$(".display").empty();	

					//$(".display").empty();	
					$(".display").append("<div class=newAdd"+num+"></div>")	
					$(".newAdd"+num).css({"border":"6px solid black","margin":"25px","border":"6px solid rgb(30, 77, 143)"});
					$(".newAdd"+num).append("<p class=user>User Name:"+(results[i].username )+"</p>");
					$(".user").css({"color":"red","font-size":"11vh"});
					$(".newAdd"+num).append("<p class=title1>"+(results[i].title )+"</p>");
					$(".title1").css({"color":"red","font-size":"7vh"});

					if(results[i].image!=""){
					$(".newAdd"+num).append("<img src=."+(results[i].image).substring(16,results[i].image.length)+" alt=img style :width:200px;>");
					$("img").css({"margin-left":"5%","width":"30%"});
					}
					$(".newAdd"+num).append("<p class=title2> Steps</p>");
					$(".newAdd"+num).append("<p class=results> "+(results[i].steps)+"</p>");
					$(".newAdd"+num).append("<p class=title2> Ingredient</p>");
					$(".newAdd"+num).append("<p class=results> :"+(results[i].ingredient)+"</p>");
					$(".title2").css({"color":"red","font-size":"6vh"});
					$(".results").css({"font-size":"3vh"});
						
			//		if(results[i].stat!="SOLD"){

						var send=[];
						send.push(results[i].title,results[i].username,results[i].image,results[i].link,results[i].stat,results[i].type,results[i].ingredient);
							
					num++;
				}


			}	

		}

	}


		//	window.location="/home.html";
	
	let text='--x--';
			//				var saveVar=$("#send"+numX).val().toString();
	url='/users/'+'posts/'+text;
	request.open('Get', url,true);
	request.send();

}
function searchList2(numX,isave,value){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
		//	window.location="/home.html";
				let whole=request.responseText;

				var results=JSON.parse(whole);
				var num=0;
					$(".display").empty();	
				for(i in results){
					//$(".display").empty();	

					//$(".display").empty();	
					$(".display").append("<div class=newAdd"+num+"></div>")	
					$(".newAdd"+num).css({"border":"6px solid black","margin":"25px","border":"6px solid rgb(30, 77, 143)"});
					$(".newAdd"+num).append("<p class=user>User Name:"+(results[i].username )+"</p>");
					$(".user").css({"color":"red","font-size":"11vh"});
					$(".newAdd"+num).append("<p class=title1>"+(results[i].title )+"</p>");
					$(".title1").css({"color":"red","font-size":"7vh"});

					if(results[i].image!=""){
					$(".newAdd"+num).append("<img src=."+(results[i].image).substring(16,results[i].image.length)+" alt=img style :width:200px;>");
					}
					$(".newAdd"+num).append("<p class=title2> Steps</p>");
					$(".newAdd"+num).append("<p class=results> "+(results[i].steps)+"</p>");
					$(".newAdd"+num).append("<p class=title2> Ingredient</p>");
					$(".newAdd"+num).append("<p class=results> :"+(results[i].ingredient)+"</p>");
					$(".title2").css({"color":"red","font-size":"6vh"});
					$(".results").css({"font-size":"3vh"});
						
			//		if(results[i].stat!="SOLD"){

						var send=[];
						send.push(results[i].title,results[i].username,results[i].image,results[i].link,results[i].stat,results[i].type,results[i].ingredient);
				//		$(".newAdd"+num).append("<input type=submit  class=submit value=Follow id=send("+num+" />");
				//		$("#send("+num).click(function(){buyS(send)});
						$(".newAdd"+num).append("<input type=submit  class=submit value=Connect id=sendA"+num+" />");
						$("#sendA"+num).click(function(){
							
						window.location='/chat.html';


						var save=(results[i].username).toString();
						//	document.getElementById('find').innerHTML=results[i].username;
						hello=save;
						 current1(save);
						save1(save);
					//	ct1(results[i].username);
							});
				//	}
					num++;
				}


			}	

		}

	}


		//	window.location="/home.html";
	
	let text=document.getElementById('type').innerText;
	url='/users/'+'posts/'+numX;
	request.open('Get', url,true);
	request.send();

}
function searchList(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
		//	window.location="/home.html";
				let whole=request.responseText;

				var results=JSON.parse(whole);
				var num=0;
					$(".display").empty();	
				for(i in results){

					//$(".display").empty();	
					$(".display").append("<div class=newAdd"+num+"></div>")	
					$(".newAdd"+num).css({"border":"6px solid black","margin":"25px","border":"6px solid rgb(30, 77, 143)"});
					$(".newAdd"+num).append("<p class=user>User Name:"+(results[i].username )+"</p>");
					$(".user").css({"color":"red","font-size":"11vh"});
					$(".newAdd"+num).append("<p class=title1>"+(results[i].title )+"</p>");
					$(".title1").css({"color":"red","font-size":"7vh"});

					if(results[i].image!=""){
					$(".newAdd"+num).append("<img src=."+(results[i].image).substring(16,results[i].image.length)+" alt=img style : margin-left:3%;width:60%;>");
					$("img").css({"margin-left":"5%","width":"30%"});
					}
					$(".newAdd"+num).append("<p class=title2> Steps</p>");
					$(".newAdd"+num).append("<p class=results> "+(results[i].steps)+"</p>");
					$(".newAdd"+num).append("<p class=title2> Ingredient</p>");
					$(".newAdd"+num).append("<p class=results> :"+(results[i].ingredient)+"</p>");
					$(".title2").css({"color":"red","font-size":"6vh"});
					$(".results").css({"font-size":"3vh"});
						
			//		if(results[i].stat!="SOLD"){

						var send=[];
						send.push(results[i].title,results[i].username,results[i].image,results[i].link,results[i].stat,results[i].type,results[i].ingredient);
						$(".newAdd"+num).append("<input type=submit  value=Follow class=submit id=send"+num+" />");
						$("#send"+num).click(function(){buyS(send)});
						$(".newAdd"+num).append("<input type=submit  class=submit value=Connect id=send_"+num+" />");
						$("#send_"+num).click(function(){
							
						window.location='/chat.html';


						var save=(results[i].username).toString();
						//	document.getElementById('find').innerHTML=results[i].username;
						hello=save;
						 current1(save);
						save1(save);
					//	ct1(results[i].username);
							});
				//	}
					num++;
				}


			}	

		}

	}


		//	window.location="/home.html";
	
	let text=document.getElementById('type').value;
	url='/search/'+'posts/'+text;
	request.open('Get', url,true);
	request.send();

}
function save2(){
	return 	window.location='/chat.html';
}
function save1(x){
	 	window.location='/chat.html';
	hello=x;
//	console.log(document.getElementById('find').innerHTML);
//							document.getElementById('find').innerHTML=x;


}
function addPoints(){

	var save=$('#steps').val();
	if(save.charAt(save.length-5)=='\n'){
		$('#steps').append('-');
	}

}
function getUser_1(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let results=request.responseText;
			}	

		}

	}
	var formData = new FormData();
	let myImg=document.getElementById('myImg').value;
	let user=document.getElementById('user').value;
	let pass=document.getElementById('pass').value;
	let name2=document.getElementById('name').value;
// 	myImg.enctype="multipart/form-data"
	var files=myImg.get(0).files



	url='/add/'+'user';
	let userSchema ={name:name2,username:user, passwords:pass, followers:[],myPosts:[]};
	let chatStr=JSON.stringify(userSchema);
	//odd

	let perms='user='+chatStr;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}


function changeP3(){
	 pListings();
	getCookie2();
	 pListings();
	 pListings();
}
function changeP4(){
	window.location='/myPosts.html';
}
function changeP2(){
	window.location='/followers.html';
	//getCookie2();
	//return pListings();

}
function changeP(){
	window.location='/home.html';
	return getItem();
}
function sendPost(){
	getItem();
	window.location='/post.html';
	alert("Post Sent");
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
				if(request.responseText !='Ok'){
					let user=document.getElementById('userL').value;
					window.location='/post.html';

				}
				else{
					alert("Invalid login");
				}
			}	

		}

	}
	let user=document.getElementById('userL').value;
	let pass=document.getElementById('passL').value;
	document.getElementById('name').innerHTML=user;

	url='/login/';
	let userSchema ={username:user, passwords:pass, listings:[],purchase:[]};
	let chatStr=JSON.stringify(userSchema);
	let perms='user='+chatStr;
	objectX=perms;
	request.open('POST', url,true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(perms);

}
function current1(x){

	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
			}
		}
	}
	url='/'+'current/'+x;
	request.open('GET', url);
	request.send();



}
function getCookie2(){

	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
				var results=JSON.parse(whole);
				$('#type').empty();	
				$('#type').append(results.login.username);		
				$('#type').css({"color":"rgb(220, 221, 222)"});
				}
			}	


	}
	url='/'+'hello';
	request.open('GET', url);
	request.send();
		return $('#type').innerText;		

}
function getCookie(){

	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
				var results=JSON.parse(whole);

				document.getElementById('name').innerHTML=results.login.username;
			}	

		}

	}

	url='/'+'hello';
	request.open('GET', url);
	request.send();


}
function connect1(){
	var request = new XMLHttpRequest();
	if(!request){
		alert('ERROR');
		return false;
	}
	request.onreadystatechange = ()=>{
		if(request.readyState === XMLHttpRequest.DONE ){
			if(request.status == 200){ 
				let whole=request.responseText;
			}	
			
		}
	
	}
	window.location='/chat.html';
//	document.getElementById('find').innerHTML=results[i].username;
//	$("#find").append(x);	
	let alias='You';
//	document.getElementById('').value=request.responseText;
	let message=document.getElementById('message').value;
	let saveAlias=alias.slice();
	let saveMessage=message.slice();
	document.getElementById('message').value="";
	



	url='/'+'chats/post/'+hello;
	let  ChatMessageSchema={alias:"You ",message:saveMessage};
	let chatStr=JSON.stringify(ChatMessageSchema);
	let perms='chat='+chatStr;
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
//				let results=(request.responseText);
				let save='';
				for(i in results){
	//			let results2=JSON.parse(results[i]);
					save+='<b>'+results[i].alias+': '+'</b>'+results[i].message+'<br></br>';
				}
//				document.getElementById('info').innerHTML=save;
			document.getElementById('chat').innerHTML=save;
					
			//	},1000);
				
			}	
			
		}
	
	}
	url='/'+'chats/'+hello;
	request.open('GET', url);
	request.send();


}
