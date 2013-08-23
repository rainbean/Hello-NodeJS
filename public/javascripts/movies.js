var null_user = {name: '', id: 10000, rating: [], recommendation: []};
var user = null_user;
var userlist = [];
function Fetch_user_list() {
	$.getJSON( "/users", function(data) {
		userlist = data; // keep userlist in case
		var select = document.getElementById('userlist');
		for(var i in data) {
			var option=document.createElement('option');
			option.text = data[i].name;
			option.value = data[i].id;
			select.add(option, null);
		}
	});
}

function user_changeHandler() {
    var x = event.target;
	var name;
	//clear current selection
	TR_set_color(true);
	user = null_user;
	if (x.id == 'username') {
		console.log(x.value);
		document.getElementById('userlist').selectedIndex = 0;
		if (x.value == '')
			document.getElementById('updateBtn').disabled = true;
		name = x.value;
	} else {
		document.getElementById('updateBtn').disabled = true;
		if (x.selectedIndex == 0) 
			return;
		name = x.options[x.selectedIndex].text;
	}
    // fetch new user data
	$.getJSON("/movies/" + name, function(data) {
		user = data; // keep userlist in case
		TR_set_color();
	});
}

function update_userdata() {
	if (!user)
		return;
	event.target.disabled = true;
	$.post("/movies/" + user.name, user);
}

/* fill color per user's data */
function TR_set_color(clear) {
  if (!user)
    return;
  for (var row, i = 0; user.rating && i < user.rating.length; ++i) {
    row = document.getElementById('mid' + user.rating[i].id);
    if (row)
      row.style.backgroundColor = (clear ? "" : "YellowGreen"); 
			
    // show rating
    var items = document.getElementsByName('mid' + user.rating[i].id);
    for (var j = 0; items && j < items.length; ++j) {
      if (items[j].value == user.rating[i].rate) {
        items[j].checked = (clear ? false: true);
        break;
      }
    }
  }
  for (var row, i = 0; user.recommendation && i < user.recommendation.length; ++i) {
    row = document.getElementById('mid' + user.recommendation[i].id);
    if (row)
      row.style.backgroundColor = (clear ? "" : "Orange");
  }
}

function radio_changeHandler() {
    var item = event.target;
    var mid = parseInt(item.name.substr(3));
	// change row color
	row = document.getElementById('rate' + mid);
    if (row)
		row.style.backgroundColor = "YellowGreen"; 
	document.getElementById('updateBtn').disabled = false;
	if (!user)
		user = null_user;
	if (!user.rating)
		user.rating = [];
	for (var row, i = 0; i < user.rating.length; ++i) {
		if (mid == user.rating[i].id)
		{
			// existed rating value
			user.rating[i].rate = item.value;
			return;
		}
	}
	// add new rating
	user.rating.push({id: mid, rate: item.value});
}

/* toggle functions */
function toggle(obj, alwaysOn) {
	if (obj) 
		obj.style.display = ((obj.style.display == '' && !alwaysOn) ? 'none' : '');
}

function TR_toggle_rows(items) {
    for (var row, i = 0; i < items.length; ++i) {
        row = document.getElementById('mid' + items[i].id);
        toggle(row);
    }
	return false;
}

function TR_toggle_rates() {
	return TR_toggle_rows(user.rating);
}

function TR_toggle_recommendation() {
	return TR_toggle_rows(user.recommendation);
}

function TR_toggle_all() {
	oTable = document.getElementById('movierows');
	var r = 0, row, rows = oTable.rows;
	while (row = rows.item(r++))
		toggle(row);
	TR_toggle_rows(user.rating, true);
	TR_toggle_rows(user.recommendation, true);
	return false;
}

function fnCellCreatedCB(nTd, sData, oData, iRow, iCol) {
  if ( sData == "7" ) { // if id match
    $(nTd.parentNode).css('background-color', 'YellowGreen'); 
    //$(nTd).css('background-color', 'YellowGreen'); // walkaround 
  }
}

function fnCreateRatingColumnCB(data, type, full) {
  var s = [
    '<label><input type=radio name=rate', data, ' value=5/>5 </label>',
    '<label><input type=radio name=rate', data, ' value=4/>4 </label>',
    '<label><input type=radio name=rate', data, ' value=3/>3 </label>',
    '<label><input type=radio name=rate', data, ' value=2/>2 </label>',
    '<label><input type=radio name=rate', data, ' value=1/>1 </label>'];
  return s.join('');
}

function fnDocumentReadyCB() {
    $('#movies').dataTable( {
      "bProcessing": true,
      "sAjaxSource": '/movies',
      "aoColumnDefs": [ 
	    { // change color of user rated's row when cell was rendered/created
          "aTargets": [0], // MovieID column
          "fnCreatedCell": fnCellCreatedCB
        },
	    { // create rating column
		  "aTargets": [-1],
          "mData": 0, // data refer to MovieID column
          "bSortable": false,
          "mRender": fnCreateRatingColumnCB
        },
	  ]
    });
}

onload = function() {
    //TR_set_color();
	//TR_insert_rating();
	
	document.getElementById('movierows').addEventListener('change', radio_changeHandler, false);
	document.getElementById('userlist').addEventListener('change', user_changeHandler, false);
	document.getElementById('username').addEventListener('change', user_changeHandler, false);
	document.getElementById('updateBtn').addEventListener('click', update_userdata, false);
    document.getElementById('updateBtn').disabled = true;

   // get user list
   Fetch_user_list();
};
