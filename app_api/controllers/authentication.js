var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getUser = function(req, res){
  return sendJSONresponse(res, 200, req.user);
}

module.exports.logout = function(req, res){
  return sendJSONresponse(res, 200, req.logout());
}
