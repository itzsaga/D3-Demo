'use strict';

// takes raw JSON from openweather.org
// returns array of temperatures for given type: temp, temp_min, or temp_max
const sortTimeTemps = (data) => {
  let timeTemps = [];
  data.list.forEach((list) => {
    timeTemps.push({
      time: list.dt * 1000,
      temp_max: list.main.temp_max
    });
  });
  return timeTemps;
};

//When submit button is clicked,
// Passes in value from zip code field, makes API call,
// Sorts api data, passes data to drawChart function
$('#submit').click(() => {
  $('#chart').empty();
  let zip = $('#zip-input').val();
  getWeather(zip)
    .then(data => {
      console.log(data);
      $('.city').css('display', 'initial');
      $('#city').text(data.city.name);
      drawChart(sortTimeTemps(data));
    })
    .catch(error => {
      $('#chart').html(`<p>${error}</p>`);
    });
});
