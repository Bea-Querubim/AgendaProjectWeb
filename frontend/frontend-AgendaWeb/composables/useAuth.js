export const useAuth = () => {
  const user = useState('user', () => null)

  const login = (dataUser) => {
    user.value = dataUser
    localStorage.setItem('auth_user', JSON.stringify(dataUser)) // persistência
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  // Recupera ao recarregar
  if (import.meta.client && !user.value) {
    const saved = localStorage.getItem('auth_user')
    if (saved) {
      user.value = JSON.parse(saved)
    }
  }

  return { user, login, logout }
}
