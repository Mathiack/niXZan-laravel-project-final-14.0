import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

// Cria a instância base
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  withCredentials: true, // Necessário para cookies do Sanctum, se usados
  headers: {
    Accept: 'application/json'
  }
})

// Interceptor para adicionar o token Bearer se estiver logado
api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Interceptor para tratamento genérico de erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const auth = useAuthStore()
      auth.logout()
    }
    return Promise.reject(error)
  }
)

export default api
