'uss strict'

// const stringRandom = require('string-random')

module.exports = function (router) {
  router.get('/works/index', async (ctx, next) => {
    try {
      const uid = ctx.checkedToken.id

      let { page, page_size: pageSize, need_total_num: needTotalNum } = ctx.checkedData.data

      // 不合法的值都改成合法
      page = page > 0 ? page : 1
      pageSize = pageSize > 0 ? pageSize : 15

      const limit = ` LIMIT ${(page - 1) * pageSize},${pageSize}`

      const where = `where d_flag=0 and uid='${uid}'`
      const sql = `select sid, title, description, ver, width, height, c_time, m_time from user_works ${where} order by c_time desc ${limit};`

      const result = await db.cmd(sql).run()

      // 查出来的数量为0也要返回 200
      if (result) {
        const data = {
          page,
          page_size: pageSize,
          total: result.length,
          list: result
        }

        // 查询作品总数
        if (needTotalNum) {
          const total = await db.cmd(
            `SELECT count(1) FROM user_works ${where}`
          ).run()

          if (total && total[0]) {
            data.total = total[0]['count(1)']
          }
        }

        ctx.ok(data, 'success')
      } else {
        ctx.throwCode(-1, '查询失败')
      }
    } catch (e) {
      throw e
    }
  })
  router.get('/works/show', async (ctx, next) => {
    try {
      const { sid, ver } = ctx.checkedData.data
      const sql = `select * from user_works where d_flag=0 and sid='${sid}' and ver>='${ver}' limit 1;`
      const result = (await db.cmd(sql).run()) || -1
      if (result === -1 || result.length === 0) {
        ctx.throwCode(-1, '操作失败')
      } else {
        ctx.ok(result[0], 'success')
      }
    } catch (e) {
      throw e
    }
  })
  router.get('/works/checkVer', async (ctx, next) => {
    try {
      const { sid } = ctx.checkedData.data
      const sql = `select ver from user_works where d_flag=0 and sid='${sid}' limit 1;`
      const result = (await db.cmd(sql).run()) || -1
      if (result === 0 || result.length === 0) {
        ctx.throwCode(-1, '操作失败')
      } else {
        ctx.ok(result[0], 'success')
      }
    } catch (e) {
      throw e
    }
  })
  router.post('/works/create', async (ctx, next) => {
    try {
      const uid = ctx.checkedToken.id
      const sid = $.tools.uuid(12, 62)
      const {
        content,
        title,
        description,
        width,
        height
      } = ctx.checkedData.data
      let t = new Date().date2Str()
      let sql = `insert into user_works (uid, sid, content, title, description, width, height, c_time, m_time) 
        values('${uid}', '${sid}', '${content}', '${title}', '${description}', '${width}', '${height}', '${t}', '${t}');`
      let result = (await db.cmd(sql).run()) || -1
      if (result === -1) {
        ctx.throwCode(-1, '操作失败')
      } else {
        const sql = `select * from user_works where d_flag=0 and id='${result.insertId}' limit 1;`
        let obj = (await db.cmd(sql).run()) || -1
        ctx.ok(obj[0], 'success')
      }
    } catch (e) {
      throw e
    }
  })

  router.post('/works/update', async (ctx, next) => {
    try {
      const uid = ctx.checkedToken.id || 1
      let cData = ctx.checkedData.data
      let { sid } = cData
      delete cData.sid
      let t = new Date().date2Str()
      let sql = 'update user_works set '
      for (let key in cData) {
        if (key !== undefined) {
          sql += `\`${key}\`='${cData[key]}', `
        }
      }
      sql += `m_time='${t}', ver=\`ver\`+1 where uid='${uid}' and d_flag='0' and sid='${sid}';`
      let result = (await db.cmd(sql).run()) || -1
      if (result === -1 || result.affectedRows === 0) {
        ctx.throwCode(-1, '操作失败')
      } else {
        ctx.ok({}, 'success')
      }
    } catch (e) {
      throw e
    }
  })

  router.post('/works/delete', async (ctx, next) => {
    try {
      const uid = ctx.checkedToken.id
      const { sid } = ctx.checkedData.data
      let t = new Date().date2Str()
      let sql = `update user_works set d_flag='1', m_time='${t}' where uid='${uid}' and d_flag='0' and sid='${sid}';`
      let result = (await db.cmd(sql).run()) || -1
      if (result === -1 || result.affectedRows === 0) {
        ctx.throwCode(-1, '操作失败')
      } else {
        ctx.ok({}, 'success')
      }
    } catch (e) {
      throw e
    }
  })
}
