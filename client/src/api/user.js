import { api } from './index'

export const uploadDocxFile = async (file) => {
  try {
    const formData = new FormData()
    formData.append('docxFile', file)

    const response = await api.post('/api/users/test', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    // Тут можна обробити помилки, якщо потрібно
    throw error
  }
}