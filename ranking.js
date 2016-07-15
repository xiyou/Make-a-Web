//通过Ajax获取的数据来给img标签赋予图片
var ul = document.getElementById('all_course');
var url1 = 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=10';
var url2 = 'http://study.163.com/webDev/couresByCategory.htm?pageNo=1&psize=20&type=20';
getAjax(url1);
//封装AJax的函数
function getAjax(url){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
	if(xhr.readyState == 4 ){
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
		//json转换为对象
		var clourse = JSON.parse(xhr.responseText);	

		//通过对象方法过滤不要的属性为JSON
		var filter = JSON.stringify(clourse.list,["Id","name","bigPhotoUrl","middlePhotoUrl","smallPhotoUrl","provider","learnerCount","price","categoryName","description"],5);

		//最后把JSON转换回来
		var backme = JSON.parse(filter);
		
		someFunction(backme);//这是很严重的问题
	} else{
		alert("Requset was unsuccessful: "+ xhr.status);
	  }
	}	
};
xhr.open('GET',url,true);
xhr.send(null);

}
//执行20个节点生成
function someFunction(arr){
	console.log(arr);
	// var templete = '<li class="coure_show">\
	// 				<img  class="transmit">\
	// 				<p class="name"></p>\
	// 				<h6 class="type"></h6>\
	// 				<span class="number"></span>\
	// 				<i class="price"></i>\
	// 			</li>';
	var i = 20;

	for( i=0; i<20; i++){
		// ul.innerHTML += templete;
		document.querySelectorAll('.transmit')[i].src=arr[i].bigPhotoUrl;
		document.querySelectorAll('.name')[i].innerHTML=
		arr[i].name;
		document.querySelectorAll('.type')[i].innerHTML=
		" "+arr[i].categoryName;
		document.querySelectorAll('.number')[i].innerHTML=arr[i].learnerCount;
		if (arr[i].price == 0){
			document.querySelectorAll('.price')[i].innerHTML= "免费";
		} else{
			document.querySelectorAll('.price')[i].innerHTML=arr[i].price;
		}
		
 	}
   				
	}

//最热排行榜
	var imgS = document.querySelectorAll('.ptoto_load'),
		 h4S = document.querySelectorAll('.title'),
		 spanS = document.querySelectorAll('._learner');

	var xhrHttp = new XMLHttpRequest();
	xhrHttp.onreadystatechange = function(){
		if (xhrHttp.readyState == 4){
			if ((xhrHttp.status >= 200 && xhrHttp.status <300) || xhrHttp.status == 304){
			
			var toObj = JSON.parse(xhrHttp.responseText);
			var filter = JSON.stringify(toObj,["bigPhotoUrl","name","learnerCount"],4);
			var backme = JSON.parse(filter);
			backme.sort(randomsort);
			loadDate(backme);
			} else {
				alert("Requset unsuccessful " + xhrHttp.status);
			}
		}
	}
	xhrHttp.open("GET","http://study.163.com/webDev/hotcouresByCategory.htm",false);
	xhrHttp.send(null);
	//实现了随机要求
	function randomsort(a, b) {
   		return Math.random()>.5 ? -1 : 1;
	}
	function loadDate(arr){
		var i = 0;
		for(i=0; i < 20; i++){
		imgS[i].src = arr[i].bigPhotoUrl;//循环可行吗
		h4S[i].innerHTML = arr[i].name;
		spanS[i].innerHTML = arr[i].learnerCount;	
		}
	}

	var desigin = document.getElementById('product_design'),
		program = document.getElementById('program');
	desigin.addEventListener('click',function(){
		desigin.className = 'change_Tab';
		program.className = "";
		getAjax(url1);
	},false);
	program.addEventListener('click',function(){
		program.className = 'change_Tab';
		desigin.className = "";
		getAjax(url2);
	},false);

	//最热排行榜的更新
		var px = -69;
	    var list = document.querySelector('.list');
	    setInterval(function(){
	    	list.style.top = px +"px";//是一直在执行这个
	    	px += -69;
	    	if (px == -690){
	    		list.style.top= 0 +"px";
	    		px = -69;
	    	}
	    },5000)
