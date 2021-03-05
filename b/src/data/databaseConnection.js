import config from "../config";

const mysql2 = require('mysql2');

const mysqlConn = mysql2.createConnection({
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