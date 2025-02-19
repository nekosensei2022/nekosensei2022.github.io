---
title: FreeSWITCH 集成阿里云 MRCP 产品
lang: zh-CN
tag:
  - FreeSWITCH
category:
  - FreeSWITCH
---
## 部署阿里巴巴 MRCP（SDM）

采用 Docker 方式部署。

### 下载镜像

```bash
docker pull registry.cn-shanghai.aliyuncs.com/nls-cloud/sdm:latest
```

### 环境设置

```bash
sudo docker run -d --privileged --net=host --name nls-cloud-sdm -v /data/zhanghf_work/alisdm/volumes/logs:/home/admin/logs -v /data/zhanghf_work/alisdm/volumes/disk:/home/admin/disk registry.cn-shanghai.aliyuncs.com/nls-cloud/sdm:latest standalone
```

### 修改配置文件

配置文件位于`disk/nls-clou-sdm/conf`目录下。

1. `nlstoken.json`

```json
{
    "AccessKeyId": "AccessKey",
    "AccessKeySecret": "AccessKeySecret",
}
```

2. `service-asr.json`

```json
{
    "url": "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",
    "appkey": "创建asr项⽬的时候 获取到的appkey",
}
```

3. `service-tts.json`

```json
{
    "url": "wss://nls-gateway.cn-shanghai.aliyuncs.com/ws/v1",
    "appkey": "创建asr项⽬的时候 获取到的appkey",
}
```

### 启动

```bash
sudo docker stop nls-cloud-sdm
sudo docker start nls-cloud-sdm
```

查看是否成功：

```bash
sudo docker ps
ps -ef | grep alimrcp-server
sudo lsof -i:7010
```

### 测试

```bash
docker exec -it nls-cloud-sdm bash
cd nls-cloudsdm/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:../lib/
./alimrcp-client -a
./alimrcp-client -t
```

* `-a`是测试 ASR，如输出中有`RECOGNITION-COMPLETE`，则表示成功。
* `-t`是测试 TTS，如输出中有`SPEAK-COMPLETE`，则表示成功。

## FreeSWITCH 侧配置

### 安装 mod_unimrcp

参见另文。

### 配置 mod_unimrcp

#### 设置自动装载模块

修改`conf/autoload_configs/modules.conf.xml`，添加：

```xml
<load module="mod_unimrcp"/>
```

#### 配置连接 mrcp 服务端参数

新建`conf/mrcp_profiles/aliyun.xml`：

```xml
<include>
  <profile name="aliyun" version="2">
    <param name="client-ip" value="$${local_ip_v4}"/>
    <param name="client-port" value="5090"/>
    <param name="server-ip" value="192.168.150.140"/>
    <param name="server-port" value="7010"/>
    <param name="resource-location" value=""/>
    <param name="sip-transport" value="tcp"/>
    <param name="sdp-origin" value="Freeswitch"/>
    <param name="rtp-ip" value="$${local_ip_v4}"/>
    <param name="rtp-port-min" value="40000"/>
    <param name="rtp-port-max" value="50000"/>
    <param name="speechsynth" value="speechsynthesizer"/>
    <param name="speechrecog" value="speechrecognizer"/>
    <param name="codecs" value="PCMU PCMA L16/96/8000"/>
  </profile>
</include>
```

::: important

* `client-port`不要设置成`freeswitch`的 sip 端口，否则会出现`RECOGNIZER channel error`的错误

:::

新建`conf/autoload_configs/unimrcp.conf.xml`：


```xml
<configuration name="unimrcp.conf" description="UniMRCP Client">
  <settings>
    <!-- UniMRCP profile to use for TTS -->
    <!-- value对应aliyun-mrcpserver.xml中profile的name -->
    <param name="default-tts-profile" value="aliyun"/>
    <!-- UniMRCP profile to use for ASR -->
    <!-- value对应aliyun-mrcpserver.xml中profile的name -->
    <param name="default-asr-profile" value="aliyun"/>
    <!-- UniMRCP logging level to appear in freeswitch.log.  Options are:
         EMERGENCY|ALERT|CRITICAL|ERROR|WARNING|NOTICE|INFO|DEBUG -->
    <param name="log-level" value="DEBUG"/>
    <!-- Enable events for profile creation, open, and close -->
    <param name="enable-profile-events" value="false"/>

    <param name="max-connection-count" value="100"/>
    <param name="offer-new-connection" value="1"/>
    <param name="request-timeout" value="3000"/>
  </settings>

  <profiles>
    <X-PRE-PROCESS cmd="include" data="../mrcp_profiles/*.xml"/>
  </profiles>
</configuration>
```

新建`grammar/aliyun.gram`：

```jsgf
#JSGF V1.0;
/** JSGF Grammar for example */
grammar example;
public <results> = [];
```

### 配置测试拨打计划

修改`conf/dialplan/default.xml`，添加：

```xml
    <extension name="to_asr">
      <condition field="destination_number" expression="^(7000)$">
        <action application="detect_speech" data="unimrcp:baidu baidu default"/>
        <action application="echo"/>
      </condition>
    </extension>
```

## 测试

1. 用 sip 软电话注册到 FreeSWITCH
1. 拨打`7000`
1. 说一句话
1. 同时查看 FreeSWITCH 的控制台，如果正常的话，会有类似以下的日志输出：

    ```xml
    <?xml version="1.0" encoding="utf-8" ?>
    <result>
        <interpretation grammar="session:default" confidence="100">
            <instance>
                <speech-to-text confidence="100">[4ae6c79f5cd94e6f_2_1]我在十二区;time=3426-5515</speech-to-text>
            </instance>
            <input mode="speech" timestamp-start="2024-12-13 07:36:13" timestamp-end="2024-12-13 07:36:19">我在十二区</input>
        </interpretation>
    </result>
    ```
