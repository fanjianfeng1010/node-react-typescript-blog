import axios from './index'

// 添加新的文章
export const createArticle = (data: any) => axios.post('/api/articles', data)

// 修改文章内容
export const updateArticleById = (id: string, data: any) => axios.put(`/api/articles/${id}`, data)

// 删除指定文章
export const deleteArticleById = (id: string) => axios.delete(`/api/article/${id}`)

// 批量删除文章
export const batchDeleteArticle = (articleIds: string[]) => {
  return axios.delete('/api/articles', {
    data: { articleIds }
  })
}

// 获取所有文章
export const getArticles = (page: number, limit: number, category?: string, tag?: string) =>
  axios.get('/api/articles', {
    params: {
      page,
      limit,
      category,
      tag
    }
  })

// 获取单篇文章
export const getArticle = (id: string, md = true) =>
  axios.get(`/api/article/${id}`, {
    params: {
      md
    }
  })

// 获取所有分类
export const getCategories = () => {
  return axios.get('/api/categories')
}

// 新增 文章分类
export const createCategory = (name: string) => {
  return axios.post('/api/category', {
    name
  })
}

// 获得最近三篇文章
export const getRencent = () => {
  return axios.get('/api/rencent')
}
