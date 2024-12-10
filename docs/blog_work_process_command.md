---
title: 本博客工作流相关指令
lang: zh-CN
tag:
  - Blog
  - Git
category:
  - Blog
  - Git
---

## 源码下载

```bash
git clone ...
```

## 本地开发环境搭建

::: note
前置要求：安装 node、pnpm
:::

```bash
pnpm install
```

## 启动本地开发服务

```bash
pnpm docs:dev
```

## 将变更加入待提交列表

```bash
git add .
```

### 查看当前待提交的变更

```bash
git status
```

### 将文件从待提交列表中移除

```bash
git restore --staged 文件全名
```
### 将所有文件从待提交列表中移除

```bash
git reset --mixed
```

## 提交变更

```bash
git commit -m "备注信息"
```

## 推送到 github

```bash
git push origin main
```

由于之前已经执行过`git push -u origin main`，记住了 push 目标，所以也可以简化为：

```bash
git push
```

## 附：推送后 Github 的处理

1. 推送到 Github 后，会触发定义的 Github Action（`.github/workflows/docs.yaml`），调用 pnpm 命令进行构建
2. 构建的结果（静态页面）会被放入仓库的`gh-pages`分支，被 Github Pages 承载出来。
