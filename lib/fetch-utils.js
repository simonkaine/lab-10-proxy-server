const fetch = require('node-fetch');

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

async function weatherData(lat, lon) {
  const apiResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT}&lat=${lat}&lon=${lon}
`);
  const apiResponseData = await apiResponse.json();
  const mapData = apiResponseData.data.map((weatherObj) => {
    return {
      forecast: weatherObj.weather.description,
      time: new Date(weatherObj.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return mapData;
}

module.exports = {
//   locationData,
  weatherData
};