import{_ as s,c as e,a,o as h}from"./app-HxN9yrLc.js";const l={};function t(n,i){return h(),e("div",null,i[0]||(i[0]=[a('<h2 id="源码下载" tabindex="-1"><a class="header-anchor" href="#源码下载"><span>源码下载</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> clone</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> ...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="本地开发环境搭建" tabindex="-1"><a class="header-anchor" href="#本地开发环境搭建"><span>本地开发环境搭建</span></a></h2><div class="hint-container note"><p class="hint-container-title">注</p><p>前置要求：安装 node、pnpm</p></div><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="启动本地开发服务" tabindex="-1"><a class="header-anchor" href="#启动本地开发服务"><span>启动本地开发服务</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">pnpm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> docs:dev</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="将变更加入待提交列表" tabindex="-1"><a class="header-anchor" href="#将变更加入待提交列表"><span>将变更加入待提交列表</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> add</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="查看当前待提交的变更" tabindex="-1"><a class="header-anchor" href="#查看当前待提交的变更"><span>查看当前待提交的变更</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> status</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="将文件从待提交列表中移除" tabindex="-1"><a class="header-anchor" href="#将文件从待提交列表中移除"><span>将文件从待提交列表中移除</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> restore</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --staged</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> 文件全名</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="将所有文件从待提交列表中移除" tabindex="-1"><a class="header-anchor" href="#将所有文件从待提交列表中移除"><span>将所有文件从待提交列表中移除</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> reset</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --mixed</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="提交变更" tabindex="-1"><a class="header-anchor" href="#提交变更"><span>提交变更</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> commit</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -m</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;备注信息&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="推送到-github" tabindex="-1"><a class="header-anchor" href="#推送到-github"><span>推送到 github</span></a></h2><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> origin</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> main</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>由于之前已经执行过<code>git push -u origin main</code>，记住了 push 目标，所以也可以简化为：</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">git</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> push</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="附-推送后-github-的处理" tabindex="-1"><a class="header-anchor" href="#附-推送后-github-的处理"><span>附：推送后 Github 的处理</span></a></h2><ol><li>推送到 Github 后，会触发定义的 Github Action（<code>.github/workflows/docs.yaml</code>），调用 pnpm 命令进行构建</li><li>构建的结果（静态页面）会被放入仓库的<code>gh-pages</code>分支，被 Github Pages 承载出来。</li></ol>',23)]))}const r=s(l,[["render",t],["__file","blog_work_process_command.html.vue"]]),k=JSON.parse('{"path":"/blog_work_process_command.html","title":"本博客工作流相关指令","lang":"zh-CN","frontmatter":{"title":"本博客工作流相关指令","lang":"zh-CN","tag":["Blog","Git"],"category":["Blog","Git"]},"headers":[{"level":2,"title":"源码下载","slug":"源码下载","link":"#源码下载","children":[]},{"level":2,"title":"本地开发环境搭建","slug":"本地开发环境搭建","link":"#本地开发环境搭建","children":[]},{"level":2,"title":"启动本地开发服务","slug":"启动本地开发服务","link":"#启动本地开发服务","children":[]},{"level":2,"title":"将变更加入待提交列表","slug":"将变更加入待提交列表","link":"#将变更加入待提交列表","children":[{"level":3,"title":"查看当前待提交的变更","slug":"查看当前待提交的变更","link":"#查看当前待提交的变更","children":[]},{"level":3,"title":"将文件从待提交列表中移除","slug":"将文件从待提交列表中移除","link":"#将文件从待提交列表中移除","children":[]},{"level":3,"title":"将所有文件从待提交列表中移除","slug":"将所有文件从待提交列表中移除","link":"#将所有文件从待提交列表中移除","children":[]}]},{"level":2,"title":"提交变更","slug":"提交变更","link":"#提交变更","children":[]},{"level":2,"title":"推送到 github","slug":"推送到-github","link":"#推送到-github","children":[]},{"level":2,"title":"附：推送后 Github 的处理","slug":"附-推送后-github-的处理","link":"#附-推送后-github-的处理","children":[]}],"git":{"createdTime":1733819279000,"updatedTime":1733819279000,"contributors":[{"name":"Roxxx","username":"Roxxx","email":"roxetter@gmail.com","commits":1,"url":"https://github.com/Roxxx"}]},"readingTime":{"minutes":0.79,"words":237},"filePathRelative":"blog_work_process_command.md","localizedDate":"2024年12月10日","excerpt":"<h2>源码下载</h2>\\n<div class=\\"language-bash line-numbers-mode\\" data-highlighter=\\"shiki\\" data-ext=\\"bash\\" data-title=\\"bash\\" style=\\"--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34\\"><pre class=\\"shiki shiki-themes one-light one-dark-pro vp-code\\"><code><span class=\\"line\\"><span style=\\"--shiki-light:#4078F2;--shiki-dark:#61AFEF\\">git</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> clone</span><span style=\\"--shiki-light:#50A14F;--shiki-dark:#98C379\\"> ...</span></span></code></pre>\\n<div class=\\"line-numbers\\" aria-hidden=\\"true\\" style=\\"counter-reset:line-number 0\\"><div class=\\"line-number\\"></div></div></div>"}');export{r as comp,k as data};