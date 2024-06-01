import React, { ReactNode, useState } from 'react'
import { Box, Button, Close, Divider, Flex, Text } from 'theme-ui'
import { NavCube } from './icon/NavCube'
import { ToggleTheme } from './ToggleTheme'
import { graphql, navigate, useStaticQuery } from 'gatsby'

export const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false)
  const data = useStaticQuery<Queries.NavBarQuery>(graphql`
    query NavBar {
      allSitePage(
        limit: 5
        sort: { context: { date: DESC } }
        filter: { context: { id: { ne: null } } }
      ) {
        edges {
          node {
            context {
              id
              title
            }
            path
          }
        }
      }
    }
  `)

  const articles = data.allSitePage.edges
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
          overflowY: 'hidden',
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
          <Flex sx={{ flexDirection: 'column', gap: 2, px: 3 }}>
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
            <Divider />

            {articles.map(({ node }) => (
              <Button
                key={node.context?.id}
                variant="link"
                onClick={() => {
                  navigate(node.path)
                }}
              >
                <Text
                  sx={{
                    fontSize: 1,
                    zIndex: 10,
                    visibility: open ? 'visible' : 'hidden',
                    transitionDelay: open ? '0.5s' : '0s',
                    transitionProperty: 'visibility',
                  }}
                >
                  {node.context?.title}
                </Text>
              </Button>
            ))}
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
          sx={{ mx: 4, marginTop: 3 }}
          onClick={() => {
            setOpen(true)
          }}
        >
          <NavCube />
        </Button>
        <ToggleTheme />
      </Flex>
      <Box sx={{ marginTop: 5 }}>{children}</Box>
    </Box>
  )
}
