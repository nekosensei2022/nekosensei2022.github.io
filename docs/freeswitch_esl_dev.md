---
title: FreeSWITCH ESL 开发小结
lang: zh-CN
tag:
  - FreeSWITCH
category:
  - FreeSWITCH
---
最近用 Go 语言开发了一个基于 FreeSWITCH 的小模块。

功能很简单，利用 inbound 模式的 ESL 来实现呼叫接续。这里记录一下一些关键的点，以防忘记。

## 相关 FS 命令

本次开发，主要是用 ESL 来收取事件，获得呼叫的状态，然后通过命令，向 FS 下达指令，从而达到控制呼叫的目的。

用到的命令主要有：

### originate

用于发起 B 侧呼叫。

用法类似这样：

```
originate {origination_caller_id_number=111}sofia/gateway/test/222 &park
```

表示：

* 通过指定的网关（"test"）
* 向被叫（"222"）发起呼叫
* 并且显示指定的主叫号码（"111"）
* 呼叫接通后进入暂停状态（"&park"）

### uuid_ring_back

用于发送 SIP 180 消息。

### uuid_pre_answer

用于发送 SIP 183 消息。

### uuid_answer

用于接通 A 侧呼叫（主叫呼入 FS 的呼叫）。

### uuid_bridge

用于桥接两个呼叫（A 侧和 B 侧）。

### uuid_kill

用于挂断呼叫。之后可以跟 cause，用来指定挂断原因（例如 B 侧拒接时，可以通过 cause 来向 A 侧同样发送拒接）。

```
uuid_kill uuid cause
```

### uuid_record

用于录音。

可以通过设置通道变量来控制录主叫、被叫或立体声。

* 录主叫：对 A 侧设置`RECORD_READ_ONLY`为 true，然后调用录音命令。
* 录被叫：对 B 侧设置`RECORD_READ_ONLY`为 true，然后调用录音命令。
* 录立体声：对 A 或 B 侧设置`RECORD_STEREO`为 true，并确保`RECORD_READ_ONLY`和`RECORD_WRITE_ONLY`为 false，然后调用录音命令。

### uuid_setvar

用于设置通道变量。

## 需要注意的点

### cause 与 status 的映射

在调用`uuid_kill`挂断通道时，其实存在 cause (Q.850) 与 SIP status 的多对多映射问题。

例如：

* B 侧返回 SIP 401（拒接），其对应的 cause 为 21
* 21 与 401 不是一一对应关系，它同时对应 401/402/403/603
* 调用`uuid_kill uuid 21`时，FreeSWITCH 会将它翻译为 603
* A 侧收到 SIP 603消息，虽然也是拒接的语义，但从更严格的角度看，FreeSWITCH 其实并没有将 B 侧的消息忠实地传递给 A 侧。


