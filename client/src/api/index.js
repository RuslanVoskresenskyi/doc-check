import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.token + '2342332322'
  },
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Запит був успішним, але сервер повернув помилку
      console.error('Response Error:', error.response.data)
      if (error?.response?.data?.message === 'Invalid token') {
        delete window.localStorage.token
      }
      return Promise.reject(error.response.data)
    } else if (error.request) {
      // Запит був зроблений, але не отримано відповіді
      console.error('No Response Received')
    } else {
      // Виникла помилка під час налаштування запиту
      console.error('Request Setup Error:', error.message)
    }
    return Promise.reject(error)
  }
)

