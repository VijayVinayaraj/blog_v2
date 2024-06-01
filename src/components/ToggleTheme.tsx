import { Flex, Label, Switch, useColorMode } from 'theme-ui'

export const ToggleTheme = () => {
  const [mode, setMode] = useColorMode()

  return (
    <Flex sx={{ marginRight: 5 }}>
      <Label htmlFor="toggle-theme-button"></Label>
      <Switch
        id="toggle-theme-button"
        sx={{
          'input:checked ~ &': {
            backgroundColor: 'green',
          },
        }}
        label={mode === 'dark' ? 'light' : 'dark'}
        onClick={() => {
          const next = mode === 'dark' ? 'light' : 'dark'
          setMode(next)
        }}
      />
    </Flex>
  )
}
