var DbConnection = function (mysql) {
    this.mysql = mysql.module;
    this.conObj;
}
DbConnection.prototype.connect = function (connectionObj) {
    var that = this;
    that.conObj = that.mysql.createConnection(connectionObj);
    con.connect(function(err){
      if(err){
        console.log(err);
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
    });
    that.conObj.end(function(err) {
      // The connection is terminated gracefully
      // Ensures all previously enqueued queries are still
      // before sending a COM_QUIT packet to the MySQL server.
    });
}

module.exports = DbConnection;
