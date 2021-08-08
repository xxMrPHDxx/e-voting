import { withSession } from "next-session";
import session from 'express-session';
import mysql_session from 'express-mysql-session';

const MySQLSession = mysql_session(session)

const sessionStore = new MySQLSession({
  host: 'localhost', user: 'root', password: 'password', database: 'e-voting',
  maxAge: 86400000, // 1 day
})

export default function(handler){
  return withSession(handler, {
    store: sessionStore,
    cookie: {
      maxAge: 86400000, // 1 day
      httpOnly: false,
    },
    resave: false,
    saveUninitialized: false,
  })
}