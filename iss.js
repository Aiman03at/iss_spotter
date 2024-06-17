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
 * 
 */
 const fetchCoordsByIP = function(ip,callback)  {
  ip = fetchMyIP
needle.get("http://ipwho.is/${ip}",(error, response, body) => {
  if (error) return (error,null);
  if(response.statusCode !== 200) {
    callback(Error(`Status code ${response.statusCode}when fetching coordinates`));
    return;
  }

  console.log(body);
  const latitude = body.latitude
    const longitude = body.longitude
    callback(null, {latitude, longitude});
 });
 }

module.exports = {fetchMyIP , fetchCoordsByIP };