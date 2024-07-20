import { navigate } from 'gatsby'
import { Button, Flex, Text } from 'theme-ui'
import React from 'react'
import { ArrowIcon } from './icon/Arrow'

type NavigationButtonsProps = {
  next: Queries.ContextLink | null
  prev: Queries.ContextLink | null
}

export const NavigationButtons = ({ next, prev }: NavigationButtonsProps) => {
  return (
    <Flex sx={{ justifyContent: 'space-between', marginTop: 3 }}>
      {prev ? (
        <Button
          onClick={() => {
            navigate(`/blog/${prev.id}`)
          }}
        >
          <Flex sx={{ justifyContent: 'center', gap: 2 }}>
            <ArrowIcon rotate={180} />
            <Text as="h3">{prev.title}</Text>
          </Flex>
        </Button>
      ) : (
        <div style={{ width: 'auto' }} />
      )}
      {next ? (
        <Button
          onClick={() => {
            navigate(`/blog/${next.id}`)
          }}
        >
          <Flex sx={{ justifyContent: 'center', gap: 2 }}>
            <Text as="h3">{next.title}</Text>
            <ArrowIcon />
          </Flex>
        </Button>
      ) : (
        <div style={{ width: 'auto' }} />
      )}
    </Flex>
  )
}
