import Database from '../../Database';

export default async function handler(req, res){
  let success = false, message = 'Something went wrong!', data = null;
  if(req.method === 'PUT'){
    const { title, description } = req.body;
    if(!title || !description)
      message = 'Title or description cannot be empty!';
    else if(title.length < 5)
      message = 'Title must have at least 5 characters!';
    else if(description.split(/\s+/g).length < 10)
      message = 'Description must have at least 10 words!';
    else{
      const result = await Database.query(
        `
          INSERT INTO elections (title, description)
          VALUE (?, ?)
        `,
        [title, description]
      );
      if(typeof result.insertId === 'number'){
        success = true;
        message = 'Election has been inserted successfully!';
        data = result;
      }
      else message = 'Failed to add election!';
    }
  }
  else if(req.method === 'POST'){
    const { id, title, description } = req.body;
    if(!title || !description)
      message = 'Title or description cannot be empty!';
    else if(title.length < 5)
      message = 'Title must have at least 5 characters!';
    else if(description.split(/\s+/g).length < 10)
      message = 'Description must have at least 10 words!';
    else{
      const result = await Database.query(
        `
          UPDATE elections
          SET title=?, description=?
          WHERE id=?
        `,
        [title, description, id]
      );
      if(typeof result.insertId === 'number'){
        success = true;
        message = 'Election has been updated successfully!';
        data = result;
      }
      else message = 'Failed to update election!';
    }
  }
  else if(req.method === 'DELETE'){
    const { id } = req.body;
    try{
      const { affectedRows } = await Database.query(
        `DELETE FROM elections WHERE id=?`,
        [id]
      )
      if(affectedRows !== 1)
        message = 'Failed to delete election!';
      else{
        success = true;
        message = `Election successfully deleted!`;
        data = result;
      }
    }catch(_){}
  }
  res.status(200).json({ success, message, data });
}