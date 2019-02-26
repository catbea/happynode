'use strict'
const Pro = require(`../package.json`)
let collection = require(`../models/api`)
const $ = require('meeko')
let fs = require('fs')
try {
  let swagger = `{`
  swagger += `
   "swagger": "2.0",
   "info": {
         "title": "${Pro.name}_swagger api",
         "description": "api接口描述，测试",
         "version": "${Pro.version}"
      },
      "host": "127.0.0.1:16001",
      "schemes": [
          "http"
      ],
      "basePath": "/",
      "produces": [
          "application/json"
      ],
   "paths": {`
  for (var i in collection) {
    for (var j in collection[i]) {
      let rs = j.split('/')[1]
      swagger += `
    "${j}":{
    "${collection[i][j].method}":{
     "summary":"${collection[i][j].desc}",
     "description":"${collection[i][j].desc}",
     "tags":["${rs}"],
     "parameters":[
     `
      if (collection[i][j].token === true) {
        swagger += `{
      "name":"token",
      "description":"token值",
      "in":"header",
      "required":true,
      "type":"string"
      },`
      }
      for (var k in collection[i][j].param) {
        swagger += `{
      "name":"${k}",
      "description":"${collection[i][j].param[k].desc}",`
        if (collection[i][j].method === 'get') {
          swagger += `
      "in":"query",`
        } else {
          swagger += `
      "in":"formData",`
        }
        swagger += `
      "required":${collection[i][j].param[k].req},
      "type":"${collection[i][j].param[k].type}"
     },`
      }
      /* swagger += `],
         "test":[`
        for (var c in collection[i][j].test) {
         // console.log(c)
         swagger += `{
          "name":"${c}",
          "value":"${collection[i][j].test[c]}"
         },`
        }
        swagger += `], */

      swagger += `],
     "responses":{`
      for (var a in collection[i][j].err_code) {
        swagger += `
      "${a}":{
      "description":"${collection[i][j].err_code[a]}"
     },`
      }
      swagger += `}`
      swagger += `}},`
    }
  }

  swagger += `}}`
  swagger = swagger.replaceAll('"required":undefined,', '"required":false,').replaceAll('},}}},', '}}}},').replaceAll('},]', '}]').replaceAll('}],}]', '}]}]').replaceAll('}]}],}]', '}]}]}]').replaceAll('}]}},},', '}]}}},').replaceAll('}}}},}}', '}}}}}}')
  swagger = swagger.replaceAll('"required":1', '"required":true').replaceAll('"type":"undefined"', '"type":"int"').replaceAll('"type":"int"', '"type":"integer"').replaceAll('"type":"positive"', '"type":"number"').replaceAll('"type":"datetime"', '"type":"string"')
  swagger = swagger.replaceAll('"{"a":1}"', '"{a:1}"').replaceAll('"["a","b"]"', '"[a,b]"').replaceAll('"{k:"loginBtn",v:1}"', '{k:loginBtn,v:1}')
  fs.writeFileSync(`../collection_${Pro.name}.json`, swagger)
} catch (e) {
  console.log(e.stack)
}
