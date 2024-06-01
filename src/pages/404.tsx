import * as React from 'react'
import { Link, HeadFC, PageProps, navigate } from 'gatsby'
import { Container, Heading, Text, Button } from 'theme-ui'
const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: 'background',
        color: 'text',
        padding: 4,
      }}
    >
      <Heading as="h1" sx={{ fontSize: 7, marginBottom: 3 }}>
        404
      </Heading>
      <Text as="p" sx={{ fontSize: 4, marginBottom: 3 }}>
        Oops! The page you're looking for doesn't exist.
      </Text>
      <Text as="p" sx={{ fontSize: 2, marginBottom: 4 }}>
        It looks like the page you were trying to reach is not available. This might be because the
        page does not exist, or it has been moved.
      </Text>
      <Button
        onClick={() => {
          navigate('/')
        }}
        variant="link"
      >
        Go Home
      </Button>
    </Container>
  )
}

export default NotFoundPage
