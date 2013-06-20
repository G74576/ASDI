//Kevin O'Toole
//ASDI 1306
//JavaScript Template

$('#homepage').on('pageinit', function(){

/*	//Search Function
	function id(x){
		var elementId = document.getElementById(x);
		return elementId;
	}
	
	var search = id("searchbtn");
	search.addEventListener("click", getSearch);
	
	function getSearch(){
		var term = id("search").value;
		
		if(term != ""){
		var myUlTag = document.createElement("ul");
		var myDiv = id("displaypage");
		myDiv.appendChild(myUlTag);	
			for(var i=0, len=localStorage.length; i<len; i++){ 			
				//var myLi = document.createElement("li");
				//myUlTag.appendChild(myLi);
				var key = localStorage.key(i); 							
				var value = localStorage.getItem(key); 					
				var item = JSON.parse(value); 						    
				//var myNewUl = document.createElement("ul");
				//myLi.appendChild(myNewUl);
				//getImage(item.group[1], myUlTag);
				for(n in item){
					if(term === item[n][1]){
						for(q in item){
							var myNewLi = document.createElement("li");
							myNewLi.setAttribute("id", "searchLI");
							myUlTag.appendChild(myNewLi);
							var optNewSubText = item[q][0] + " " + item[q][1]; 
							myNewLi.innerHTML = optNewSubText;				
		//					console.log(item[q][0]+": "+item[q][1]);
						}
					}
				}
			}
		}
	}
	getSearch();*/
	
	//Json Function
	$('#jsonBtn').on('click', function(){
		$.mobile.changePage('#jsonPage',{});
		$('#jsonContent').empty();
		$.ajax({
			url		: 'data.json',
			type	: 'GET',
			dataType: 'json',
			success	: function(response){
				//console.log(response);
				alert("JSON data success");
				for(var i=0, j=response.lists.length; i<j; i++){
					var lis = response.lists[i]
					$(''+
						'<div>' +
							'<h3>' + lis.title + '</h3>' +
							'<p>' + lis.category + '</p>' +
							'<p>' + lis.location + '</p>' +
							'<p>' + lis.date + '</p>' +
							'<p>' + lis.items + '</p>' +
						'</dvi>'							
					).appendTo('#jsonContent');		
				};
				/*$.each(data, function(i, data){
					var makeList = $('<div></div>');
					var makeLi = $(
						'<p>' + "List Title: " + data.title + '</p>' +
						'<p>' + "List Category: " + data.category + '</p>' +
						'<p>' + "List Location: " + data.location + '</p>' +
						'<p>' + "List Date: " + data.date + '</p>' +
						'<p>' + "List Items: " + data.items + '</p>' +
						'<br />'
					);
					makeList.append(makeLi).appendTo('#jsonContent');
				});*/
			}
		});
	});	

	//XML Function
	$('#xmlBtn').on('click', function(){
		$.mobile.changePage('#xmlPage',{});
		$('#xmlContent').empty();
		$.ajax({
			url		: 'data.xml',
			type	: 'GET',
			dataType: 'xml',
			success	: function(items){
			console.log(items)
				alert("XML data success");
				$(items).find('list').each(function(){
					var list ={}
						list.title 		= $(this).find("title").text();
						list.category 	= $(this).find('category').text();
						list.location 	= $(this).find('location').text();
						list.date 		= $(this).find('date').text();
						list.items 		= $(this).find('items').text();
						console.log(list);
						$(''+
							'<div>' +
								'<h3>' + list.title + '</h3>' +
								'<p>' + list.category + '</p>' +
								'<p>' + list.location + '</p>' +
								'<p>' + list.date + '</p>' +
								'<p>' + list.items + '</p>' +
							'</dvi>'							
						).appendTo('#xmlContent');		
				});
			}
		});
	});
});

$('#addpage').on('pageinit', function(){

	
});

$('#displaypage').on('pageinit', function(){

});

