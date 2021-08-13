import Database from '../../Database';

const ELECTIONS_PER_PAGE = 10;

export default async function handler(req, res){
  if(req.method !== 'GET') return res.status(405).json({ success: false, message: 'Not allowed!' });
  let message = 'Something went wrong!', data = [];
  const from = (req.query.page || 0) * ELECTIONS_PER_PAGE;
  const to = from + ELECTIONS_PER_PAGE;
  const elections = await Database.query(
    `
      SELECT id, title, description
      FROM elections  
      LIMIT ?,?
    `,
    [from, to]
  );
  if(elections.length > 0){
    message = `Found ${elections.length} elections!`;
    data = elections;
  }
  else message = 'No election found!';
  res.status(200).json({ success: true, message, data });
}