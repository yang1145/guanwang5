import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: '示例科技有限公司',
  id: 'company-website',
  logo: logoImage,
  seo: {
    title: '示例科技有限公司',
    description:
      '专注企业数字化与高质量交付：官网/业务系统/小程序与可访问性建设，助力品牌增长与业务转化。',
    author: '示例科技',
    image: previewImage, // Can also be a string e.g. '/social-preview-image.png',
  },
  colors: {
    primary: '#d648ff',
    secondary: '#00d1b7',
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      {
        type: 'link',
        label: '首页',
        href: '/',
      },
      {
        type: 'link',
        label: '资讯中心',
        href: '/blog',
      },
      {
        type: 'link',
        label: '案例展示',
        href: '/portfolio',
      },
      {
        type: 'link',
        label: '联系我们',
        href: '/contact',
      },
    ],
  },
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/example',
      icon: 'lucide:github',
    },
    {
      label: '领英',
      href: 'https://www.linkedin.com/company/example',
      icon: 'lucide:linkedin',
    },
    {
      label: '邮件联系',
      href: 'mailto:contact@company.com',
      icon: 'lucide:mail',
    },
  ],
})
