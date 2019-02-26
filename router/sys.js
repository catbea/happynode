'use strict'
const fs = require('fs')
const utils = require('../models/utils')

module.exports = function (app) {
  app.get('/sys/mysql', async (ctx, next) => {
    let type = ctx.checkedData.data.type
    let dbName = ctx.checkedData.data.dbName
    let tableName = ctx.checkedData.data.tableName
    let sql = ''
    let table_head = ''
    let sqlTitle = ''
    try {
      switch (type) {
        case 'status':
          // 需要type一个参数显示MySQL服务器状态
          sql = 'use ali_share;show status;'
          table_head = ['变量', '变量中文', '值']
          sqlTitle = 'MySQL服务器状态'
          break
        case 'db':
          sqlTitle = '数据库名称及信息'
          // 需要type一个参数遍历所有的mysql库
          sql = `use ali_share;
            select TABLE_SCHEMA as '库名', concat(truncate(sum(data_length)/1024/1024,2),' MB') as '数据大小',
            concat(truncate(sum(index_length)/1024/1024,2),'MB') as '索引大小' 
            from information_schema.tables group by TABLE_SCHEMA order by sum(data_length) desc;`

          break
        case 'table':
          // 需要type，dbName两个参数显示库中所有表的信息
          sqlTitle = dbName + '数据库的表情况'
          sql = `use ${dbName};select TABLE_NAME as '表名', concat(truncate(data_length/1024/1024,2),' MB') as '数据大小',
          concat(truncate(index_length/1024/1024,2),' MB') as '索引大小',TABLE_ROWS as '行数',TABLE_COMMENT as '表注释'
            from information_schema.tables where TABLE_SCHEMA = '${dbName}'  order by data_length desc;use ali_share;`
          break
        case 'col':
          // 同时需要type，dbName，tableName三个参数查询表中所有字段信息
          sqlTitle = '数据表信息'
          sql = `use ${dbName};
            SELECT column_name as '列名',data_type as '数据类型',character_maximum_length as '变量最大长度',numeric_precision as '数值精度',numeric_scale as '数值刻度',is_nullable as '能否为空',
            CASE  WHEN extra = 'auto_increment' THEN 'YES' ELSE '' END as '是否自增' , column_default as '默认值', column_comment as '注解'
            FROM Information_schema. COLUMNS WHERE  table_schema = '${dbName}' AND table_Name = '${tableName}';use ali_share;`
          break
      }

      let result = await db.cmd(sql).run()

      let fsTemp = fs.readFileSync(__dirname + '/../template/parts/mysql_table_temp.html')
      $.log('sql', sql, fsTemp.toString())
      let colAry = [] // show status;
      let r = []
      var cHash = {
        'Open_files': '打开文件的数目',
        'Aborted_clients': '由于客户端没有正确关闭连接导致客户端终止而中断的连接数',
        'Aborted_connects': ' 试图连接到MySQL服务器而失败的连接数 ',
        'Binlog_cache_disk_use': ' 使用临时二进制日志缓存但超过binlog_cache_size值并使用临时文件来保存事务中的语句的事务数量 ',
        'Binlog_cache_use': '使用临时二进制日志缓存的事务数量',
        'Bytes_received': ' 从所有客户端接收到的字节数。 ',
        'Bytes_sent': '发送给所有客户端的字节数。',
        'com*': '各种数据库操作的数量',
        'Compression': '客户端与服务器之间只否启用压缩协议',
        'Connections': ' 试图连接到(不管是否成功)MySQL服务器的连接数 ',
        'Created_tmp_disk_tables': ' 服务器执行语句时在硬盘上自动创建的临时表的数量 ',
        'Created_tmp_files': 'mysqld已经创建的临时文件的数量',
        'Created_tmp_tables': '服务器执行语句时自动创建的内存中的临时表的数量。如果Created_tmp_disk_tables较大，你可能要增加tmp_table_size值使临时 表基于内存而不基于硬盘',
        'Delayed_errors': '用INSERT DELAYED写的出现错误的行数(可能为duplicate key)。',
        'Delayed_insert_threads': ' 使用的INSERT DELAYED处理器线程数。 ',
        'Delayed_writes': '写入的INSERT DELAYED行数',
        'Flush_commands': '执行的FLUSH语句数。',
        'Handler_commit': ' 内部提交语句数 ',
        'Handler_delete': ' 行从表中删除的次数。 ',
        'Handler_discover': 'MySQL服务器可以问NDB CLUSTER存储引擎是否知道某一名字的表。这被称作发现。Handler_discover说明通过该方法发现的次数。',
        'Handler_prepare': 'A counter for the prepare phase of two-phase commit operations.',
        'Handler_read_first': '索引中第一条被读的次数。如果较高，它建议服务器正执行大量全索引扫描；例如，SELECT col1 FROM foo，假定col1有索引。',
        'Handler_read_key': '根据键读一行的请求数。如果较高，说明查询和表的索引正确。',
        'Handler_read_next': ' 按照键顺序读下一行的请求数。如果你用范围约束或如果执行索引扫描来查询索引列，该值增加。 ',
        'Handler_read_prev': '按照键顺序读前一行的请求数。该读方法主要用于优化ORDER BY ... DESC。',
        'Handler_read_rnd': '根据固定位置读一行的请求数。如果你正执行大量查询并需要对结果进行排序该值较高。你可能使用了大量需要MySQL扫描整个表的查询或你的连接没有正确使用键。',
        'Handler_read_rnd_next': '在数据文件中读下一行的请求数。如果你正进行大量的表扫描，该值较高。通常说明你的表索引不正确或写入的查询没有利用索引。',
        'Handler_rollback': '内部ROLLBACK语句的数量。',
        'Handler_savepoint': '在一个存储引擎放置一个保存点的请求数量',
        'Handler_savepoint_rollback': ' 在一个存储引擎的要求回滚到一个保存点数目。 ',
        'Handler_update': ' 在表内更新一行的请求数。 ',
        'Handler_write': '在表内插入一行的请求数。',
        'Innodb_buffer_pool_pages_data': ' 包含数据的页数(脏或干净)。 ',
        'Innodb_buffer_pool_pages_dirty': '当前的脏页数。',
        'Innodb_buffer_pool_pages_flushed': '要求清空的缓冲池页数',
        'Innodb_buffer_pool_pages_free': '空页数。',
        'Innodb_buffer_pool_pages_latched': ' 在InnoDB缓冲池中锁定的页数。这是当前正读或写或由于其它原因不能清空或删除的页数。 ',
        'Innodb_buffer_pool_pages_misc': '忙的页数，因为它们已经被分配优先用作管理，例如行锁定或适用的哈希索引。该值还可以计算为Innodb_buffer_pool_pages_total - Innodb_buffer_pool_pages_free - Innodb_buffer_pool_pages_data。',
        'Innodb_buffer_pool_pages_total': '缓冲池总大小（页数）。',
        'Innodb_buffer_pool_read_ahead_rnd': ' InnoDB初始化的“随机”read-aheads数。当查询以随机顺序扫描表的一大部分时发生 ',
        'Innodb_buffer_pool_read_ahead_seq': 'InnoDB初始化的顺序read-aheads数。当InnoDB执行顺序全表扫描时发生',
        'Innodb_buffer_pool_read_requests': 'InnoDB已经完成的逻辑读请求数',
        'Innodb_buffer_pool_reads': '不能满足InnoDB必须单页读取的缓冲池中的逻辑读数量',
        'Innodb_buffer_pool_wait_free': '一般情况，通过后台向InnoDB缓冲池写。但是，如果需要读或创建页，并且没有干净的页可用，则它还需要先等待页面清空。该计数器对等待实例进行记数。如果已经适当设置缓冲池大小，该值应小',
        'Innodb_buffer_pool_write_requests': '向InnoDB缓冲池的写数量',
        'Innodb_data_fsyncs': 'fsync()操作数',
        'Innodb_data_pending_fsyncs': '当前挂起的fsync()操作数',
        'Innodb_data_pending_reads': '当前挂起的读数',
        'Innodb_data_pending_writes': '当前挂起的写数',
        'Innodb_data_read': '至此已经读取的数据数量（字节）。',
        'Innodb_data_reads': '数据读总数量',
        'Innodb_data_writes': '数据写总数量',
        'Innodb_data_written': '至此已经写入的数据量（字节）。',
        'Innodb_dblwr_pages_written': '已经执行的双写操作数量',
        'Innodb_dblwr_writes': '双写操作已经写好的页数',
        'Innodb_log_waits': '我们必须等待的时间，因为日志缓冲区太小，我们在继续前必须先等待对它清空',
        'Innodb_log_write_requests': ' 日志写请求数 ',
        'Innodb_log_writes': ' 向日志文件的物理写数量 ',
        'Innodb_os_log_fsyncs': ' 向日志文件完成的fsync()写数量 ',
        'Innodb_os_log_pending_fsyncs': '挂起的日志文件fsync()操作数量',
        'Innodb_os_log_pending_writes': '挂起的日志文件写操作',
        'Innodb_os_log_written': '写入日志文件的字节数',
        'Innodb_page_size': '编译的InnoDB页大小(默认16KB)。许多值用页来记数；页的大小很容易转换为字节',
        'Innodb_pages_created': '创建的页数',
        'Innodb_pages_read': '读取的页数',
        'Innodb_pages_written': '写入的页数',
        'Innodb_row_lock_current_waits': ' 当前等待的待锁定的行数 ',
        'Innodb_row_lock_time': '行锁定花费的总时间，单位毫秒',
        'Innodb_row_lock_time_avg': '行锁定的平均时间，单位毫秒',
        'Innodb_row_lock_time_max': '行锁定的最长时间，单位毫秒',
        'Innodb_row_lock_waits': '一行锁定必须等待的时间数',
        'Innodb_rows_deleted': ' 从InnoDB表删除的行数 ',
        'Innodb_rows_inserted': '插入到InnoDB表的行数',
        'Innodb_rows_read': '从InnoDB表读取的行数',
        'Innodb_rows_updated': 'InnoDB表内更新的行数',
        'Key_blocks_not_flushed': ' 键缓存内已经更改但还没有清空到硬盘上的键的数据块数量 ',
        'Key_blocks_unused': '键缓存内未使用的块数量。你可以使用该值来确定使用了多少键缓存',
        'Key_blocks_used': '键缓存内使用的块数量。该值为高水平线标记，说明已经同时最多使用了多少块',
        'Key_read_requests': '从缓存读键的数据块的请求数',
        'Key_reads': '从硬盘读取键的数据块的次数。如果Key_reads较大，则Key_buffer_size值可能太小。可以用Key_reads/Key_read_requests计算缓存损失率',
        'Key_write_requests': ' 将键的数据块写入缓存的请求数 ',
        'Key_writes': '向硬盘写入将键的数据块的物理写操作的次数',
        'Last_query_cost': '用查询优化器计算的最后编译的查询的总成本。用于对比同一查询的不同查询方案的成本。默认值0表示还没有编译查询。 默认值是0。Last_query_cost具有会话范围',
        'Max_used_connections': '服务器启动后已经同时使用的连接的最大数量',
        'ndb*': 'ndb集群相关',
        'Not_flushed_delayed_rows': '等待写入INSERT DELAY队列的行数',
        'Open_streams': '打开的流的数量(主要用于记录)',
        'Open_table_definitions': '缓存的.frm文件数量',
        'Open_tables': ' 当前打开的表的数量 ',
        'Opened_files': '文件打开的数量。不包括诸如套接字或管道其他类型的文件。 也不包括存储引擎用来做自己的内部功能的文件',
        'Opened_table_definitions': '已经缓存的.frm文件数量',
        'Opened_tables': ' 已经打开的表的数量。如果Opened_tables较大，table_cache 值可能太小 ',
        'Prepared_stmt_count': '当前的预处理语句的数量。 (最大数为系统变量: max_prepared_stmt_count)',
        'Qcache_free_blocks': '查询缓存内自由内存块的数量',
        'Qcache_free_memory': '用于查询缓存的自由内存的数量',
        'Qcache_hits': '查询缓存被访问的次数',
        'Qcache_inserts': '加入到缓存的查询数量',
        'Qcache_lowmem_prunes': '由于内存较少从缓存删除的查询数量',
        'Qcache_not_cached': '非缓存查询数(不可缓存，或由于query_cache_type设定值未缓存)',
        'Qcache_queries_in_cache': '登记到缓存内的查询的数量',
        'Qcache_total_blocks': '查询缓存内的总块数',
        'Queries': '服务器执行的请求个数，包含存储过程中的请求',
        'Questions': '已经发送给服务器的查询的个数',
        'Rpl_status': '失败安全复制状态(还未使用)。',
        'Select_full_join': '没有使用索引的联接的数量。如果该值不为0,你应仔细检查表的索引',
        'Select_full_range_join': '在引用的表中使用范围搜索的联接的数量',
        'Select_range': ' 在第一个表中使用范围的联接的数量。一般情况不是关键问题，即使该值相当大 ',
        'Select_range_check': '在每一行数据后对键值进行检查的不带键值的联接的数量。如果不为0，你应仔细检查表的索引',
        'Select_scan': '对第一个表进行完全扫描的联接的数量',
        'Slave_heartbeat_period': '复制的心跳间隔',
        'Slave_open_temp_tables': '从服务器打开的临时表数量',
        'Slave_received_heartbeats': '从服务器心跳数',
        'Slave_retried_transactions': ' 本次启动以来从服务器复制线程重试次数 ',
        'Slave_running': '如果该服务器是连接到主服务器的从服务器，则该值为ON',
        'Slow_launch_threads': ' 创建时间超过slow_launch_time秒的线程数 ',
        'Slow_queries': ' 查询时间超过long_query_time秒的查询的个数 ',
        'Sort_merge_passes': ' 排序算法已经执行的合并的数量。如果这个变量值较大，应考虑增加sort_buffer_size系统变量的值 ',
        'Sort_range': ' 在范围内执行的排序的数量 ',
        'Sort_rows': ' 已经排序的行数 ',
        'Sort_scan': '通过扫描表完成的排序的数量',
        'ssl＊': ' ssl连接相关 ',
        'Table_locks_immediate': '立即获得的表的锁的次数',
        'Table_locks_waited': '不能立即获得的表的锁的次数。如果该值较高，并且有性能问题，你应首先优化查询，然后拆分表或使用复制',
        'Threads_cached': ' 线程缓存内的线程的数量 ',
        'Threads_connected': '当前打开的连接的数量',
        'Threads_created': '创建用来处理连接的线程数。如果Threads_created较大，你可能要增加thread_cache_size值。缓存访问率的计算方法Threads_created/Connections',
        'Threads_running': '激活的（非睡眠状态）线程数',
        'Uptime': ' 服务器已经运行的时间（以秒为单位）',
        'Uptime_since_flush_status': '最近一次使用FLUSH STATUS 的时间（以秒为单位）'
      }

      if (type === 'status') {
        r = result[1].map(function (item) {
          return {
            'Variable_name': item.Variable_name,
            'Variable_name_cn': cHash[item.Variable_name] || '',
            'Value': item.Value
          }
        })
      } else {
        r = result[1]
      }
      for (var i in r[0]) {
        colAry.push(i)
      }
      let data = {
        table_title: sqlTitle,
        table_id: 't1',
        table_head: table_head || '',
        table_col: colAry,
        table_list: r
      }
      ctx.type = 'text/html;'
      ctx.body = $.tpl(fsTemp.toString()).render(data)
    } catch (e) {
      ctx.throwCode(400, e.toString())
    }
  })
  app.get('/sys/dictreload', async (ctx, next) => { // 读取数据字典文件
    try {
      let file = await fs.readFile(__dirname + '/../models/dict_db.js')
      let cData = JSON.parse(file)
      ctx.ok(cData, null)
    } catch (e) {
      throw (e)
    }
  })
  app.post('/sys/api', async (ctx, next) => { // 获取API
    try {
      let cData = ctx.checkedData.data
      let lev1 = cData.lev.slice(1).split('/')[0]
      ctx.ok(api[lev1][cData.lev], null)
    } catch (e) {
      throw (e)
    }
  })
  app.post('/sys/sendMail', async (ctx, next) => { // 邮箱发送验证码
    try {
      let cData = ctx.checkedData.data
      let r = await user.sendRegVcode(cData)
      if (r === -1) {
        ctx.throwCode(402, '验证码发送频率太高!')
      } else if (r === 0) {
        ctx.throwCode(402, '验证码发送失败!')
      } else if (r === 1) {
        ctx.ok(null, '发送成功')
      } else if (r === true) {
        ctx.throwCode(402, '邮箱已存在')
      }
    } catch (e) {
      throw (e)
    }
  })
  app.post('/sys/sendMobile', async (ctx, next) => { // 手机发送验证码
    try {
      let cData = ctx.checkedData.data
      let r = await user.sendRegVcode(cData)
      if (r === -1) {
        ctx.throwCode(402, '验证码发送频率太高!')
      } else if (r === 0) {
        ctx.throwCode(402, '验证码发送失败!')
      } else if (r === 1) {
        ctx.ok(null, '发送成功')
      } else if (r === true) {
        ctx.throwCode(402, '手机已存在')
      }
    } catch (e) {
      throw (e)
    }
  })
  app.post('/sys/sendForget', async (ctx, next) => { // 忘记密码发送验证码
    try {
      let cData = ctx.checkedData.data
      let r = await user.sendForgetVcode(cData)
      if (r === -1) {
        ctx.throwCode(402, '验证码发送频率太高!')
      } else if (r === 0) {
        ctx.throwCode(402, '验证码发送失败!')
      } else if (r === 1) {
        ctx.ok(null, '发送成功')
      } else if (r === true) {
        ctx.throwCode(402, '手机/邮箱不存在')
      }
    } catch (e) {
      throw (e)
    }
  })
  app.post('/sys/changePwd', async (ctx, next) => { // 修改密码
    try {
      let cData = ctx.checkedData.data
      let r = await user.forgetCheckVcode(cData)
      if (r === 0) {
        ctx.throwCode(402, '验证码验证失败!')
      } else {
        r = await user.changePwd(cData)
        if (r === 1) {
          ctx.ok(null, '密码重设成功')
        } else {
          ctx.throwCode(402, '密码重设失败')
        }
      }
    } catch (e) {
      throw (e)
    }
  })
  app.get('/sys/frontapi', async function (ctx, next) {
    try {
      let cData = ctx.checkedData.data
      ctx.ok(frontApi, null)
    } catch (e) {
      throw (e)
    }
  })
  app.get('/sys/cache', async (ctx, next) => {
    try {
      let cData = ctx.ok(global.cache.len, null)
    } catch (e) {
      throw (e)
    }
  })
  app.get('/sys/monitorParam', async (ctx, next) => {
    try {
      let r = await utils.monitorParam(ctx.checkedData.data)
      if (r.code === 1) {
        let data = []
        for (let key in r.data) {
          let result = r.data[key]

          let headAry = []

          for (var i in result) {
            for (var j in result[i]) {
              if (j !== 'copy' && j !== 'unique') {
                headAry.push(j)
              }
            }
            break
          }

          data[key] = {
            table_title: key,
            table_id: key,
            table_head: headAry,
            table_list: result
          }
        }
        // console.log('sys_param --->', data['sys_param'])

        let fsTemp = fs.readFileSync(__dirname + '/../template/parts/system_table.html')
        ctx.type = 'text/html;'
        ctx.body = $.tpl(fsTemp.toString()).render(data)
      } else {
        ctx.throwCode(400, r.msg)
      }
    } catch (e) {
      throw e
    }
  })
  app.get('/sys/paramReload', async (ctx, next) => {
    try {
      let r = await Account.paramReload(ctx.checkedData.data)
      if (r.code === 1) {
        ctx.ok(r.data)
      } else {
        ctx.throwCode(400, r.msg)
      }
    } catch (e) {
      throw e
    }
  })
  app.get('/sys/gameDataInit', async (ctx, next) => {
    try {
      let r = await utils.gameDataInit(ctx.checkedData.data)
      if (r.code === 1) {
        ctx.ok(r.data)
      } else {
        ctx.throwCode(400, r.msg)
      }
    } catch (e) {
      throw e
    }
  })
}
