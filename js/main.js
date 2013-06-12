//Kevin O'Toole
//ASDI 1306
//JavaScript Template

$('#homepage').on('pageinit', function(){


});

$('#addpage').on('pageinit', function(){

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
			item.items		=['List Items:', $('items').val()];
		localStorage.setItem(uniqueId, JSON.stringify(item));
		alert('Your list has been saved!');
	}
	
	function refreshWindo(){
		window.location.reload():
	}

	// Get data from local storage function
	
	var getData = function(){
		if(localStorage.length === 0){
			alert('There are no lists in  local storage so default lists were added.');
			autofillData();
		}
		var myUl = $('#displayContent');
		$('#displayContent').style.display = 'block';
	}

});

$('#displaypage').on('pageinit', function(){


});