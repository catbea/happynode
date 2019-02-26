#!/usr/bin/env node

/* global db */
/* global redis */
'use strict'
const $ = global.$ = require('meeko')
const sky = require('./sky')
const modelList = ['mysql', 'redis'] //, 'track'
sky.start(modelList, {}, async function () {
  $.log(modelList, '模块加载完成')
  if (process.env.NODE_ENV) {
  // cnpm install --global windows-build-tools
  } else {
  }
})
