import { createContext, useState, useEffect, type ReactNode } from 'react';

type AuthContextType = {
  user: string | null
  jwt: string | null
  message: string
  login: (username: string, password: string) => Promise<unknown>
  logout: () => void
  setMessage: (msg: string) => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: ReactNode
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null)
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem('jwt') || null)
  const [message, setMessage] = useState<string>('Please log in')

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt')
    if (storedJwt) {
      setJwt(storedJwt)
      fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${storedJwt}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setUser(data.username)
            setMessage(`Welcome back ${data.username}!`)
          } else {
            localStorage.removeItem('jwt')
            setJwt(null)
            setUser(null)
            setMessage(data.message)
          }
        })
        .catch(() => {
          localStorage.removeItem('jwt')
          setJwt(null)
          setUser(null)
          setMessage('Please log in or register')
        });
    } else {
      setJwt(null)
      setUser(null)
      setMessage('Please log in or register')
    }
  }, [])

  const login = async (username: string, password: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    const data = await response.json()
    if (response.ok) {
      setJwt(data.token)
      localStorage.setItem('jwt', data.token)
      setUser(data.username)
      setMessage(`Login successful: welcome ${data.username}`)
    } else {
      setMessage(`Login failed: ${data.detail}`)
      setUser(null)
      setJwt(null)
      localStorage.removeItem('jwt')
    }
    return data
  }

  const logout = () => {
    setUser(null)
    setJwt(null)
    localStorage.removeItem('jwt')
    setMessage('Logout successful')
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        login,
        logout,
        message,
        setMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
