import React, { ReactNode, useState } from 'react'
import { Box, Button, Close, Flex } from 'theme-ui'
import { NavCube } from './icon/NavCube'
import { ToggleTheme } from './ToggleTheme'
import { navigate } from 'gatsby'

export const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box>
      <Box
        sx={{
          height: '100%',
          width: open ? '300px' : 0,
          position: 'fixed',
          zIndex: 100,
          top: 0,
          left: 0,
          overflowX: 'hidden',
          transition: '0.5s',
          background: 'background',
        }}
      >
        <Flex sx={{ justifyContent: 'flex-end', p: 3 }}>
          <Close
            onClick={() => {
              setOpen(false)
            }}
          />
        </Flex>
        <Box as="nav">
          <Flex sx={{ flexDirection: 'column', gap: 3, px: 3 }}>
            <Button
              variant="link"
              onClick={() => {
                navigate('/')
              }}
            >
              Home
            </Button>
            <Button
              variant="link"
              onClick={() => {
                navigate('/blog')
              }}
            >
              Blog
            </Button>
          </Flex>
        </Box>
      </Box>
      <Flex
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          zIndex: 10,
          width: '100%',
        }}
      >
        <Button
          sx={{ mx: 4, marginTop: 3, backgroundColor: 'background' }}
          onClick={() => {
            setOpen(true)
          }}
        >
          <NavCube />
        </Button>
        <ToggleTheme />
      </Flex>
      {children}
    </Box>
  )
}
