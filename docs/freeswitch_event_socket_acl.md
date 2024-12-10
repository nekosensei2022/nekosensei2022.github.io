---
title: FreeSWITCH 命令行客户端非本地访问
lang: zh-CN
tag:
  - FreeSWITCH
category:
  - FreeSWITCH
---
FreeSWITCH 安装后，默认配置下，命令行客户端（fs_cli）只能从本地访问。

如果从其他机器的 fs_cli，是连不上的：

```
[ERROR] fs_cli.c:1699 main() Error Connecting []
```

查看服务端的日志，会发现类似下文的错误：

```
[WARNING] mod_event_socket.c:2674 IP ::ffff:192.168.110.113 Rejected by acl "loopback.auto"
```

解决方法很简单。

首先，定义一条本地局域网的规则。

修改`autoload_configs/acl.conf.xml`文件，这里默认就有个 lan 的规则，稍微修改一下，让本地网内的地址都能访问。

```xml
    <list name="lan" default="deny">
      <node type="allow" cidr="192.168.0.0/16"/>
    </list>
```

然后，再修改引用规则的地方。

修改`autoload_configs/event_socket.conf.xml`文件，将上面的`lan`规则设置进去。

```xml
<configuration name="event_socket.conf" description="Socket Client">
  <settings>
    <param name="nat-map" value="false"/>
    <param name="listen-ip" value="::"/>
    <param name="listen-port" value="8021"/>
    <param name="password" value="ClueCon"/>
    <param name="apply-inbound-acl" value="lan"/>
  </settings>
</configuration>
```

最后，重启服务，应该就可以了。