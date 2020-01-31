var mysql=require("mysql")
var mysqlConfigure={
  host:"localhost",
  user:'BioCotton',
  password:"BioCotton39558728cotton@",
  port:'3306',
  database:'bioinformatic'
}
var oneConnection=mysql.createConnection(mysqlConfigure)
var poolConnection=mysql.createPool(mysqlConfigure)

module.exports={
  oneConnection,
  poolConnection
}