/**
 * 客户端 API 工具函数
 * 用于在浏览器中与后端 API 进行交互
 */

const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:3001/api'

export interface ApiResponse<T> {
  message: string
  data: T
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface NewsItem {
  id: number
  title: string
  content: string
  author: string
  image_url: string | null
  views: number
  created_at: string
}

export interface Product {
  id: number
  name: string
  description: string
  category: string
  image_url: string | null
  created_at: string
}

export interface Category {
  id: number
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface SiteConfig {
  id: number
  company_name: string
  site_url: string
  icp_number: string
  police_number: string
  copyright_info: string
  company_description: string
  seo_keywords: string
  site_title: string
  friend_links: Array<{
    name: string
    url: string
  }>
  created_at: string
  updated_at: string
}

export interface ContactForm {
  name: string
  email: string
  phone?: string
  message: string
}

/**
 * 通用 API 请求函数
 */
async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API request error for ${url}:`, error)
    throw error
  }
}

/**
 * 获取所有新闻（分页）
 */
export async function getNews(page: number = 1, limit: number = 10): Promise<ApiResponse<NewsItem[]>> {
  return apiRequest<NewsItem[]>(`/news?page=${page}&limit=${limit}`)
}

/**
 * 获取特定新闻详情
 */
export async function getNewsById(id: number): Promise<ApiResponse<NewsItem>> {
  return apiRequest<NewsItem>(`/news/${id}`)
}

/**
 * 获取热门新闻
 */
export async function getPopularNews(): Promise<ApiResponse<NewsItem[]>> {
  return apiRequest<NewsItem[]>('/news/popular')
}

/**
 * 获取所有产品
 */
export async function getProducts(category?: string): Promise<ApiResponse<Product[]>> {
  const query = category ? `?category=${encodeURIComponent(category)}` : ''
  return apiRequest<Product[]>(`/products${query}`)
}

/**
 * 获取特定产品详情
 */
export async function getProductById(id: number): Promise<ApiResponse<Product>> {
  return apiRequest<Product>(`/products/${id}`)
}

/**
 * 获取所有分类
 */
export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return apiRequest<Category[]>('/categories')
}

/**
 * 获取网站配置信息
 */
export async function getSiteConfig(): Promise<ApiResponse<SiteConfig>> {
  return apiRequest<SiteConfig>('/site-config')
}

/**
 * 提交联系表单
 */
export async function submitContactForm(data: ContactForm): Promise<ApiResponse<{ id: number }>> {
  return apiRequest<{ id: number }>('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}
