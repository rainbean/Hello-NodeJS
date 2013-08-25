var null_user = {name: '', id: 10000, rating: [], recommendation: []};
var user = null_user;
var userlist = [];
var oTable; // datatable reference
var openrows = []; // list of detail opened row

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
  
	/* toogle all rows */
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

	btn.addEventListener('click', function() { 
		isFilterOn = !isFilterOn; 
		this.innerHTML  = isFilterOn ? 'Show All' : 'Show Rated';
		oTable.fnDraw(); 
	}, false);
}

function fnClickDetailClickedCB() {
   var nTr = this.parentNode;
   var i = $.inArray( nTr, openrows );
    
   if ( i === -1 ) {
      $('img', this).attr( 'src', '/DataTables/examples/examples_support/details_close.png' );
      oTable.fnOpen( nTr, fnFormatDetails(nTr), 'details' );
      openrows.push( nTr );
    }
    else {
      $('img', this).attr( 'src', '/DataTables/examples/examples_support/details_open.png' );
      oTable.fnClose( nTr );
      openrows.splice( i, 1 );
    }
}
 
function fnFormatDetails( nTr )
{
  var oData = oTable.fnGetData( nTr );
  var imdbJSON = 'http://www.omdbapi.com/?t=' + oData[1] + '&y=' + oData[2];
  var sPlaceHolder = "<div id=o" + oData[0] + "><div>loading ...</div><img src='#'></div>";
  $.getJSON(imdbJSON, function(data) {
    var x = document.getElementById('o' + oData[0]);
	$('img', x).attr('src', data.Poster);
	$('div', x).text(data.Plot);
  });
  return sPlaceHolder;
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
  oTable = $('#movies').dataTable( {
    "bProcessing": true,
    "sAjaxSource": '/movies',
    "fnCreatedRow": function( nRow, aData, iDataIndex ) {
      nRow.id = aData[0]; // assign TR.id as movie id 
    },
    "aoColumnDefs": [ 
      { // create rating column
        "aTargets": [4],
        "mData": 0, // data refer to MovieID column
        "bSortable": false,
        "mRender": fnCreateRatingColumnCB
      },
	  { // create detail column
        "aTargets": [-1],
        "mData": null, // data refer to MovieID column
		"sClass": "detail", // just a pseudo class for reference
        "bSortable": false,
        "sDefaultContent": "<img src='/DataTables/examples/examples_support/details_open.png'>"
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
  
  $('#movies td.detail').live('click', fnClickDetailClickedCB);
  
  // Add show all/rated toggle button
  var filterbar = document.getElementById('movies_filter');
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Show Rated'));
  document.createTextNode('Show Rated');
  filterbar.appendChild(document.createTextNode(' / '));
  filterbar.appendChild(btn);
  fnToggleRatings(btn);

  // get user list
  fnFetchUsers();
};
