import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    async login(credentials) {
      try {
        const res = await api.post('/login', credentials)
        this.token = res.data.token

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        await this.fetchUser()
      } catch (error) {
        const message = error.response?.data?.message || 'Erro ao fazer login.'
        throw new Error(message) // importante para catch do componente
      }
    },

    async register(payload, router) {
      try {
        const res = await api.post('/register', payload)
        this.token = res.data.token

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        await this.fetchUser()

        if (router) {
          router.push('/') // Redireciona para a home após registrar
        }
      } catch (error) {
        const message = error.response?.data?.message || 'Erro ao registrar.'
        throw new Error(message)
      }
    },

    async fetchUser() {
      try {
        const res = await api.get('/user/me')
        this.user = res.data
      } catch (error) {
        console.error('Erro ao buscar usuário:', error)
        await this.logout() // Garante que estado inconsistente seja limpo
      }
    },

    async logout(router) {
      try {
        await api.post('/logout')
      } catch (error) {
        console.warn('Erro ao tentar logout no servidor. Limpando localmente.')
      } finally {
        this.token = null
        this.user = null
        delete api.defaults.headers.common['Authorization']

        if (router) {
          router.push('/login')
        }
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['token', 'user'],
      },
    ],
  },
})
