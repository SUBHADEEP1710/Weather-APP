document.addEventListener("DOMContentLoaded", function() {
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async function() {
    let cityInput = document.getElementById('city-input').value.trim();
    if (cityInput === '') {
      alert('Please enter a city name.');
      return;
    }

    
    cityInput = cityInput.charAt(0).toUpperCase() + cityInput.slice(1).toLowerCase();

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(cityInput)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '596c4718f5mshe15a32519b44d54p1b9e49jsnd2295ffb7a7f',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json(); 
      console.log(result);

      
      const temperature = result.current.temp_c;
      const feelslike = result.current.feelslike_c;
      const description = result.current.condition.text;
      const humidity = result.current.humidity;
      const windSpeed = result.current.wind_kph;
      const winddir = result.current.wind_dir;
      const lastup = result.current.last_updated;      
      const country = result.location.country;
      const localtime = result.location.localtime;

      const [date, time] = localtime.split(' ');
      const [year, month, day] = date.split('-');
      const [hour, minute] = time.split(':');
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = months[Number(month) - 1];

      const formattedLocalTime = `${day} ${monthName} ${year} | ${hour}:${minute}`;
      
      const formattedwind = `${windSpeed} km/hr ${winddir}`;

      
      document.querySelector('.city').textContent = cityInput;
      document.querySelector('.temperature').textContent = `${temperature}°C`;
      document.querySelector('.feels-like').textContent = `Feels like: ${feelslike}°C`;
      document.querySelector('.description').textContent = `${description}`;
      document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
      document.querySelector('.wind-speed').textContent = `Wind Speed: ${formattedwind}`;
      document.querySelector('.last-updated').textContent = `Last updated: ${lastup}`;      
      document.querySelector('.country').textContent = ` ${country}`;
      document.querySelector('.local-time').textContent = formattedLocalTime;
      
      changeBackgroundImage(description);
    } catch (error) {
      console.error(error);
      alert('Failed to fetch weather data. Please try again later.');
    }
  });
});

function changeBackgroundImage(description) {
  const body = document.querySelector('body');
  switch (description.toLowerCase()) {
    case 'sunny':
      body.style.backgroundImage = 'url("img8.jpg")';
      break;
    case 'mist':
      body.style.backgroundImage = 'url("img13.jpg")';
      break;
    case 'overcast':
      body.style.backgroundImage = 'url("img10.jpg")';
      break;
    case 'clear':
      body.style.backgroundImage = 'url("img2.jpg")';
      break;
    case 'partly cloudy':
      body.style.backgroundImage = 'url("img3.jpg")';
      break;      
    case 'light snow':
      body.style.backgroundImage = 'url("img5.jpg")';
      break;
    case 'light rain shower':
      body.style.backgroundImage = 'url("img1.jpg")';
      break;
    case 'light rain':
      body.style.backgroundImage = 'url("img11.jpg")';
      break;
    case 'light drizzle':
      body.style.backgroundImage = 'url("img12.jpg")';
      break;
    case 'patchy rain nearby':
      body.style.backgroundImage = 'url("img9.jpg")';
      break;
    case 'patchy light snow':
      body.style.backgroundImage = 'url("img4.jpg")';
      break;
      

      
    default:
      body.style.backgroundImage = 'url("pic2.jpg")';
  }
}
