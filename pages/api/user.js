import bcrypt from 'bcrypt';
import KeyPair from '../../KeyPair';
import Database from '../../Database';

export default async function(req, res){
  let success = false, message = 'Something went wrong!', data = null;
  if(req.method === 'PUT'){
    const { username, name, password, is_admin } = req.body;
    if(!username || !name || !password)
      message = 'Name, Username & Password cannot be empty!';
    else{
      // Extra checks here
      if(name.length < 5 || name.length > 32)
        message = 'Name must have at least 5 and at most 32 characters!';
      else if(username.length < 5 || username.length > 32)
        message = 'Username must have at least 5 and at most 32 characters!';
      else if(password.length < 8)
        message = 'Password must have at least 8 characters!';
      else{
        const keypair = KeyPair.generate();
        const hashed = bcrypt.hashSync(password, 10);
        await Database.query(
          `
            INSERT INTO users (name, username, password, private_key, public_key, is_admin) 
            VALUE (?, ?, ?, ?, ?, ?)
          `,
          [name, username, hashed, keypair.private, keypair.public, is_admin && 1 || 0]
        );
        const [user] = await Database.query(
          `
            SELECT id, name, username, is_admin, public_key
            FROM users WHERE username=?
          `,
          username
        );
        success = true;
        message = 'User added successfully!';
        data = user;
      }
    }
  }
  else if(req.method === 'POST'){
    const { id, username, name, password, is_admin } = req.body;
    if(!username || !name)
      message = 'Name, Username & Password cannot be empty!';
    else{
      // Extra checks here
      if(name.length < 5 || name.length > 32)
        message = 'Name must have at least 5 and at most 32 characters!';
      else if(username.length < 5 || username.length > 32)
        message = 'Username must have at least 5 and at most 32 characters!';
      else if(password.length > 0 && password.length < 8)
        message = 'Password must have at least 8 characters!';
      else{
        const stmt = password.length > 0 ? `
          UPDATE users SET 
          name=?, username=?, password=?, is_admin=?
          WHERE id=?
        ` : `
          UPDATE users SET 
          name=?, username=?, is_admin=?
          WHERE id=?
        `;
        const args = password.length > 0 ? [
          name, username, bcrypt.hashSync(password, 10), is_admin&&1||0, id
        ] : [
          name, username, is_admin&&1||0, id
        ];
        const result = await Database.query(stmt, args);
        success = true;
        message = 'User updated successfully!';
        data = result;
      }
    }
  }
  else if(req.method === 'DELETE'){
    const { id } = req.body;
    try{
      const { affectedRows } = await Database.query(
        "DELETE FROM users WHERE id=? AND is_admin=0",
        [id]
      );
      if(affectedRows !== 1)
        message = 'Cannot delete an Admin!';
      else{
        success = true;
        message = `User successfully deleted!`;
        data = result;
      }
    }catch(_){}
  }
  res.json({ success, message, data });
}