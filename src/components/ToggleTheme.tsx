import { Flex, IconButton, useColorMode } from 'theme-ui'
import { DayIcon } from './icon/DayIcon'
import { NightIcon } from './icon/NightIcon'

export const ToggleTheme = () => {
  const [mode, setMode] = useColorMode()

  return (
    <Flex sx={{ marginRight: 3 }}>
      <IconButton
        sx={{ width: 5, height: 5 }}
        aria-label="toggle-theme"
        onClick={() => {
          const next = mode === 'dark' ? 'light' : 'dark'
          setMode(next)
        }}
      >
        {mode === 'dark' ? <DayIcon /> : <NightIcon />}
      </IconButton>
    </Flex>
  )
}
