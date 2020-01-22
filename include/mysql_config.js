var mysql=require("mysql")
var mysqlConfigure={
  host:"localhost",
  user:'zpliu',
  password:"123456",
  port:'3306',
  database:'Bioinformatic'
}
var oneConnection=mysql.createConnection(mysqlConfigure)
var poolConnection=mysql.createPool(mysqlConfigure)

module.exports={
  oneConnection,
  poolConnection
}