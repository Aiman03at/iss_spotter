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
  ///if the successfull
  if (response.statusCode === 200) {
    console.log("Successfull");
    const latitude = body.latitude
    const longitude = body.longitude
    callback(null, {latitude, longitude});
}
 });
 }

module.exports = {fetchMyIP , fetchCoordsByIP };