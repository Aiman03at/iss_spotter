///this will require and run our main fetch function.



const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  // success, print out the deets!
  console.log(passTimes);
});





/*const {fetchMyIP}= require("./iss");
const {fetchCoordsByIP} = require("./iss");
const {fetchISSFlyOverTimes} =require("./iss");
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip); 
});

fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
  
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' },(error,res) =>{

if(error) {
  console.log("It didn't work", errorr);
  return;

}
console.log("It worked !", res);
})*/ 