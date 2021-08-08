import Session from "../../Session";

export default Session(function(req, res){
  if(req.method !== 'POST')
    return res.status(405).json({ success: false, message: 'Not allowed!' });
  let success = false, message = 'Something went wrong!';
  if(!req.session.userID)
    message = 'You are not logged in!';
  else{
    req.session.destroy();
    success = true;
    message = 'You have successfully logged out!';
  }
  res.status(200).json({ success, message });
})