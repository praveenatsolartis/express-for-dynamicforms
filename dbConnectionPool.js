var mysql = require('mysql');

var sysConfigPool = mysql.createPool({
  connectionLimit : 10,
  host: "10.101.4.13",
  port: "3401",
  database : 'solartissysconfigdbV3',
  user: "devuciuser",
  password: "devuciuser*11"
});

var productConfigPool = mysql.createPool({
  connectionLimit : 10,
  host: "10.101.4.13",
  port: "3401",
  database : 'isoratingdb',
  user: "devuciuser",
  password: "devuciuser*11"
});

var sqls = {
  getSysConfigValue: 'SELECT ATTRIBUTE_VALUE, MODE, ENVIRONMENT FROM SYS_CONFIGURATION WHERE ATTRIBUTE_NAME=? AND OWNER_ID=0 AND ACTIVE=?',
  getProductAndVersionDetails: 'SELECT PRD_PRODUCT.PRD_PRODUCT_ID, PRD_PRODUCT_VER.PRD_PRODUCT_VER_ID, PRD_PRODUCT.PRODUCT_NAME, PRD_PRODUCT.PRD_PRODUCT_NUMBER, PRD_PRODUCT_VER.PRD_PRODUCT_VER_NUMBER FROM PRD_PRODUCT INNER JOIN PRD_PRODUCT_VER ON PRD_PRODUCT.PRD_PRODUCT_ID = PRD_PRODUCT_VER.PRD_PRODUCT_ID WHERE PRD_PRODUCT.LINE_OF_BUSINESS=? AND PRD_PRODUCT_VER.OWNER_ID =? AND  PRD_PRODUCT.OWNER_ID =? AND APPLICABLE_FROM_DATE <= ? AND (? BETWEEN EFFECTIVE_DATE AND EXPIRATION_DATE) AND PRD_PRODUCT.ACTIVE=? AND PRD_PRODUCT_VER.ACTIVE=? LIMIT 1'
}

exports.sqls = sqls;
exports.sysConfigPool = sysConfigPool;
exports.productConfigPool = productConfigPool;
