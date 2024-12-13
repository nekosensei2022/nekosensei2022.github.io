---
title: FreeSWITCH 集成百度 MRCP 产品
lang: zh-CN
tag:
  - FreeSWITCH
category:
  - FreeSWITCH
---
## 部署百度 MRCP

参考[此文档](https://ai.baidu.com/ai-doc/SPEECH/Ukarty6aa)所述之步骤。

1. 注册百度开发者账号，创建应用

    应用管理控制台的地址：
<https://console.bce.baidu.com/ai/#/ai/speech/app/list>

1. 下载 MRCP 服务端

    <https://ai.baidu.com/download?sdkId=111>

1. 修改服务端配置文件

    1. `/mrcp-server/conf/unimrcpserver.xml`
        
        修改`unimrcpserver->properties->ip`为本机 IP 地址。

    1. `mrcp-server/conf/mrcp-asr.conf`

        修改`AUTH_APPID`和`AUTH_APPKEY`为开发者`AppID`和`API Key`。

    1. `mrcp-server/conf/unimrcpserver_control.conf`

        修改`./bin/check 127.0.0.1 1544`中的`127.0.0.1`为本机 IP 地址。

1. 设置 gcc 环境

    ```bash
    sudo ./bootstrap.sh
    ```

1. 测试运行

    ```bash
    cd mrcp-server
    ./bin/unimrcpserver -r . &
    ```

1. 客户端验证

    1. 将必要库放入`LD_LIBRARY_PATH`环境变量

        ```bash
        export LD_LIBRARY_PATH=${SERVER_ROOT}/mrcp-server/lib:$LD_LIBRARY_PATH
        ```

        其中`${SERVER_ROOT}`替换为真实路径。

    1. 进入客户端交互环境

        ```
        cd bin
        ./asrclient
        ```

    1. 输入指令
    
        ```
        run grammar.xml xeq.pcm
        ```

        可以看到客户端与服务端的交互过程，如果成功，则会输出类似这样的识别结果：

        ```xml
        <speech-to-text confidence="100">[17daae42b8f34bac_2_1]我要去西二旗我要去西二旗</speech-to-text>
        ```

1. 启动守护进程

    如果上述操作成功，则可以将 MRCP 启动为守护进程。

    ```bash
    cd mrcp-server
    ./bin/unimrcpserver_control start
    ```

至此，部署百度 MRCP 服务完成。

## FreeSWITCH 侧配置

### 安装 mod_unimrcp

#### 安装 apr

```bash
wget https://www.unimrcp.org/project/component-view/unimrcp-deps-1-6-0-tar-gz/download -O unimrcp-deps-1.6.0.tar.gz
tar xvzf unimrcp-deps-1.6.0.tar.gz
cd unimrcp-deps-1.6.0
cd libs/apr
./configure --prefix=/usr/local/apr
make
sudo make install
```

#### 安装 apr-util

```bash
cd ../apr-util
./configure --prefix=/usr/local/apr --with-iconv=/usr/local --with-apr=/usr/local/apr
make
sudo make install
```

::: important

* 如果不加`--with-apr=/usr/local/apr`，则可能会出现找不到 APR 的错误
* 需要先安装`libiconv`
* 如果不加`--with-iconv`指定`libiconv`的位置，虽然可以安装成功，但可能在后续安装`unimrcp`时会报`undefined reference to 'libiconv'`的错误

:::

#### 安装 unimrcp

* 实际不会使用，但有一些库会在安装`mod_unimrcp`时用到

```bash
git clone https://github.com/unispeech/unimrcp.git
cd unimrcp
./bootstrap
./configure
make
sudo make install
```

::: important

* 如果报`undefined reference to 'libiconv'`的错误，则看上一节

:::

#### 安装 mod_unimrcp

```bash
git clone https://github.com/freeswitch/mod_unimrcp.git
cd mod_unimrcp
export PKG_CONFIG_PATH=/usr/local/freeswitch/lib/pkgconfig:/usr/local/unimrcp/lib/pkgconfig
./bootstrap.sh
./configure
make
sudo make install
```

::: important

* 确保在启动`freeswitch`时`/usr/local/lib`是在装载库路径中，否则会由于找不到`libiconv`而无法装载`mod_unimrcp`模块

    必要时修改`/etc/systemd/system/freeswitch.service`，在`[Service]`下添加以下行：
    ```
    Environment="LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH"
    ```
:::

### 配置 mod_unimrcp

#### 设置自动装载模块

修改`conf/autoload_configs/modules.conf.xml`，添加：

```xml
<load module="mod_unimrcp"/>
```

#### 配置连接 mrcp 服务端参数

新建`conf/mrcp_profiles/baidu.xml`：

```xml
<include>
  <profile name="baidu" version="2">
    <param name="client-ip" value="$${local_ip_v4}"/>
    <param name="client-port" value="5090"/>
    <param name="server-ip" value="192.168.150.240"/>
    <param name="server-port" value="5060"/>
    <param name="resource-location" value=""/>
    <param name="sip-transport" value="udp"/>
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
    <param name="default-tts-profile" value="baidu"/>
    <!-- UniMRCP profile to use for ASR -->
    <!-- value对应aliyun-mrcpserver.xml中profile的name -->
    <param name="default-asr-profile" value="baidu"/>
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

新建`grammar/baidu.gram`：

```xml
<?xml version="1.0"?>
<grammar xmlns="http://www.w3.org/2001/06/grammar" xml:lang="en-US" version="1.0" mode="con
tinuous" root="digit">
  <rule id="digit">
    <one-of>
      <item>one</item>
      <item>two</item>
      <item>three</item>
    </one-of>
  </rule>
</grammar>
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
