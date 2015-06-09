# holonify
Holonify web development - Combining the power of npm, browserify &amp; rework/postcss and more to build small, fully encapsulated client side modules

## Usage
You can specify `"main": "entryfilename.js"` and `"style" : "entryfilename.css"` in `package.json`.

```bash
$> npm install -g holonify

# Run holonify in production mode which minifies "js" and "css" output
$> holonify --mode=production

# Run holonify in development mode:
$> holonify --mode=development
$> holonify

```
`holonify` compiles the project into:
* BUNDLE/bundle.js
* BUNDLE/bundle.css
* BUNDLE/assets/...

You can write `es6` code and set environment variables in a `.env` file, which can be overshadowed by an additional `.env.local` file. (See [envlocalify](https://github.com/serapath/envlocalify))
