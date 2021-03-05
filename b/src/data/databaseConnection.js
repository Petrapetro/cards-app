import config from "../config";

const mysql = require('mysql');

const mysqlConn = mysql.createConnection({
  ...config.mysql
});

mysqlConn.connect((err) => {
  if (err) {
    logger.error(err)
  } else {
    logger.log('db connect')
  }
}
)

export { mysqlConn }