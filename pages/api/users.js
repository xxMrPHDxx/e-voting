import Database from '../../Database';

const USERS_PER_PAGE = 10;

export default async function handler(req, res){
  if(req.method !== 'GET') return res.status(405).json({ success: false, message: 'Not allowed!' });
  let success = false, message = 'Something went wrong!', data = [];
  const from = (req.query.page || 0) * USERS_PER_PAGE;
  const to = from + USERS_PER_PAGE;
  const [details, users] = await Promise.all([
    Database.query(
      `SELECT FLOOR((COUNT(*)-1)/10)+1 AS num_pages FROM users`,
      [USERS_PER_PAGE]
    ),
    Database.query(
      `
        SELECT id, name, username, is_admin, CONVERT(public_key USING utf8) as public_key
        FROM users  
        LIMIT ${from},${to}
      `
    ),
  ]);
  if(users.length > 0){
    success = true;
    message = `Found ${users.length} users!`;
    data = { 
      users, 
      totalPage: details && details.length === 1 ? details[0].num_pages : 1 
    };
  }
  else message = 'No user found!';
  res.status(200).json({ success, message, data });
}