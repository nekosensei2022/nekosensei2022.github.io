import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope"
import { getDirname, path } from "vuepress/utils"
import { commentPlugin } from '@vuepress/plugin-comment'
const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    plugins: {
      blog: true
    },
    blog: {
      avatar: '/assets/images/avatar.png',
      description: '不怎么厉害的架构师，喜欢新事物，喜欢旅行' 
    },
    navbar: ["/"],
    displayFooter: true,
    /*
    sidebar: {
      "/": [
        {
          text: "首页",
          link: "/",
        },
        { text: "FreeSWITCH", children: ["/freeswitch_event_socket_acl.md"] },
      ],
    },
    */
  },{ custom: true }),

  lang: 'zh-CN',
  title: 'Nekosensei 的宅基地',
  description: 'Nekosensei 的个人博客',
  alias: {
    "@theme-hope/modules/blog/components/BlogHero": path.resolve(
      __dirname,
      "./components/BlogHero.vue",
    ),
  },
  plugins: [
    commentPlugin({
      provider: 'Giscus',
      repo: 'nekosensei2022/nekosensei2022.github.io_comments',
      repoId: 'R_kgDONc7-2w',
      category: 'Announcements',
      categoryId: 'DIC_kwDONc7-284ClMHN'
    }),
  ],
})
