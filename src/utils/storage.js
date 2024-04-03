const INFO_KEY = 'he_chao_user'
const SEARCH_KEY = 'hechao_search'

export const GetUserId = () => {
  const def = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : def
}

export const SetUser = (UserMes) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(UserMes))
}

export const rmUser = () => {
  localStorage.removeItem(INFO_KEY)
}

export const GetSearchHistory = () => {
  const res = localStorage.getItem(SEARCH_KEY)
  return res ? JSON.parse(res) : []
}

export const SetSearchHistory = (arr) => {
  localStorage.setItem(SEARCH_KEY, JSON.stringify(arr))
}
