import Database from '../../Database';

const USERS_PER_PAGE = 10;

export default async function(req, res){
  if(req.method !== 'GET') return res.status(405).json({ success: false, message: 'Not allowed!' });
  let message = 'Something went wrong!', data = [];
  const from = (req.query.page || 0) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE;
  const users = await Database.query(
    `
      SELECT id, name, username, is_admin, CONVERT(public_key USING utf8) as public_key
      FROM users  
      LIMIT ${from},${to}
    `
  );
  if(users.length > 0){
    message = `Found ${users.length} users!`;
    data = users;
  }else message = 'No user found!';
  res.status(200).json({ success: true, message, data });
}