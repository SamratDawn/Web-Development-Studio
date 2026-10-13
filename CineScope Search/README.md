# Movie Search

A small movie availability search app built with HTML, CSS, and JavaScript. It searches streaming availability by service, country, and keyword.

## Setup

Update `config.json` with your RapidAPI credentials:

```json
{
  "RAPIDAPI_KEY": "your_rapidapi_key",
  "RAPIDAPI_HOST": "streaming-availability.p.rapidapi.com"
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
- `f3.js` - movie API request and DOM updates
- `config.json` - API configuration
