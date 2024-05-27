import { Switch, useColorMode } from 'theme-ui'

export const ToggleTheme = () => {
  const [mode, setMode] = useColorMode()
  return (
    <Switch
      label={mode}
      onClick={() => {
        const next = mode === 'dark' ? 'light' : 'dark'
        setMode(next)
      }}
    />
  )
}
