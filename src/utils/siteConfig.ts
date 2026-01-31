/**
 * 网站配置工具
 * 用于在构建时获取和缓存网站配置信息
 */

import { getSiteConfig } from './api'
import type { SiteConfig } from './api'

let cachedConfig: SiteConfig | null = null

/**
 * 获取网站配置（带缓存）
 */
export async function fetchSiteConfig(): Promise<SiteConfig | null> {
  if (cachedConfig) {
    return cachedConfig
  }

  try {
    const response = await getSiteConfig()
    cachedConfig = response.data
    return cachedConfig
  } catch (error) {
    console.error('Failed to fetch site config:', error)
    // 返回默认配置
    return {
      id: 1,
      company_name: '示例科技有限公司',
      site_url: 'https://www.example.com',
      icp_number: '京ICP备12345678号',
      police_number: '京公网安备12345678901234号',
      copyright_info: '版权所有 © 2023 示例科技有限公司',
      company_description: '专注企业数字化与高质量交付，助力品牌增长与业务转化。',
      seo_keywords: '企业官网,数字化,品牌建设,可访问性',
      site_title: '示例科技有限公司',
      friend_links: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
}

/**
 * 清除配置缓存（用于开发调试）
 */
export function clearConfigCache() {
  cachedConfig = null
}
