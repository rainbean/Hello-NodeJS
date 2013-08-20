
/*
 * GET users listing.
 */

exports.list = function(req, res){
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
