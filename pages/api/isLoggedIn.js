import Session from '../../Session';
import Database from '../../Database';

import KeyPair from '../../KeyPair';

export default Session(async function handler(req, res) {
  if(req.method !== 'POST')
    return res.status(403).json({ success: false, message: 'Forbidden Access' });
  let success = false, message = 'Not logged in!', data = null;
  if(req.session.userID){
    const [user] = await Database.query(
      `
        SELECT id, name, username, CONVERT(public_key USING utf8) AS public_key, is_admin 
        FROM users WHERE id=?
      `, 
      req.session.userID
    );
    success = true;
    message = 'Success!';
    data = {
      userID: user.id,
      name: user.name,
      username: user.username,
      public_key: user.public_key,
      is_admin: user.is_admin,
    };
  }
  res.status(200).json({ success, message, data });
})
