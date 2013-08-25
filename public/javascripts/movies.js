var null_user = {name: '', id: 10000, rating: [], recommendation: []};
var user = null_user;
var userlist = [];

function fnFetchUsers() {
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

function fnUserChangedCB() {
  var x = event.target;
  var name;
  //clear current selection
  fnSetRowColor(true);
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
    fnSetRowColor();
  });
}

function fnPostUserData() {
  if (!user)
    return;
  event.target.disabled = true;
  $.post("/movies/" + user.name, user);
}

function fnGetRow(id)
{
  var list = $('#movies').dataTable().fnGetNodes();
  var x = $.grep(list, function(e) { 
    return e.id == id; 
  });
  return (x ? x[0] : null);
}

/* fill color per user's data */
function fnSetRowColor(clear) {
  if (!user)
    return;
  var list = $('#movies').dataTable().fnGetNodes();
  for (var i in user.rating) {
    var r = fnGetRow(user.rating[i].id);
    if (r) r.style.backgroundColor = (clear ? "" : "YellowGreen");
      
    // show rating
    var items = $(':input', r);
    //var items = document.getElementsByName('r' + user.rating[i].id);
    for (var j in items) {
      if (items[j].value == user.rating[i].rate) {
        items[j].checked = (clear ? false: true);
        break;
      }
    }
  }
  for (var i in user.recommendation) {
    var r = fnGetRow(user.recommendation[i].id);
    if (r) r.style.backgroundColor = (clear ? "" : "Orange");
  }
}

function fnRatingChangedCB() {
  var x = event.target;
  var mid = parseInt(x.name.substr(1)); // get movieid by removing 'r' prefix
  // change row color
  var r = $(x).closest('tr')[0];
  if (r) r.style.backgroundColor = "YellowGreen"; 
  document.getElementById('updateBtn').disabled = false;
  
  if (!user)
    user = null_user;
  if (!user.rating)
    user.rating = [];
  for (var i in user.rating) {
    if (mid == user.rating[i].id) {
      // existed rating value
      user.rating[i].rate = x.value;
      return;
    }
  }
  // add new rating
  user.rating.push({id: mid, rate: x.value});
}

function fnToggleRatings(btn) {
	var isFilterOn = false;
  
	/* Custom filtering function which will filter data in column four between two values */
	$.fn.dataTableExt.afnFiltering.push(
		function( oSettings, aData, iDataIndex ) {
			var id = aData[0];
			if (isFilterOn == false)
				return true;
			for (var i in user.rating) {
				if (id == user.rating[i].id)
					return true;
			}
			for (var i in user.recommendation) {
				if (id == user.recommendation[i].id)
					return true;
			}
			return false;
		}
	);

	var oTable = $('#movies').dataTable();
	
	btn.addEventListener('click', function() { 
		isFilterOn = !isFilterOn; 
		this.innerHTML  = isFilterOn ? 'Show All' : 'Show Rated';
		oTable.fnDraw(); 
	}, false);
}

function fnCreateRatingColumnCB(data, type, full) {
  var s = [
    '<label><input type=radio name=r', data, ' value=5>5 </label>',
    '<label><input type=radio name=r', data, ' value=4>4 </label>',
    '<label><input type=radio name=r', data, ' value=3>3 </label>',
    '<label><input type=radio name=r', data, ' value=2>2 </label>',
    '<label><input type=radio name=r', data, ' value=1>1 </label>'];
  return s.join('');
}

function fnDocumentReadyCB() {
  $('#movies').dataTable( {
    "bProcessing": true,
    "sAjaxSource": '/movies',
    "fnCreatedRow": function( nRow, aData, iDataIndex ) {
      nRow.id = aData[0]; // add row id 
    },
    "aoColumnDefs": [ 
      { // create rating column
      "aTargets": [-1],
        "mData": 0, // data refer to MovieID column
        "bSortable": false,
        "mRender": fnCreateRatingColumnCB
      },
    ]
  }); 
  // init others
  fnInit();
}

function fnInit() {
  document.getElementById('movierows').addEventListener('change', fnRatingChangedCB, false);
  document.getElementById('userlist').addEventListener('change', fnUserChangedCB, false);
  document.getElementById('username').addEventListener('change', fnUserChangedCB, false);
  document.getElementById('updateBtn').addEventListener('click', fnPostUserData, false);
  document.getElementById('updateBtn').disabled = true;
  
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Show Rated'));
  fnToggleRatings(btn);
  
  document.getElementById('movies_filter').insertBefore(btn);

  // get user list
  fnFetchUsers();
};
