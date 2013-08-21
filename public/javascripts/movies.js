var user = {
  "name": "Samuel",
  "id": 10001,
  "rating": [
    {
      "id": 2,
      "rate": 3
    },
    {
      "id": 3,
      "rate": 2
    },
    {
      "id": 18,
      "rate": 5
    }
  ], 	
  "recommendation": [
    {
      "id": 4,
    },
    {
      "id": 7,
    },
    {
      "id": 21,
    }
  ]
  
};

/* fill color per user's data */
function TR_set_color() {
    for (var row, i = 0; i < user.rating.length; ++i) {
        row = document.getElementById('mid' + user.rating[i].id);
        if (row)
			row.style.backgroundColor = "YellowGreen"; 
    }
    for (var row, i = 0; i < user.recommendation.length; ++i) {
        row = document.getElementById('mid' + user.recommendation[i].id);
        if (row)
			row.style.backgroundColor = "Orange ";
    }
}

function TR_insert_rating() {
	// it takes way longer to render html in client javascript dynamically
	if (1)
		return false;
		
	var oTable = document.getElementById('mid');
	var r = 0, row, rows = oTable.rows;
	while (row = rows.item(r++))
	{
		var id = row.cells[0].innerText;
		var td = row.insertCell(-1); // <-- bottleneck
		td.innerHTML = 
			"<label><input type='radio' name='mid" + id + "' value='5' /> 5 </label>" +
			"<label><input type='radio' name='mid" + id + "' value='4' /> 4 </label>" + 
			"<label><input type='radio' name='mid" + id + "' value='3' /> 3 </label>" + 
			"<label><input type='radio' name='mid" + id + "' value='2' /> 2 </label>" + 
			"<label><input type='radio' name='mid" + id + "' value='1' /> 1 </label>";
	}
}

/* toggle functions */
function toggle(obj, alwaysOn)
{
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
	oTable = document.getElementById('mid');
	var r = 0, row, rows = oTable.rows;
	while (row = rows.item(r++))
		toggle(row);
	TR_toggle_rows(user.rating, true);
	TR_toggle_rows(user.recommendation, true);
	return false;
}

onload = function() {
    TR_set_color();
	//TR_insert_rating();
};
