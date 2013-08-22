
/*
 * GET users listing.
 */
exports.list = function(req, res){
  var users = [ { name: 'Jimmy', id: 10000 },
                { name: 'Winston', id: 10002 },
                { name: 'Samuel', id: 10003 },
                { name: 'Jeremy', id: 10004 } ];
  res.send(users);
};

exports.list.html = function(req, res){
  var users = [ { name: 'Jimmy', office: 'Taipei' },
                { name: 'Winston', office: 'Taipei' },
                { name: 'Samuel', office: 'Freemout' },
                { name: 'Jeremy', office: 'Northpole' } ];
  res.render('users', { title: 'CEI User Database', users: users });
};

/*
 *  * GET specific user 
 *   */

exports.read = function(req, res){
  if (req.params.office)
    res.send("Hello " + req.params.name + " from " + req.params.office);
  else
    res.send("Hello " + req.params.name);
};
