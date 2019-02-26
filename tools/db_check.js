/* global describe */
/* global before */
/* global it */
'use strict'
let $ = require('meeko')
let assert = require('assert')
const Pro = require('../config')
const db = require('j2sql')({
  host: '123.206.80.219',
  port: 3306,
  pool: 1000,
  timeout: 500000,
  user: 'root',
  password: '123456',
  database: 'flow_chart',
  multipleStatements: true,
  connectionLimit: 1000
})

let DB = []
let dbNames = []
let keywords = [
  'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN',
  'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER',
  'COLLATE', 'COLUMN', 'CONDITION', 'CONNECTION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE',
  'CROSS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'FOR',
  'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DECLARE',
  'DEC', 'DECIMAL', 'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT',
  'DISTINCTROW', 'DIV', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'ENCLOSED', 'ESCAPED',
  'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FORCE', 'FOREIGN',
  'FROM', 'FULLTEXT', 'GOTO', 'GRANT', 'GROUP', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND',
  'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'OUT',
  'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL',
  'INTO', 'IS', 'ITERATE', 'JOIN', 'KEY', 'KEYS', 'KILL', 'LABEL', 'LEADING', 'LEAVE', 'LEFT',
  'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LOOP',
  'LONGBLOB', 'LONGTEXT', 'LOW_PRIORITY', 'MATCH', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT',
  'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'OR',
  'NO_WRITE_TO_BINLOG', 'NUMERIC', 'PROCEDURE', 'PURGE', 'RAID0', 'RANGE', 'ZEROFILL', 'LIKE',
  'ON', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'ORDER', 'OUTER', 'OUTFILE', 'PRECISION', 'PRIMARY',
  'READ', 'READS', 'REAL', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE',
  'REQUIRE', 'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE', 'SCHEMA', 'SCHEMAS', 'BIGINT',
  'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'XOR', 'YEAR_MONTH', 'CHECK',
  'SHOW', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING',
  'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'NULL',
  'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY',
  'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION',
  'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME',
  'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WRITE', 'X509'
]

function * waitNotEmpty (o, exArr, txt) {
  if (!o['_mysql']) {
    $.log(txt, '##')
    yield $.tools.wait(1000)
    yield waitNotEmpty(o, exArr, txt)
  }
}

describe('数据库扫描', function () {
  before(function * () {
    yield waitNotEmpty(db, ['db'], 'Wait DB loading...')
    DB = yield db.cmd('show databases').exec()
    for (let i = 0, j = 0, len = DB.length; i < len; i++) {
      if (DB[i].Database === 'information_schema' || DB[i].Database === 'performance_schema' || DB[i].Database === 'mysql' || DB[i].Database === 'sys') {
        continue
      } else {
        dbNames[j] = DB[i].Database
        j++
      }
    }
  })
  describe('检查数据库:库名', function () {
    it('库名是否是Mysql关键字', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let keyword = keywords.indexOf(dbNames[i].toUpperCase(), 0)
        if (keyword !== -1) {
          if (!flag) flag = true
          msg.push('数据库' + dbNames[i] + '库名是Mysql关键字')
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('库名是否以_开头', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        if (dbNames[i].charAt(0) === '_') {
          if (!flag) flag = true
          msg.push('数据库' + dbNames[i] + '库名是以_开头')
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('库名是否以_结尾', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        if (dbNames[i].charAt(dbNames[i].length - 1) === '_') {
          if (!flag) flag = true
          msg.push('数据库' + dbNames[i] + '库名是以_结尾')
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('库名是否含有大写字母', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        if (dbNames[i].match(/[A-Z]+/) !== null) {
          if (!flag) flag = true
          msg.push('数据库' + dbNames[i] + '库名含有大写字母')
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
  })
  describe('检查数据库:表名', function () {
    it('表名是否是Mysql关键字', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let keyword = keywords.indexOf(tableName.toUpperCase(), 0)
          if (keyword !== -1) {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名是Mysql关键字')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名是否以_开头', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.charAt(0) === '_') {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名是以_开头')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名是否以_结尾', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.charAt(tableName.length - 1) === '_') {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名是以_结尾')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名是否以数字开头', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.charAt(0).match(/[0-9]+/) !== null) {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名是以数字开头')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名是否含有大写字母', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.match(/[A-Z]+/) !== null) {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名有大写字母')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名有可能使用了复数', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.charAt(tableName.length - 1) === 's') {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名有可能使用了复数')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('表名两下划线之间只有数字', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          if (tableName.match(/[_][0-9][_]+/) !== null) {
            if (!flag) flag = true
            msg.push('数据库' + dbNames[i] + '->表' + tableName + '表名两下划线之间只有数字')
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
  })
  describe('检查数据库:字段名', function () {
    it('字段名是否是Mysql关键字', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            if (column !== 'id') {
              let keyword = keywords.indexOf(column.toUpperCase(), 0)
              if (keyword !== -1) {
                if (!flag) flag = true
                msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段名' + column + '是Mysql关键字')
              }
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段是否有注释', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            let comment = desc[j].Comment
            if (column !== 'id') {
              if (comment === '') {
                if (!flag) flag = true
                msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '没有注释')
              }
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段名是否以_开头', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            if (column.charAt(0) === '_') {
              if (!flag) flag = true
              msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '以_开头')
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段名是否以_结尾', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            if (column.charAt(column.length - 1) === '_') {
              if (!flag) flag = true
              msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '以_结尾')
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段名是否以数字开头', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            if (column.charAt(0).match(/[0-9]+/) !== null) {
              if (!flag) flag = true
              msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '以数字开头')
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段名是否含有大写字母', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            if (column.match(/[A-Z]+/) !== null) {
              if (!flag) flag = true
              msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '含有大写字母')
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段命名不正确', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            let comment = desc[j].Comment
            if (comment.indexOf('是否') >= 0) {
              if (column.indexOf('is_') !== 0 && column.indexOf('d_') !== 0) {
                if (!flag) flag = true
                msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '命名不正确，字段名应为is_xxx')
              }
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
    it('字段数据类型是否正确', function * () {
      var msg = []
      let flag = false
      for (let i = 0, len = dbNames.length; i < len; i++) {
        let sql = `use ${dbNames[i]};` + 'show tables;'
        let tabNames = yield db.cmd(sql).exec()
        tabNames = tabNames[1]
        for (let k = 0, leng = tabNames.length; k < leng; k++) {
          let tableName = tabNames[k]['Tables_in_' + dbNames[i]]
          let desc = yield db._mysql.query(`use ${dbNames[i]};show full columns from \`${tableName}\`;`)
          desc = desc[1]
          for (let j = 0, length = desc.length; j < length; j++) {
            let column = desc[j].Field
            let comment = desc[j].Comment
            let type = desc[j].Type
            if (comment.indexOf('是否') >= 0) {
              if (type.indexOf('tinyint(') < 0 && type.indexOf('bit(') < 0) {
                if (!flag) flag = true
                msg.push('数据库' + dbNames[i] + '->表' + tableName + '->字段' + column + '数据类型不正确')
              }
            }
          }
        }
      }
      assert.strictEqual(true, !flag, msg.join('\r\n'))
    })
  })
})
describe('结束', function () {
  it('结束', function () {
    setTimeout(() => {
      process.exit(0)
    }, 1500)
  })
})
