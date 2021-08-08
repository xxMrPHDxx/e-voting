import bcrypt from 'bcrypt';
import Session from "../../Session";
import db from '../../Database';

export default Session(async function handler(req, res) {
  if(req.method !== 'POST')
    return res.status(403).json({ success: false, message: 'Forbidden' });
  let success = false, message = 'Username cannot be found!', data = null;
  
  const [user] = await db.query(
    'SELECT * FROM users WHERE username=? LIMIT 1',
    [req.body.username]
  );
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      success = true;
      req.session.userID = user.id;
      data = { id: user.id, username: user.username, public_key: user.public_key };
    }else{
      message = 'Invalid password!';
    }
  }
  
  res.status(200).json({ success, message, data });
})