const fetch = require('node-fetch');

async function locationData(search) {
  const apiResponse = await fetch(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_CODING}&q=${search}&format=json`);
  const apiData = await apiResponse.json();

  const returnData = {
    formatted_query: apiData[0].display_name, 
    latitude: apiData[0].lat,
    longitude: apiData[0].lon
  };
  return returnData;
}

async function weatherData(lat, lon) {
  const apiResponse = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_BIT}&lat=${lat}&lon=${lon}`);
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

async function reviewData(lat, lon) {
  const url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`;
  let bearer = 'Bearer ' + process.env.YELP_API;
  const apiResponse = await fetch(url, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
  });
  const apiResponseData = await apiResponse.json();

  const mapData = apiResponseData.buisness.map((reviewObj) => {
    return {
      name: reviewObj.name,
      image_url: reviewObj.image_url,
      price: reviewObj.price,
      rating: reviewObj.rating,
      url: reviewObj.url
    };
  });

  return mapData; 
}

module.exports = {
  locationData,
  weatherData, 
  reviewData
};