// index.js
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp("69.172.150.214", (error, coordinates) => {
//   if(error){
//     console.log("It didn't work! " + error);
//   } else{
//     console.log(coordinates);
//   }
// })

// fetchFlyOverTimes({ latitude: '49.27400', longitude: '-123.00740' }, (error, flyOvers) => {
//   if (error) {
//     console.log("It didn't work! " + error);
//   } else {
//     console.log(flyOvers);
//   }
// })

nextISSTimesForMyLocation((error, flyOvers) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let flyOver of flyOvers) {
    const unixTime = flyOver.risetime;
    const milliseconds = unixTime * 1000;
    const dateObj = new Date(milliseconds);
    const dateString = dateObj.toString();
    console.log(`Next pass at ${dateString} for ${flyOver.duration} seconds!`);
  }
});