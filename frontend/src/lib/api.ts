import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Inject restaurantId from persisted store into requests that don't already specify it.
  try {
    const stored = localStorage.getItem('restaurant-storage')
    if (stored) {
      const parsed = JSON.parse(stored)
      const restaurantId = parsed?.state?.selectedRestaurant?.id
      if (restaurantId && !(config.params && 'restaurantId' in config.params)) {
        config.params = { restaurantId, ...config.params }
      }
    }
  } catch {
    // ignore
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default api
