const router = require("express").Router();
const covidController = require("../../../controllers/covid");

// var requestOptions = {
//     method: 'GET',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

//   fetch("localhost:3000/api/covid/coordinates", requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

router
  .route("/coordinates")
  .post(covidController.post_coordinates)
  .get(covidController.get_coordinates);

router
  .route("/area/:neLat/:neLong/:swLat/:swLong")
  .get(covidController.get_map_report);

module.exports = router;
