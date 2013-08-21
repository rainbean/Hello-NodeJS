

/* call onload with table id(s) */
/*
function TR_set_toggle()
{
	// toggleRow method 
	var toggleRow = function()
	{
		this.style.display = ((this.style.display == '') ? 'none' : '');
		return false;
	}

	for (var oTable, a = 0; a < arguments.length; ++a)
	{
		oTable = document.getElementById(arguments[a]);
		var r = 0, row, rows = oTable.rows;
		while (row = rows.item(r++))
		{
			row.toggle = toggleRow;
		}
	}

	// convenience function
	self.toggleRow = function(row_id)
	{
		document.getElementById(row_id).toggle();
	}
}
*/

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

/* call onload with table id(s) */
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

function toggle(obj, alwaysOn)
{
	if (obj) 
		obj.style.display = ((obj.style.display == '' && !alwaysOn) ? 'none' : '');
}

/* call onload with table id(s) */
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
};
