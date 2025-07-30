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
        throw new Error(message)
      }
    },

    async register(payload) {
      try {
        const res = await api.post('/register', payload)
        this.token = res.data.token

        api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`

        await this.fetchUser()
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
        this.logout()
      }
    },

    async logout() {
      try {
        await api.post('/logout')
      } catch (error) {
        // mesmo que falhe, limpa os dados localmente
        console.warn('Erro ao tentar logout no servidor. Limpando localmente.')
      } finally {
        this.token = null
        this.user = null
        delete api.defaults.headers.common['Authorization']
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
