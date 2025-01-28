import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ReactNode } from "react"

interface ThemeProviderProps {
  children: ReactNode
  attribute: "class" | "data-theme" // Update the type to match expected values
  defaultTheme: string
  enableSystem: boolean
  disableTransitionOnChange: boolean
}

export function ThemeProvider({
  children,
  attribute,
  defaultTheme,
  enableSystem,
  disableTransitionOnChange,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  )
}
