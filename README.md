# holonify
Holonify web development - Combining the power of npm, browserify &amp; rework/postcss and more to build small, fully encapsulated client side modules

## Usage
You can specify `"main": "entryfilename.js"` and `"style" : "entryfilename.css"` in `package.json`.

```bash
$> npm install -g holonify

# Run holonify in production mode which minifies "js" and "css" output
$> NODE_ENV=production holonify

# Run holonify in development mode:
$> NODE_ENV=development holonify
$> holonify

```
`holonify` compiles the project into:
* BUNDLE/bundle.js
* BUNDLE/bundle.css
* BUNDLE/assets/...

You can write `es6` code and set environment variables in a `.env` file, which can be overshadowed by an additional `.env.local` file. (See [envlocalify](https://github.com/serapath/envlocalify))

## CORS
If you want to not be bothered by restrictions, you can prefix your ajax
requests with `http://localhost:9966/`, e.g. `http://localhost:9966/google.de`.
holonify runs a proxy server, that rewrites http headers so that you get rid
of annoying CORS related errors in the browser console.
