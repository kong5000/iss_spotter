const { nextISSTimesForMyLocation } = require('./iss_promised');


nextISSTimesForMyLocation()
  .then(flyovers => {
    console.log(flyovers);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
