import { ReactNode } from 'react'
import { Box, Flex, Switch, useColorMode } from 'theme-ui'
import { ToggleTheme } from './ToggleTheme'
import { Navbar } from './Navbar'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Navbar>{children}</Navbar>
    </Box>
  )
}
