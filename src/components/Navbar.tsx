import React, { ReactNode, useState } from 'react'
import { Box, Button, Close, Flex } from 'theme-ui'

export const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box>
      <Box
        sx={{
          height: '100%',
          width: open ? '300px' : 0,
          position: 'fixed',
          zIndex: '10',
          top: 0,
          left: 0,
          overflowX: 'hidden',
          transition: '0.5s',
          backgroundColor: 'background',
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
          <Flex sx={{ flexDirection: 'column', gap: 3 }}>
            <Button>Home</Button>
            <Button>Blog</Button>
          </Flex>
        </Box>
      </Box>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Open
      </Button>
      {children}
    </Box>
  )
}
