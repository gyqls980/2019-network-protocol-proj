var express = require('express');
var app = express();
var template = require(`./lib/template.js`);
var qs = require('querystring');
var mysql = require('mysql');
var db = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'seory1225',
database :'2019project'
});
db.connect();
app.use(express.static("image"));
var title = 'Hyobin Diary';
app.get('/',function(request, response){ //main ?? ??
      var main_body = template.main_body();
      var html = 
        `<!doctype html>
          <html>
            <head>
              <title>${title}</title>
              <meta charset="utf-8">
            </head>
            <body bgcolor="#F8E0E6">
            ${main_body}       
            </body>
          </html>
        `;
      response.send(html);
})
app.get('/travel',function(request, response){ //travel diary ???
  db.query(`SELECT * FROM travel`, function(error, travels){
    
    var travel_list = template.travel_list(travels);
    var html =`
      <!doctype html>
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
          </head>
          <body bgcolor="#F8E0E6">
              ${travel_list}
          </body>
        </html>
    `;
    response.send(html);
  })
})

app.get('/travel/:pathId', function(request,response){ //travel diary ???? 
  db.query(`SELECT * FROM travel WHERE id=?`, [request.params.pathId], function(error, travels){
    var html =`
      <!doctype html>
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
          </head>
          <body bgcolor="#F8E0E6">
              <h1 style="font-size:30px;" ><p align="center">${travels[0].place}</p></h1>
              <img src="/${travels[0].content}" align="center" style="width:450px; height:450px; 
                  margin-right: auto; margin-left : auto; display: block;">
              <p style="font-size:15px;" align="center"><b>${travels[0].travel_date}</b></p>
              <div style="border: 2px solid #F5A9D0; height: auto; width: 650px; margin:auto;" >
                <p style="font-size:15px; margin-right : 20px; margin-left : 20px;">${travels[0].diary}</p>
              </div>
              
          </body>
        </html>
    `;
    response.send(html);
 })
})
      

  app.post('/delete_travellist', function(request, response){ //travel diary ?? ??
    var body = '';  
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          db.query(`DELETE FROM travel WHERE id =?`, [post.id], function(error, result){
            if (error){
              throw error;
            }
            response.redirect('/travel');
          });
      });
  
    })

app.post('/create_diary', function(request,response){ //travel diary ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(`INSERT INTO travel VALUES(?, ?, ?, ?, ?)`,
        [post.id, post.travel_date, post.place, "travel.jpg", post.diary],
        function(error, result){
          if(error){
            throw error;
          }
          response.redirect('/travel');
      })
      
    });
})
 app.get('/todolist', function(request, response){  //todolist ??? ??
  db.query(`SELECT * FROM todolist ORDER BY until`, function(error, checks){
    
    var todo_list = template.todo_list(checks);
    var html =`
      <!doctype html>
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
            
          </head>
          <body bgcolor="#F8E0E6">
              ${todo_list}
          </body>
        </html>
    `;

    response.send(html);
 })
        
})
app.post('/delete_todolist', function(request, response){ //todolist ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM todolist WHERE id =?`, [post.id], function(error, result){
          if (error){
            throw error;
          }
          response.redirect('/todolist');
        });
    });

  })



app.post('/create_todolist', function(request,response){ //todolist ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(`INSERT INTO todolist VALUES(?, ?, ?)`,
        [post.id, post.todo, post.until],
        function(error, result){
          if(error){
            throw error;
          }
          response.redirect('/todolist');
        }
      )
  });
})



app.get('/bucketlist', function(request, response){ //bucket list ???
  db.query(`SELECT * FROM bucketlist ORDER BY year`, function(error, lists){
          
            var bucket_list = template.bucket_list(lists);
            var bucket_create=template.bucket_create();
            var html =`
              <!doctype html>
                <html>
                  <head>
                    <title>${title}</title>
                    <meta charset="utf-8">
                    
                  </head>
                  <body bgcolor="#F8E0E6">
                      ${bucket_list}
                      ${bucket_create}
                      
                  </body>
                </html>
            `;
            response.send(html);
    })
 })

 app.get('/bucketlist/:pathId', function(request,response){ //bucket list ????
  db.query(`SELECT * FROM bucketlist ORDER BY year`, function(error, lists){
  db.query(`SELECT * FROM bucketlist WHERE year=?`, [request.params.pathId], function(error, list){
    var bucket_list = template.bucket_list(lists);
    var bucket_update = template.bucket_update(list);
    var html =`
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        
      </head>
      <body bgcolor="#F8E0E6">
            ${bucket_list}
            <div style="width:1000px;  float:left; margin-right:500px;  margin-bottom : 145px;">
              <p><h1 style="font-size:30px;" >${list[0].year}</h1></p>
              <p style="font-size:15px;" >${list[0].list}</p>
            </div>
            <div>${bucket_update}</div>
          
          </body>
        </html>
    `;
    response.send(html);
 })
})
 })

 app.post('/delete_bucketlist', function(request, response){ //bucket list ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM bucketlist WHERE year =?`, [post.year], function(error, result){
          if (error){
            throw error;
          }
          response.redirect('/bucketlist');
    })
  })
})

  app.post('/create_bucketlist', function(request,response){ //bucket list ?? ??
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        db.query(`INSERT INTO bucketlist VALUES(?, ?)`,
          [post.year, post.list],
          function(error, result){
            if(error){
              throw error;
            }
            response.redirect('/bucketlist');
          }
        )
    });
  })
  app.post('/update_bucketlist', function(request,response){ //bucket list ?? ??
    var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        db.query(`UPDATE bucketlist SET list=? WHERE year=?`,
          [post.list, post.year],
          function(error, result){
            if(error){
              throw error;
            }
            response.redirect('/bucketlist');
          }
        )

        
    });
  })
app.get('/visitors', function(request, response){ //??? ??? ???
  db.query(`SELECT * FROM visitors ORDER BY date`, function(error, visitors){
    
      var visitors_list = template.visitors_list(visitors);
      var html =`
        <!doctype html>
          <html>
            <head>
              <title>${title}</title>
              <meta charset="utf-8">
            </head>
            <body bgcolor="#F8E0E6">
                ${visitors_list}
                
            </body>
          </html>
      `;
      response.send(html);
  })
})

app.post('/delete_visitorslist', function(request, response){ //??? ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        db.query(`DELETE FROM visitors WHERE id =?`, [post.id], function(error, result){
          if (error){
            throw error;
          }
          response.redirect('/visitors');
        });
    });
})

app.post('/create_visitorslist', function(request,response){ //??? ?? ??
  var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
      var post = qs.parse(body);
      db.query(`INSERT INTO visitors VALUES(?,?, ?,?)`,
        [post.id,post.name, post.comment, post.date],
        function(error, result){
          if(error){
            throw error;
          }
          response.redirect('/visitors');
        }
      )
  });
})

app.get('/aboutme', function(request, response){ //?? ?? ???
  db.query(`SELECT * FROM aboutme`, function(error, lists){
    
    var aboutme_list = template.aboutme_list(lists);
    var html =`
      <!doctype html>
        <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
          </head>
          <body bgcolor="#F8E0E6">
              ${aboutme_list}
          </body>
        </html>
    `;
    response.send(html);
  })
 
})

app.listen(8080);

