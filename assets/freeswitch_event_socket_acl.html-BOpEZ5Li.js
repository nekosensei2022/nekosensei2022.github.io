import{_ as s,c as a,a as n,o as t}from"./app-DR6COoGg.js";const e={};function l(h,i){return t(),a("div",null,i[0]||(i[0]=[n(`<p>FreeSWITCH 安装后，默认配置下，命令行客户端（fs_cli）只能从本地访问。</p><p>如果从其他机器的 fs_cli，是连不上的：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[ERROR] fs_cli.c:1699 main() Error Connecting []</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看服务端的日志，会发现类似下文的错误：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>[WARNING] mod_event_socket.c:2674 IP ::ffff:192.168.110.113 Rejected by acl &quot;loopback.auto&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>解决方法很简单。</p><p>首先，定义一条本地局域网的规则。</p><p>修改<code>autoload_configs/acl.conf.xml</code>文件，这里默认就有个 lan 的规则，稍微修改一下，让本地网内的地址都能访问。</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">list</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;lan&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;deny&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">node</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;allow&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> cidr</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;192.168.0.0/16&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">list</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，再修改引用规则的地方。</p><p>修改<code>autoload_configs/event_socket.conf.xml</code>文件，将上面的<code>lan</code>规则设置进去。</p><div class="language-xml line-numbers-mode" data-highlighter="shiki" data-ext="xml" data-title="xml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">configuration</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;event_socket.conf&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> description</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Socket Client&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">settings</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;nat-map&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;false&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;listen-ip&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;::&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;listen-port&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;8021&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;password&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;ClueCon&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">param</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;apply-inbound-acl&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;lan&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">/&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">settings</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">configuration</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，重启服务，应该就可以了。</p>`,13)]))}const p=s(e,[["render",l],["__file","freeswitch_event_socket_acl.html.vue"]]),d=JSON.parse('{"path":"/freeswitch_event_socket_acl.html","title":"FreeSWITCH 命令行客户端非本地访问","lang":"zh-CN","frontmatter":{"title":"FreeSWITCH 命令行客户端非本地访问","lang":"zh-CN","tag":["FreeSWITCH"],"category":["FreeSWITCH"]},"headers":[],"git":{"createdTime":1733815630000,"updatedTime":1733816778000,"contributors":[{"name":"zhanghaifeng","username":"zhanghaifeng","email":"zhanghf@witsky.cn","commits":2,"url":"https://github.com/zhanghaifeng"}]},"readingTime":{"minutes":0.81,"words":243},"filePathRelative":"freeswitch_event_socket_acl.md","localizedDate":"2024年12月10日","excerpt":"<p>FreeSWITCH 安装后，默认配置下，命令行客户端（fs_cli）只能从本地访问。</p>\\n<p>如果从其他机器的 fs_cli，是连不上的：</p>\\n<div class=\\"language- line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"\\" data-title=\\"\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span>[ERROR] fs_cli.c:1699 main() Error Connecting []</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>"}');export{p as comp,d as data};