$('#API').on('pageinit', function(){

});

	// Save data to local storage function
	
	var saveData = function(key){
		if(!key){
			var uniqueId = Math.floor(Math.random()*100001);
		}else{
			uniqueId = key;
		}
		var item			={};
			item.title		=['List Title:', $('#title').val()];
			item.category	=['List Category:', $('#category').val()];
			item.location	=['List Location:', $('#location').val()];
			item.date		=['List Date:', $('#date').val()];
			item.items		=['List Items:', $('#items').val()];
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert('Your list has been saved!');
		window.location.reload();
		//console.log(storeData);
	}

	// Get data from local storage function
		
	var getData = function(){
		if(localStorage.length === 0){
			alert("There are no lists in your local storage so default lists have been added");
			autofillData();
		}
		$.mobile.changePage('#displaypage');
		//$('ul').appendTo('#displayContent');
		for(var i=0, len=localStorage.length; i<len; i++){
			var key = localStorage.key(i);
			var value = JSON.parse(localStorage.getItem(key));
			var makeDiv = $('<div></div>');
			var makeLi = $(
				'<h3>' + value.title[0] + " " + value.title[1] + '</h3>' +
				'<p>' + value.category[0] + " " + value.category[1] + '</p>' +
				'<p>' + value.location[0] + " " + value.location[1] + '</p>' +
				'<p>' + value.date[0] + " " + value.date[1] + '</p>' +
				'<p>' + value.items[0] + " " + value.items[1] + '</p>'
			);
			var editBtn = $('<button data-key="'+key+'"><a href="#addpage">Edit List</a></button>');
				editBtn.on('click', function(){
					editKey = $(this).data('key');
					editList(editKey);
				});		
			var deleteBtn = $("<button data-key='"+key+"'><a href='#addpage' id='delete"+key+"'>Delete List</a></button>");
				deleteBtn.on('click', function(){
					editKey = $(this).data('key');
					deleteItem(editKey);
				});
		makeDiv.append(makeLi).append(editBtn).append('<br />').append(deleteBtn).appendTo('#displayContent');		
		}
	}
	
	// Auto fill from local storage

	var autofillData = function (){
		//Couch JSON Call
		$.ajax({
			url		: "_view/courses",
			dataType: "json",
			success : function(data){
				$.each(data.rows, function(index, list){
					var tit = list.value.title;
					var cat = list.value.category;
					var loc = list.value.location;
					var dat = list.value.date;
					var ite = list.value.items;
					var couchJson = $(''+
						'<div>' +
							'<h3>' + tit[1] + '</h3>' +
							'<p>' + cat[1] + '</p>' +
							'<p>' + loc[1] + '</p>' +
							'<p>' + dat[1] + '</p>' +
							'<p>' + ite[1] + '</p>' +
						'</dvi>'							
					).appendTo('#displayContent');
				});
				/*for(var i=0, j=response.lists.length; i<j; i++){
					var lis = response.lists[i]
					$(''+
						'<div>' +
							'<h3>' + lis.title + '</h3>' +
							'<p>' + lis.category + '</p>' +
							'<p>' + lis.location + '</p>' +
							'<p>' + lis.date + '</p>' +
							'<p>' + lis.items + '</p>' +
						'</dvi>'							
					).appendTo('#jsonContent');		
				};*/
			}
		});	 	
	 	/*for(var n in json){
	 		var id = Math.floor(Math.random()*1000001);
	 		localStorage.setItem(id, JSON.stringify(json[n]));
	 	}*/
	}
	
	
	// Edit Information
	
	function editList(editKey){
		var key = $(this).data('key');
		var getListData = localStorage.getItem(editKey);
		var item = JSON.parse(getListData);
		$('#title').val(item.title[1]);
		$('#category').val(item.category[1]);
		$('#location').val(item.location[1]);
		$('#date').val(item.date[1]);
		$('#items').val(item.items[1]);
		//saveNewList.removeEventListener('click', saveData);
		//$('#save').val('Edit List');
		//var editListInfo = $('#save');
		//editListInfo.addEventListener('click', saveData);
		//editListInfo.key = this.key;
		$('#save').data('key', key);
	}

	// Delete List
	
	var deleteItem = function (editKey){
		var ask = confirm('Are you sure you want to delete this list?');
		if(ask){
			localStorage.removeItem(editKey);
			alert('This list was deleted!');
			window.location.reload();
		}else{
			alert('The list was not deleted!');
		}
	}

	// Clear Local Storage
	
	var clearLocal = function(){
		if(localStorage.length === 0){
			alert('There are no lists in your local storage.');
		}else{
			localStorage.clear();
			alert('Your lists have been deleted.');
			window.location.reload();
			return false;
		}
	}
	
	
	$('#display').on('click', getData);
	$('#hDisplay').on('click', getData);
	$('#jDisplay').on('click', getData);
	$('#xDisplay').on('click', getData);
	$('#clearLocal').on('click', clearLocal);	
	$('form #savebtn').on('click', saveData);
	
	


