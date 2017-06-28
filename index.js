#!/usr/bin/env node

const http = require('http');
const https = require('https');
const drawInIterm = require('iterm2-image');
const code = process.argv[2];

if (!code) {
  console.log('HTTP code missing. Ex: "httpcat 202"');
  process.exit();
}

if (Object.keys(http.STATUS_CODES).indexOf(code) === -1) {
  console.log(`httpcat: ${code}: No such http code exists`);
  process.exit();
}

https.get(`https://http.cat/${code}`, (res) => {
  if (res.statusCode === 200) {
    drawInIterm(res, function (err) {
      if (err) { throw err; }
      process.exit(0);
    });
  }
});