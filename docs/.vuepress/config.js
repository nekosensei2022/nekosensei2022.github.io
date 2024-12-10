import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope"

export default defineUserConfig({
  bundler: viteBundler(),
  theme: hopeTheme({
    plugins: {
      blog: true
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
  }),

  lang: 'zh-CN',
  title: 'Roxxx 宅基地',
  description: 'Roxxx 的个人博客',

})
