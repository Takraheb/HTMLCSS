import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'horizon.favorites.v1'

interface FavoritesValue {
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggle: (id: string) => void
}

const FavoritesContext = createContext<FavoritesValue | null>(null)

function read(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : []
  } catch {
    return []
  }
}

/**
 * Saved homes live in one shared store so the heart on a card, the detail page
 * and the saved list always agree. Persisted per browser; swapping to a
 * server-side collection only changes this file.
 */
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(read())
  }, [])

  const toggle = useCallback(
    (id: string) => {
      setFavorites((current) => {
        const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        } catch {
          /* ignore */
        }
        return next
      })
    },
    [],
  )

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggle }}>{children}</FavoritesContext.Provider>
  )
}

export function useFavorites(): FavoritesValue {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider')
  return context
}
