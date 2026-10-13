# Weatherify

A small weather lookup app built with HTML, CSS, and JavaScript. It can search weather data by latitude and longitude or use the browser's geolocation permission to detect the current location.

## Setup

Update `config.json` with your RapidAPI credentials:

```json
{
  "RAPIDAPI_KEY": "your_rapidapi_key",
  "RAPIDAPI_HOST": "weatherapi-com.p.rapidapi.com"
}
```

## Run

Run the folder through a local server, then open `f1.html` in the browser.

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/f1.html
```

## Files

- `f1.html` - page structure
- `f2.css` - styling
- `f3.js` - weather API request and DOM updates
- `config.json` - API configuration
