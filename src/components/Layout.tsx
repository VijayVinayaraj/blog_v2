import { ReactNode } from 'react'
import { Box } from 'theme-ui'
import { Navbar } from './Navbar'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box sx={{ marginBottom: 5 }}>
      <Navbar>{children}</Navbar>
    </Box>
  )
}
