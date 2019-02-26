DROP TABLE IF EXISTS `users`;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(32) NOT NULL DEFAULT '' COMMENT 'stringID,字符串型id，全表唯一',
  `nickname` varchar(255) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `d_flag` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除，1已删除',
  `c_time` datetime NOT NULL COMMENT '创建时间',
  `m_time` datetime NOT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_uindex` (`id`),
  UNIQUE KEY `user_sid_uindex` (`sid`),
  KEY `user_d_flag_index` (`d_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户信息表';

DROP TABLE IF EXISTS `user_login_pwd`;
CREATE TABLE `user_login_pwd` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '本登录方式所属用户id',
  `type` tinyint(2) unsigned NOT NULL DEFAULT '0' COMMENT '登录类型：0账号密码，1微信openid，2微信unionid，3手机号密码/短信验证',
  `account` varchar(32) NOT NULL DEFAULT '' COMMENT '账号（如果是openid，存到pwd去）',
  `pwd` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  `d_flag` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，1删除',
  `c_time` datetime NOT NULL COMMENT '创建时间',
  `m_time` datetime NOT NULL COMMENT '最新更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_pwd_id_uindex` (`id`),
  UNIQUE KEY `login_pwd_account_index` (`account`),
  UNIQUE KEY `user_login_pwd_d_flag_type_account_uindex` (`d_flag`,`type`,`account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户的登录方式';

DROP TABLE IF EXISTS `user_works`;
CREATE TABLE `user_works` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sid` varchar(32) NOT NULL DEFAULT '' COMMENT 'stringID，字符串id，全表唯一',
  `uid` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '作品所属用户',
  `title` varchar(255) NOT NULL DEFAULT '' COMMENT '作品标题',
  `description` varchar(255) NOT NULL DEFAULT '' COMMENT '作品描述',
  `ver` int(11) unsigned NOT NULL DEFAULT '1' COMMENT '作品版本号，仅记录当前版本号，不能回退到原来的版本',
  `width` int default '0' not null comment '画布宽，单位前端自己定义',
	`height` int default '0' not null comment '画布高，单位前端自己定义',
  `content` json DEFAULT NULL COMMENT '作品的json数据内容',
  `d_flag` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '逻辑删除，1删除',
  `c_time` datetime NOT NULL COMMENT '创建时间',
  `m_time` datetime NOT NULL COMMENT '最后更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_works_id_uindex` (`id`),
  UNIQUE KEY `user_works_sid_uindex` (`sid`),
  UNIQUE KEY `user_works_d_flag_sid_uindex` (`d_flag`,`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户的作品';

create index user_works_uid_index
	on user_works (uid)
;