//Kevin O'Toole
//ASDI 1306
//JavaScript Template

$('#homepage').on('pageinit', function(){
	
});

$('#addpage').on('pageinit', function(){
	$('form #savebtn').on('click', saveData);

	
});

$('#displaypage').on('pageinit', function(){
	getData();
});

/*var urlVars = function(){
	var urlData = ($.mobile.activePage).data('url');
	var urlParts = urlData.split('?');
	var urlPairs = urlParts[1].split('&');
	var urlValues = {};
	for (var pair in urlPairs){
		var keyValue = urlPairs[pair].split('=');
		var key = decodeURIComponent(keyValue[0]);
		var value = decodeURIComponent(keyValue[1]);
		urlValues[key] = value;
	}
	return urlValues;
};

$(document).on('pageshow', '#addview', function(){
	var listdata = urlVars()['courses'];
	//console.log(list);
	$('#addViewContent').html('');
	$.couch.db('asdproject').view('asdiproject/courses',{
		key: listdata,
		success: function(data){
			//console.log(data);
			$.each(data.rows, function(index, list){
				for(var n in list.value){
					if(list.value.hasOwnProperty(n)){
						var item = list.value[n][0] + " " + list.value[n][1];
						$('#addViewContent').append($('<li>').text(item));
					}				
				}
				//var tit = list.value.title;
				//var cat = list.value.category;
				//var loc = list.value.location;
				//var dat = list.value.date;
				//var ite = list.value.items;
				//var couchJson = $(''+
				//	'<div>' +
				//		'<h3>' + tit[1] + '</h3>' +
				//		'<p>' + cat[1] + '</p>' +
				//		'<p>' + loc[1] + '</p>' +
				//		'<p>' + dat[1] + '</p>' +
				//		'<p>' + ite[1] + '</p>' +
				//	'</dvi>'							
				//).appendTo('#addViewContent');
			});
			//console.log();
		}
		
	});

});*/



	// Save data to local storage function
	var key = '';
	var item = {};
	var saveData = function(key){
		if (key === ''){
			item._id	= "list" + Math.floor(Math.random()*100001);
		}else{
			item._id = key._id;
			item._rev = key._rev;
		}
		//var key = $('#savebtn').data('key');
		//var rev = $('#savebtn').data('rev');
		//var uniqueId = Math.floor(Math.random()*100001);
		//var item			={};
			item.title		=['List Title:', $('#title').val()];
			item.category	=['List Category:', $('#category').val()];
			item.location	=['List Location:', $('#location').val()];
			item.date		=['List Date:', $('#date').val()];
			item.items		=['List Items:', $('#items').val()];
		$.couch.db('asdproject').saveDoc(item, {
			success: function(data){
				alert('Your list has been saved!');
				window.location.reload('#');
			}
		});
		//localStorage.setItem(uniqueId, JSON.stringify(item));
		//console.log(storeData);
	}

// Get data from local storage function
		
var getData = function(){
	//$.mobile.changePage('#displaypage');
	$.couch.db("asdproject").view("asdiproject/courses",{
		success: function(data){
			$("#displayContent").empty();
			$.each(data.rows, function(index, list){
				var tit = list.value.title;
				var cat = list.value.category;
				var loc = list.value.location;
				var dat = list.value.date;
				var ite = list.value.items;
				var id = list.value.id;
				var rev = list.value.rev;
				var couchJson = $(''+
					'<div>' +
						'<h3>' + tit[1] + '</h3>' +
						'<p>' + cat[1] + '</p>' +
						'<p>' + loc[1] + '</p>' +
						'<p>' + dat[1] + '</p>' +
						'<p>' + ite[1] + '</p>' +
						//'<p>' + '<button><a href="#addpage" id="editbtn" data-role="button">Edit</a></button>' +
						//'<p>' + '<button><a href="#" id="deletebtn" data-role="button">Delete</a></button>' +
					'</dvi>'							
				);//.appendTo('#displayContent');
				var editList = $('<a href="#addpage" id="editbtn" data-role="button" >Edit</a>');
					editList.on('click', function(){
						$.couch.db('asdproject').openDoc(id, {
							success: function(data){
							//console.log(data);
								$('#title').val(list.value.title[1]);
								$('#category').val(list.value.category[1]);
								$('#location').val(list.value.location[1]);
								$('#date').val(list.value.date[1]);
								$('#items').val(list.value.items[1]);
								//$('#savebtn').data('id', data._id);
							}
						});
					});
				var deleteList = $('<a href="#" id="deletebtn" data-role="button" >Delete</a>');
					deleteList.on('click', function(){
						key = {
							_id: id,
							_rev: rev
						};
						var ask = confirm("Are you sure you want to delete this list?");
							if (ask) {
								$.couch.db('asdproject').removeDoc(key, {
									success: function(){
										window.location.reload();
									}
								});
							}
					});
				couchJson.append(editList).append('<br/>').append(deleteList).appendTo("#displayContent");
				//$('#editbtn').data('id', id).on('click', edit).data('rev', rev);
				//$('#deletebtn').on('click', remove).data('id', id).data('rev', rev);				
				/*var item = (value.value || value.doc);
				$("#displayContent").append(
					$("<li>").append(
						$("<a>")
							.attr("href", "addview.html?courses=" + item.title[1])
							.text(item.title[1])
					)
				);*/
			});
			//$("#displayContent").listview("refresh");
		}
	});
}

/*var remove = function(){
	key = {
		_id: id,
		_rev: rev
	};
	var ask = confirm("Are you sure you want to delete this list?");
		if (ask) {
			$.couch.db('asdproject').removeDoc(key, {
				//window.location.reload();
			});
		}else{
		alert("This list was not deleted");
		}
}

	
	// Edit Information
	
var edit = function (){
		var id = $(this).data('id');
		$.couch.db('asdproject').openDoc(id, {
			success: function(data){
		//		var key = $(this).data('key');
		//		var getListData = localStorage.getItem(editKey);
		//		var item = JSON.parse(getListData);
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
				$('#save').data('rev', data._rev);
			}
		});
	}*/

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
	
	
//	$('#display').on('click', getData);
//	$('#hDisplay').on('click', getData);
//	$('#jDisplay').on('click', getData);
//	$('#xDisplay').on('click', getData);
	$('#clearLocal').on('click', clearLocal);	
	
	
	


