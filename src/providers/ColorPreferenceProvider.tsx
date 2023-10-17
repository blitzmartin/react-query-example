import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'

export type ColorScheme = 'light' | 'dark'
export type ColorPreferenceContextType = {
  colorScheme: ColorScheme
  setColorScheme: (colorScheme: ColorScheme) => void
}

const ColorPreferenceContext = createContext<ColorPreferenceContextType | null>(
  null
)

export const ColorPreferenceProvider = ({
  children
}: {
  children: ReactNode
}) => {
  // Initialize colorScheme from localStorage or use the default value 'light'
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    (() => {
      const storedColorScheme = localStorage.getItem('colorScheme')
      return (storedColorScheme as ColorScheme) || 'light'
    })()
  )

  // Update colorScheme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('colorScheme', colorScheme)
    const htmlElement = document.documentElement
    if (colorScheme === 'dark') {
      htmlElement.classList.add('dark')
      htmlElement.style.setProperty('color-scheme', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      htmlElement.style.removeProperty('color-scheme')
    }
  }, [colorScheme])

  return (
    <ColorPreferenceContext.Provider
      value={{
        colorScheme,
        setColorScheme
      }}
    >
      {children}
    </ColorPreferenceContext.Provider>
  )
}

export const useColorPreference = (): ColorPreferenceContextType => {
  const context = useContext(ColorPreferenceContext)
  if (!context) {
    throw new Error(
      'useColorPreference must be used within a ColorPreferenceProvider'
    )
  }
  return context
}
