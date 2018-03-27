const express = require('express')
// const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const path = process.env.PATH || 3000;
const overvewPath = process.env.OVERVIEW || 'localhost:3002';
const reviewsPath = process.env.REVIEW || 'localhost:3001';
const qaPath = process.env.QANDA || 'localhost:3004';
const nearbyPath = process.env.NEARBY || 'localhost:3003';

// app.use(morgan('dev'));
// app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/:listing_id', express.static(path.join(__dirname, 'public')));

// //bryan & Jeffery
// app.use('/reviews', (req, res) => {
//   console.log(req.originalUrl);
//   axios.get(`http://${reviewsPath}${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

//eric & Erin 
app.use('/overview', (req, res) => {
  console.log(req.originalUrl);
  axios.get(`http://${overvewPath}${req.originalUrl}`)
    .then(res => res.data)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("this is the path it is trying to get: ", req.originalUrl)
      console.log(err);
      res.send();
    });
});

// //kirk & Trever
// app.use('/nearby', (req, res) => {
//   console.log(req.originalUrl);
//   axios.get(`http://${nearbyPath}${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //kyle & Ivy
// app.use('/q-and-a', (req, res) => {
//   console.log(req.originalUrl);
//   axios.get(`http://${qaPath}${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

// //zack Not using this service for SDC
// app.use('/recommendations', (req, res) => {
//   console.log(req.originalUrl);
//   axios.get(`http://recommendations:3005${req.originalUrl}`)
//     .then(res => res.data)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send();
//     });
// });

app.listen(port, () => {
  console.log(`server running at: http://${path}:${port}`)
});