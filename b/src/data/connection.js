import mysql2 from 'mysql2';
import config from '../config'

const pool = mysql2.createPool({
  connectionLimit: 12,
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
})

export const db = async (query, values) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results, fields) => {
      if (err) {
        reject(err)
      }
      resolve({ results, fields })
    })
  })
}



