import mysql from 'mysql';

class MySQLDatabase {
  constructor(host, user, password, database){
    this._db = mysql.createConnection({
      host, user, password, database,
    })
    this._db.connect((err) => console.error(
      err?`Failed to connect to database: ${err}`:'Connected to database'
    ))
  }
  query(stmt, values=[]){
    return new Promise((resolve, reject)=>this._db.query(stmt, values, (err, results, _fields)=>{
      if(err) return reject(err);
      resolve(results);
    }));
  }
}

const Database = new MySQLDatabase('localhost', 'root', 'password', 'e-voting');

export default Database;