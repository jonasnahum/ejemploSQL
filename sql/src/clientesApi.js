var ClientesApi = (function() {
    var ClientesApi = function(dbConnection) {
        this.con = dbConnection.connect();
    };
     //curl http://localhost:3000/clientes/api/
     ClientesApi.prototype.getAll = function(req, res, next) {
         var that = this;
         that.con.query('SELECT * FROM books',function(err,rows){
           if(err)
             console.log(err);
           console.log('Data received from Db:\n');
           console.log(rows);
           return res.json(rows);
         });
      };

      //curl http://localhost:3000/clientes/api/3
      ClientesApi.prototype.getOne = function(req, res, next) {
          var that = this;
          var id = req.params.id;
          that.con.query('SELECT * FROM books WHERE ID = ' + id,function(err,rows){
            if(err)
              console.log(err);
            console.log('Data received from Db:\n');
            console.log(rows);
            return res.json(rows);
          });
      };
//curl -i -H "Content-Type: application/json" -d '{ "title": "el principito", "author": "josepth" }' http://localhost:3000/clientes/api/
    ClientesApi.prototype.save = function(req, res, next){
        var that = this;
        var title = JSON.stringify(req.body.title);
        var author = JSON.stringify(req.body.author);

        var text = "INSERT INTO books (title, author) VALUES (";
        var coma = ",";
        var cierra = ")";
        var total = text + title + coma + author + cierra;


          that.con.query(total,function(err,rows){
          if(err)
            console.log(err);
          console.log(rows);
          return res.json(rows);
        });
      };

//curl -X PUT -i -H "Content-Type: application/json" -d '{ "title": "el principito", "author": "josepth" }' http://localhost:3000/clientes/api/4
    ClientesApi.prototype.update = function(req, res, next){
        var that = this;
        var title = JSON.stringify(req.body.title);
        var author = JSON.stringify(req.body.author);
        var text1 = "UPDATE books SET title = "
        var coma = ",";
        var total = text1 + title + coma + "author = " + author + " WHERE id = " + req.params.id;
        console.log(total);
          that.con.query(total,function(err,rows){
          if(err)
            console.log(err);
          console.log(rows);
          return res.json(rows);
        });
      };

//curl -X "DELETE" http://localhost:3000/clientes/api/1
    ClientesApi.prototype.delete = function(req, res, next) {
        var that = this;
        var text = "DELETE FROM books WHERE id = " + req.params.id;
        that.con.query(text,function(err,rows){
          if(err)
            console.log(err);
          console.log(rows);
          return res.json(rows);
        });
    };

    return ClientesApi;
})();
module.exports = ClientesApi;
