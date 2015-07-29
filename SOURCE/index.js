#!/usr/bin/env node
'use strict';
/******************************************************************************
  DEPENDENCIES = CUSTOM SDK [Custom Software Development Kit]
******************************************************************************/
const os          = require('os');
const path        = require('path');
const method      = require('exemethod')(function(a,b){return b;});
const atomify     = require('atomify');
const corsproxy   = require('cors-anywhere');
/******************************************************************************
  ENVIRONMENT - use: envlocalify
******************************************************************************/
var pkg         = require(path.join(process.cwd(), 'package.json'));
var mode        = ((mode = {
  production      : 'production',
  prod            : 'production',
  development     : 'development',
  dev             : 'development'
}[process.env.NODE_ENV]) ? mode : 'development');
var env         = {
  server          : {
    production      : null,
    development     : {
      open            : true,
      path            : 'index.html',
      lr              : {
        verbose         : true,
        quiet           : false,
        port            : 31337,
        sync            : false
      }
    }
  }[mode],
  js              : {
    production      : {
      "entry"         : pkg.main || 'index.js',
      "alias"         : "BUNDLE/bundle.js",
      "output"        : "BUNDLE/bundle.js",
      "debug"         : false,
      "watch"         : false,
      "transform": [
        "babelify",
        "envlocalify"
      ],
      "standalone": "API"
    },
    development     : {
      "entry"         : pkg.main || 'index.js',
      "alias"         : "BUNDLE/bundle.js",
      "output"        : "BUNDLE/bundle.js",
      "debug"         : true,
      "watch"         : true,
      "fullPaths"     : true,
      "transform": [
        "babelify",
        "envlocalify"
      ],
      "standalone": "API"
    }
  }[mode],
  css             : {
    production      : {
      "entry"         : pkg.style || '',
      "alias"         : pkg.style ? "BUNDLE/bundle.css" : '',
      "output"        : pkg.style ? "BUNDLE/bundle.css" : '',
      "debug"         : false,
      "watch"         : false,
      "autoprefixer": {
        "browsers": [
          "> 1%",
          "IE 7"
        ],
        "cascade": false
      },
      "compress": true,
      "plugin": []
    },
    development     : {
      "entry"         : pkg.style || '',
      "alias"         : pkg.style ? "BUNDLE/bundle.css" : '',
      "output"        : pkg.style ? "BUNDLE/bundle.css" : '',
      "debug"         : true,
      "watch"         : true,
      "autoprefixer": {
        "browsers": [
          "> 1%",
          "IE 7"
        ],
        "cascade": true
      },
      "compress": false,
      "plugin": []
    }
  }[mode],
  assets          : {
    production      :{
      "dest"          : "BUNDLE/assets/",
      "prefix"        : "/BUNDLE/assets/",
      "retainName"    : false
    },
    development     : {
      "dest"          : "BUNDLE/assets/",
      "prefix"        : "/BUNDLE/assets/",
      "retainName"    : true
    }
  }[mode]
};
/******************************************************************************
  MODULE INTERNALS & HELPERS
******************************************************************************/
// console.log(process.env.MODE);
// console.log(mode);
function cb (err, src, type) {
  // console.log('=========');
  // console.log(type);
  // console.log('=========');
  if (type === 'js') {
    // do something with JS source bundle
  } else {
    // do something with CSS source bundle
  }
}
corsproxy.createServer({
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(9966, '0.0.0.0', function() {
  console.log('======================================================');
  console.log('Running CORS (REVERSE) PROXY on http://localhost:9966/');
  console.log('======================================================');
});
atomify(env, cb);
// /******************************************************************************
//   PIPE STREAM
//     see
//     http://stackoverflow.com/questions/9231847/node-js-how-to-detect-an-empty-stdin-stream
//     http://stackoverflow.com/questions/16349706/how-to-pipe-node-js-scripts-together-using-the-unix-pipe-on-the-command-line
// ******************************************************************************/
// function startStream () {
//   process.stdin.setEncoding('utf8');
//   process.stdin.on('data', function(data) {
//     return {
//       "--parse"     : function (string) {
//         var result = parse(string);
//         // stringify parsed object
//         // process.stderr.write('asdf')
//         process.stdout.write(JSON.stringify(result, null, 2));
//       },
//       "--serialize" : function (string) {
//         var result = serialize(JSON.parse(string));
//         process.stdout.write(result);
//       }
//     }[$mode](data);
//   });
// }
// /******************************************************************************
//   UNIX SIGNALS
// ******************************************************************************/
// function startDeamon () {
//   // ps aux | grep yourscript
//   // kill -s SIGINT [process_id]
//   process.stdin.resume();
//   process.on('SIGINT', function (err) {
//     // An easy way to send the SIGINT signal is with Control-C in most terminal programs.
//     // Note:
//     //   SIGUSR1 is reserved by node.js to start the debugger. It's possible to install a listener but that won't stop the debugger from starting.
//     //   SIGTERM and SIGINT have default handlers on non-Windows platforms that resets the terminal mode before exiting with code 128 + signal number. If one of these signals has a listener installed, its default behaviour will be removed (node will no longer exit).
//     //   SIGPIPE is ignored by default, it can have a listener installed.
//     //   SIGHUP is generated on Windows when the console window is closed, and on other platforms under various similar conditions, see signal(7). It can have a listener installed, however node will be unconditionally terminated by Windows about 10 seconds later. On non-Windows platforms, the default behaviour of SIGHUP is to terminate node, but once a listener has been installed its default behaviour will be removed.
//     //   SIGTERM is not supported on Windows, it can be listened on.
//     //   SIGINT from the terminal is supported on all platforms, and can usually be generated with CTRL+C (though this may be configurable). It is not generated when terminal raw mode is enabled.
//     //   SIGBREAK is delivered on Windows when CTRL+BREAK is pressed, on non-Windows platforms it can be listened on, but there is no way to send or generate it.
//     //   SIGWINCH is delivered when the console has been resized. On Windows, this will only happen on write to the console when the cursor is being moved, or when a readable tty is used in raw mode.
//     //   SIGKILL cannot have a listener installed, it will unconditionally terminate node on all platforms.
//     //   SIGSTOP cannot have a listener installed.
//     //   Note that Windows does not support sending Signals, but node offers some emulation with process.kill(), and child_process.kill(): - Sending signal 0 can be used to search for the existence of a process - Sending SIGINT, SIGTERM, and SIGKILL cause the unconditional exit of the target process.
//     console.log('Got a SIGINT. Goodbye cruel world.');
//     if (err) {
//       process.exit(1);
//     } else {
//       process.exit(0);
//     }
//   });
// }
