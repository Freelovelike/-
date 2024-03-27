-- 创建名为 `ev_role` 的表
drop table if exists `ev_role`;
create table `ev_role` (
    -- 角色ID，整数类型，不允许为空，自动增长
    `roleId` int not null auto_increment,
    -- 角色名称，最大长度为255的可变字符，允许为空，默认为NULL
    `roleName` varchar(255) character set utf8 collate utf8_general_ci null default null,
    -- 主键约束，使用B-tree索引，保证roleId的唯一性
    primary key (`roleId`) using btree
)
-- 表使用InnoDB存储引擎，自增长起始值为20，字符集为utf8，校对规则为utf8_general_ci，行格式为dynamic
engine = innodb auto_increment = 20 character set = utf8 collate = utf8_general_ci row_format = dynamic;

-- 创建名为 `ev_users` 的表
drop table if exists `ev_users`;
create table `ev_users` (
    -- 用户ID，整数类型，不允许为空，自动增长
    `id` int not null auto_increment,
    -- 用户名，最大长度为255的可变字符，不允许为空
    `username` varchar(255) character set utf8 collate utf8_general_ci not null,
    -- 密码，最大长度为255的可变字符，不允许为空
    `password` varchar(255) character set utf8 collate utf8_general_ci not null,
    -- 姓名，最大长度为255的可变字符，允许为空，默认为NULL
    `name` varchar(255) character set utf8 collate utf8_general_ci null default null,
    -- 电话号码，最大长度为255的可变字符，允许为空，默认为NULL
    `phone` varchar(255) character set utf8 collate utf8_general_ci null default null,
    -- 用户图片，文本类型，允许为空
    `userPic` text character set utf8 collate utf8_general_ci null,
    -- 角色ID，整数类型，不允许为空，添加了注释说明
    `roleId` int not null comment '1是系统管理员、2是普通管理员',
    -- 主键约束，使用B-tree索引，保证id的唯一性
    primary key (`id`) using btree,
    -- 唯一索引，保证id的唯一性
    unique index `id`(`id` asc) using btree,
    -- 唯一索引，保证username的唯一性
    unique index `username`(`username` asc) using btree
)
-- 表使用InnoDB存储引擎，自增长起始值为12，字符集为utf8，校对规则为utf8_general_ci，行格式为dynamic
engine = innodb auto_increment = 12 character set = utf8 collate = utf8_general_ci row_format = dynamic;




drop table if exists `ev_roomtype`;
create table `ev_roomtype`  (
  `roomtypeid` int not null auto_increment comment '房型编号',
  `roomtypename` varchar(255) character set utf8 collate utf8_general_ci null default null comment '房型名称',
  `roomtypeprice` int null default null comment '房型价格',
  `bednum` int null default null comment '床位数',
  `typedescription` varchar(255) character set utf8 collate utf8_general_ci null default null comment '房型简介',
  `typetotalmoney` int null default null comment '房型销售总额',
  primary key (`roomtypeid`) using btree
) engine = innodb auto_increment = 24 character set = utf8 collate = utf8_general_ci row_format = dynamic;


drop table if exists `ev_room`;
create table `ev_room`  (
  `roomid` int not null auto_increment comment '房间ID',
  `roomstateid` int null default null comment '房间状态',
  `roomtypeid` int null default null comment '房间类型',
  `description` varchar(255) character set utf8 collate utf8_general_ci null default null comment '简介',
  `guestid` int null default null comment '顾客id',
  primary key (`roomid`) using btree
) engine = innodb auto_increment = 19 character set = utf8 collate = utf8_general_ci row_format = dynamic;
