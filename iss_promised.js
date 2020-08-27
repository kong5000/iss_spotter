const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`);
};

const fetchISSFlyOverTimes = body => {
  const dataObj = JSON.parse(body);
  const lat = dataObj.data.latitude;
  const long = dataObj.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const flyOvers = JSON.parse(body).response;
      return flyOvers;
    });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };