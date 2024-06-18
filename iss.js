///will contain most of the logic for fetching the data from each API endpoint.

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const needle = require('needle');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    
    const data =response.body;
    if (data.ip) {
    const ip = data.ip;
    
    callback(null,ip);
    }else {
      callback(new Error('Invalid ip address'), null);
    }
  });
};


///FetchCords by coordinates
/**
 * take in two arguments: ip (string) and callback
 * @returns co-ordinates when successfull
 */
 const fetchCoordsByIP = function(ip,callback)  {
  
needle.get(`http://ipwho.is/${ip}`,(error, response, body) => {
 
  if (error) callback(error,null);
  ///if response is not successfulll
  if(response.statusCode !== 200) {
    callback(Error(`Status code ${response.statusCode}when fetching coordinates`));
    return;

  }
 //// checking for invalid ip address
 
  if (body.success === false) {
    return callback(new Error('Invalid IP address provided.'));
} 
  ///if the successfull

  
  const data = response.body;

    // Check if the response body contains latitude and longitude
    if (data && data.latitude && data.longitude) {
      const coordinates = {
        latitude: data.latitude,
        longitude: data.longitude
        
      };
      console.log(coordinates);
      callback(null, coordinates);
    } else {
      callback(new Error('Invalid response format: missing latitude or longitude'), null);
    }
  });
}

    
    
   
 
 







/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {

  needle.get(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(error, response, body) => {
  
    if (error) 
      {
        callback(error,null);
      }
    ///if response is not successfulll

    if(response.statusCode !== 200) {
      
      callback(Error(`Status code ${response.statusCode}when fetching coordinates`), null);
      return;
    }
   //// checking for invalid ip address
   
    if (body.success === false) {
      return callback(new Error('Invalid IP address provided.') ,null);
  }
  
 const res =body.response;
 if (res) {

 callback(null,res);
 } else {
  callback(new Error('Invalid response format: missing response body '), null);
 }



});
};



/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};