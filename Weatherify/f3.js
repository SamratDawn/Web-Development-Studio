console.clear();

var latitude = "",
  longitude = "";

var temp;

var isUsed = false;
var div = document.getElementById("list");
var envCache = null;

const loadEnv = async () => {
  if (envCache) return envCache;

  const response = await fetch("./config.json");
  envCache = await response.json();

  return envCache;
};

const showWeather = (weather) => {
  if (!isUsed) isUsed = true;
  else {
    var list = document.getElementById("newList");
    div.removeChild(list);
  }

  var list = document.createElement("ul");
  list.id = "newList";

  var lat = document.createElement("span");
  lat.appendChild(document.createTextNode("Latitude: " + latitude + "° N"));
  temp=document.createElement('li')
  temp.appendChild(lat)
  list.appendChild(temp);

  var lon = document.createElement("span");
  lon.appendChild(document.createTextNode("Longitude: " + longitude + "° E"));
  temp=document.createElement('li')
  temp.appendChild(lon)
  list.appendChild(temp);

  var country = document.createElement("span");
  country.appendChild(document.createTextNode("Country: " + weather.location.country));
  temp=document.createElement('li')
  temp.appendChild(country)
  list.appendChild(temp);

  var name = document.createElement("span");
  name.appendChild(document.createTextNode("Name: " + weather.location.name));
  temp=document.createElement('li')
  temp.appendChild(name)
  list.appendChild(temp);

  var region = document.createElement("span");
  region.appendChild(
    document.createTextNode("Region: " + weather.location.region)
  );
  temp=document.createElement('li')
  temp.appendChild(region)
  list.appendChild(temp);

  var localtime = document.createElement("span");
  localtime.appendChild(
    document.createTextNode("Local Time: " + weather.location.localtime)
  );
  temp=document.createElement('li')
  temp.appendChild(localtime)
  list.appendChild(temp);

  var condition = document.createElement("span");
  condition.appendChild(
    document.createTextNode("Condition: " + weather.current.condition.text)
  );
  temp=document.createElement('li')
  temp.appendChild(condition)
  list.appendChild(temp);

  temp_c = document.createElement("span");
  temp_c.appendChild(
    document.createTextNode("Temperature: " + weather.current.temp_c + "° C")
  );
  temp=document.createElement('li')
  temp.appendChild(temp_c)
  list.appendChild(temp);

  var feels = document.createElement("span");
  feels.appendChild(
    document.createTextNode(
      "Feels Like: " + weather.current.feelslike_c + "° C"
    )
  );
  temp=document.createElement('li')
  temp.appendChild(feels)
  list.appendChild(temp);

  var gust = document.createElement("span");
  gust.appendChild(
    document.createTextNode("Gust: " + weather.current.gust_kph + " KMPH")
  );
  temp=document.createElement('li')
  temp.appendChild(gust)
  list.appendChild(temp);

  var humidity = document.createElement("span");
  humidity.appendChild(
    document.createTextNode("Humidity: " + weather.current.humidity + " %")
  );
  temp=document.createElement('li')
  temp.appendChild(humidity)
  list.appendChild(temp);
  
  var precipitation = document.createElement("span");
  precipitation.appendChild(
    document.createTextNode(
      "Precipitation: " + weather.current.precip_mm + " mm"
    )
  );
  temp=document.createElement('li')
  temp.appendChild(precipitation)
  list.appendChild(temp);

  var pressure = document.createElement("span");
  pressure.appendChild(
    document.createTextNode("Pressure: " + weather.current.pressure_mb + " mb")
  );
  temp=document.createElement('li')
  temp.appendChild(pressure)
  list.appendChild(temp);

  var uv = document.createElement("span");
  uv.appendChild(document.createTextNode("UV: " + weather.current.uv));
  temp=document.createElement('li')
  temp.appendChild(uv)
  list.appendChild(temp);

  var wind_degree = document.createElement("span");
  wind_degree.appendChild(
    document.createTextNode("Wind Degree: " + weather.current.wind_degree)
  );
  temp=document.createElement('li')
  temp.appendChild(wind_degree)
  list.appendChild(temp);

  var wind_dir = document.createElement("span");
  wind_dir.appendChild(
    document.createTextNode("Wind Direction: " + weather.current.wind_dir)
  );
  temp=document.createElement('li')
  temp.appendChild(wind_dir)
  list.appendChild(temp);

  var wind_speed = document.createElement("span");
  wind_speed.appendChild(
    document.createTextNode("Wind Speed: " + weather.current.wind_kph + " KMPH")
  );
  temp=document.createElement('li')
  temp.appendChild(wind_speed)
  list.appendChild(temp);

  div.appendChild(list);
};

const getWeather = async () => {
  const env = await loadEnv();
  const url =
    "https://weatherapi-com.p.rapidapi.com/current.json?q=" +
    latitude +
    "%2C" +
    longitude;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": env.RAPIDAPI_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    showWeather(result);
  } catch (error) {
    console.error(error);
  }
};

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  latitude = document.getElementById("latitude").value;
  longitude = document.getElementById("longitude").value;
  getWeather();
});

document.getElementById("btn_sys").addEventListener("click", (e) => {
  e.preventDefault();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather();
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
});
