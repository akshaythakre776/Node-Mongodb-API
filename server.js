const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const http = require('http');
const MongoClient = require('mongodb').MongoClient 

 
 server = http.createServer(app)
 port = process.env.PORT || 3000;
 app.use(bodyParser.urlencoded({extended: true}))
 app.listen(port);
	
	app.use(function (req, res, next) {
			// Website you wish to allow to connect
			res.setHeader('Access-Control-Allow-Origin', '*');
			// Request methods you wish to allow
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			// Request headers you wish to allow
			res.setHeader('Access-Control-Allow-Headers', '*');
			// Set to true if you need the website to include cookies in the requests sent
			// to the API (e.g. in case you use sessions)
			res.setHeader('Access-Control-Allow-Credentials', true);
			// Pass to next layer of middleware
			next();
		});

 console.log('API is working on IP address ' + port);
 console.log('Navigate to http://10.102.8.101:3000/customer');
//  console.log('Hello Testing ')
 
var db
MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mainframe') // whatever your database name is
})

// app.get('/', (req, res) => {
//     res.send('Hello World')
//     //  console.log(req.body);
//   })
app.get('/customer', (req, res) => {
	
	
  db.collection('customer').find().toArray(function(err, result) {
      res.send(result)
      if (err) return console.log(err)
  })
})

app.get('/customer/:id', function(req,res){
	
	
         var ssn_search = { 'ssn' : req.params.id };
        //  console.log(query);
        //  console.log('query');
        db.collection('customer', function(err, collection) {
                collection.findOne(ssn_search, function(err, item) {
                // console.log(err);
                res.send(item);
            });
        });
    });

    // app.use(function(req, res) {
    //     res.status(404).send({url: req.originalUrl + ' not found'})
    //   });
server.close(function(){
 server.listen(3000,'10.102.8.101')
})