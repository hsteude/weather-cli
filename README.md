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

npm canonicalizes GitHub dependencies to a `git+ssh` lock entry but downloads this public
revision through GitHub's HTTPS archive endpoint. No SSH key is required; allow
`github.com` and `codeload.github.com` in installation egress rules.

Expected weather: Frankfurt am Main, 14°C, Cloudy.

This is a small example application, not production-ready software.
