/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
  // use request to fetch IP address from JSON API
};

const fetchCoordsByIp = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) {
      callback("Error!", null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body).data;
    const coords = { latitude: data.latitude, longitude: data.longitude };
    callback(null, coords);
  });
};

const fetchFlyOverTimes = (coords, callback) => {
  const lat = coords.latitude;
  const long = coords.longitude;
  request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`, (error, response, body) => {
    if (error) {
      callback("Error!", null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const flyOvers = data.response;
    callback(null, flyOvers);
  });
};

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchCoordsByIp(ip, (error, coordinates) => {
      if (error) {
        console.log("It didn't work! " + error);
        return;
      }
      fetchFlyOverTimes({ latitude: '49.27400', longitude: '-123.00740' }, (error, flyOvers) => {
        if (error) {
          console.log("It didn't work! " + error);
        } else {
          for (let flyOver of flyOvers) {
            const unixTime = flyOver.risetime;
            const milliseconds = unixTime * 1000;
            const dateObj = new Date(milliseconds);
            const dateString = dateObj.toString();
            console.log(`Next pass at ${dateString} for ${flyOver.duration} seconds!`)
          }
        }
      })
    })
  });

  // fetchCoordsByIp("69.172.150.214", (error, coordinates) => {
  //   if(error){
  //     console.log("It didn't work! " + error);
  //   } else{
  //     console.log(coordinates);
  //   }
  // })
  // empty for now
}

module.exports = { fetchMyIP, fetchCoordsByIp, fetchFlyOverTimes, nextISSTimesForMyLocation };