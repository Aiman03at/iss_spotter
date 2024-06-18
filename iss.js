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
    const ip = body.ip;
    callback(null,ip);
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
  
    
    const latitude = body.latitude
    const longitude = body.longitude
    callback(null, {latitude, longitude});

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
      {callback(error,null);
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
 callback(null,res);



});
};

module.exports = {fetchMyIP , fetchCoordsByIP ,fetchISSFlyOverTimes};