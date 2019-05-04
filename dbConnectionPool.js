var mysql = require('mysql');

var sysConfigPool = mysql.createPool({
  connectionLimit : 10,
  host: "10.101.4.13",
  port: "3401",
  database : 'solartissysconfigdbV3',
  user: "devuciuser",
  password: "devuciuser*11"
});

var sqls = {
  getSysConfigValue: 'SELECT ATTRIBUTE_VALUE, MODE, ENVIRONMENT FROM SYS_CONFIGURATION WHERE ATTRIBUTE_NAME=? AND OWNER_ID=0 AND ACTIVE=?'
}

exports.sqls = sqls;
exports.sysConfigPool = sysConfigPool;
