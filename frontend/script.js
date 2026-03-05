async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  if (data.error) {
    document.getElementById("result").innerHTML = `<p>${data.error}</p>`;
  } else {
    document.getElementById("result").innerHTML = `
<h2>${data.city}</h2>
<p>Temperature: ${data.temperature}°C</p>
<p>Weather: ${data.weather}</p>
`;
  }
}
