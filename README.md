# Weather CLI

A small terminal client for Super Useful Weather API. Requires Node.js 22+, npm and Git.

```bash
git clone https://github.com/hsteude/weather-cli
cd weather-cli
npm install
npm start
```

The environment should provide `SUPER_USEFUL_BASE_URL`. Set `SUPER_USEFUL_API_KEY` if
authentication is not provided externally. Internal service addresses are the defaults.
See `.env.example` for configuration (export variables in your shell; files are not auto-loaded).
For repeatable installs use `npm ci`. Run tests with `npm test`.

Expected weather: Frankfurt am Main, 14°C, Cloudy.

Educational software, not production-ready. See [SECURITY_DEMO.md](SECURITY_DEMO.md).
