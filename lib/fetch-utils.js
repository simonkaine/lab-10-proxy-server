// const fetch = require('node-fetch');

// async function locationData(req, res) {
//   const search = req.query.search;
//   const apiResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_CODING}&q=${search}&format=json`);
//   const apiData = await apiResponse.json();

//   const returnData = {
//     formatted_query: apiData[0].display_name, 
//     latitude: apiData[0].lat,
//     longitude: apiData[0].lon
//   };
//   res.json(returnData);
// }

// module.exports = {
//   locationData
// };