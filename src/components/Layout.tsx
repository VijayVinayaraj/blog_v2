import { ReactNode } from 'react'
import { Box, Flex, Switch, useColorMode } from 'theme-ui'
import { ToggleTheme } from './ToggleTheme'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Flex>
        <ToggleTheme />
      </Flex>
      <Navbar>{children}</Navbar>
    </Box>
  )
}
