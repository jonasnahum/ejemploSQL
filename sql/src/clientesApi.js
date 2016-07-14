var ClientesApi = (function() {
    var ClientesApi = function(dbConnection) {
        this.con = dbConnection.connect();
        this.table = ["books"];
    };
     //curl http://localhost:3000/clientes/api/
     ClientesApi.prototype.getAll = function(req, res, next) {
         var that = this;
         // doble ?? query identifiers ? para valores.
         that.con.query("SELECT * FROM ??",that.table,function(err,rows){
            if(err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        });
      };

      //curl http://localhost:3000/clientes/api/3
      ClientesApi.prototype.getOne = function(req, res, next) {
          var that = this;
          that.con.query("SELECT * FROM ?? WHERE ID = ?",[that.table,req.params.id],function(err,rows){
            if(err)
              console.log(err);
            console.log(rows);
          });
      };

      //curl -i -H "Content-Type: application/json" -d '{ "title": "diario de una princesa", "author": "patty" }' http://localhost:3000/clientes/api/
      ClientesApi.prototype.save = function(req, res, next){
          var that = this;
          var post = {title: req.body.title, author:req.body.author};
          that.con.query("INSERT INTO ?? SET ?", [that.table,post], function(err,results,fields){
            if(err)
              console.log(err);
            console.log(results);
          });
        };

        //curl -X PUT -i -H "Content-Type: application/json" -d '{ "title": "el principito", "author": "josepth" }' http://localhost:3000/clientes/api/4
        ClientesApi.prototype.update = function(req, res, next){
            var that = this;
            var post = {title: req.body.title, author:req.body.author,};
            that.con.query("UPDATE ?? SET ? WHERE ID = ?", [that.table, post, req.params.id], function(err,rows){
              if(err)
                console.log(err);
              console.log(rows);
            });
        };

        //curl -X "DELETE" http://localhost:3000/clientes/api/10
        ClientesApi.prototype.delete = function(req, res, next) {
            var that = this;
            that.con.query("DELETE FROM ?? WHERE ID = ?", [that.table,req.params.id], function(err,rows){
              if(err)
                console.log(err);
              console.log(rows);
            });
        };
    return ClientesApi;
})();
module.exports = ClientesApi;
