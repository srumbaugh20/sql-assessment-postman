const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost',
  port: 5432,
  database: 'accessbox',
  user: 'postgres',
  password: 'domrep20'
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })
})


// ===== Build enpoints below ============
app.get('/api/users', function(req, res) {
  db.users(function(err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});


app.get('/api/vehicles', function(req, res) {
  db.vehicles(function(err, vehicles) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(vehicles);
    }
  });
});


app.post('/api/users', function(req, res) {
  db.post_user([req.body.name, req.body.email], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response)
    }
  });
});


app.post('/api/vehicles', function(req, res) {
  db.post_vehicle([req.body.make, req.body.model, req.body.year, req.body.owner_id], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response)
    }
  });
});


app.get('/api/user/:userId/vehiclecount', function(req, res) {
  db.getUserCount(parseInt(req.params.userId), function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.get('/api/user/:userId/vehicle', function(req, res) {
  db.getUserVehicles(req.params.user_id, function(err, response) {
    console.log(req.params.user_id);
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.get('/api/vehicle', function(req, res){
  if(req.query.userFirstStart){
    console.log(req.query.userFirstStart);
    req.app.get('db').vehicle_userFirstStart([req.query.userFirstStart]).then(function(response){
      console.log(response);
      res.status(200).send(response)
    })
  } else {
    req.app.get('db').vehicle_email([req.query.userEmail]).then(function(response){
      res.status(200).send(response)
    })
  }
})


app.get('/api/newervehiclesbyyear', function(req, res) {
  var year = 2000;
  db.newervehicles([year], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
  var userId = parseInt(req.params.userId);
  var vehicleId = parseInt(req.params.vehicleId);
  db.updateVehicle([vehicleId, userId], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
  var vehicleId = req.params.vehicleId;
  db.deleteOwner([vehicleId], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});


app.delete('/api/vehicle/:vehicleId', function(req, res) {
  var id = req.params.vehicleId;
  db.deleteVehicle([id], function(err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(response);
    }
  });
});






// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
