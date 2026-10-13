console.clear();

var service = "",
  country = "",
  keyword = "";

var div = document.getElementById("container");
var isUsed = false;
var envCache = null;

const loadEnv = async () => {
  if (envCache) return envCache;

  const response = await fetch("./config.json");
  envCache = await response.json();

  return envCache;
};

const showMovies = (movies) => {
  if (!isUsed) {
    isUsed = true;
  } else {
    var list = document.getElementById("list");
    div.removeChild(list);
  }
  var list = document.createElement("ol");
  list.id = "list";
  movies.map((element) => {
    var textNode = document.createTextNode(
      "Name: " +
        element.title +
        ", IMDB Rating: " +
        element.tmdbId +
        ", Year: " +
        element.year
    );
    var listItem = document.createElement("li");
    listItem.appendChild(textNode);
    list.appendChild(listItem);
  });
  div.appendChild(list);
};

async function getMovies() {
  const env = await loadEnv();
  const url =
    "https://streaming-availability.p.rapidapi.com/search/filters?services=" +
    service +
    "&country=" +
    country +
    "&keyword=" +
    keyword +
    "&output_language=en&order_by=original_title&genres_relation=and&show_type=all";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": env.RAPIDAPI_KEY,
      "X-RapidAPI-Host": env.RAPIDAPI_HOST,
    },
  };
  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      showMovies(data.result);
    });
}

document.getElementById("btn").addEventListener("click", (e) => {
  e.preventDefault();
  service = document.getElementById("service").value;
  country = document.getElementById("country").value;
  keyword = document.getElementById("keyword").value;
  getMovies();
});
