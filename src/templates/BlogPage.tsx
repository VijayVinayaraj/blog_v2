import { PageProps } from 'gatsby'
import React from 'react'
import parse, { Element, HTMLReactParserOptions, domToReact, DOMNode } from 'html-react-parser'
import { Box, Flex, Text } from 'theme-ui'
export type BlogPost = {
  id: string
  title: string
  date: Date
  contentHtml: ContentHTML
}
type ContentHTML = string

export default function BlogPage({ pageContext }: PageProps<{}, BlogPost>) {
  console.log('data', pageContext)
  const { title, date, contentHtml } = pageContext
  const dateString = new Date(date).toISOString()

  const options: HTMLReactParserOptions = {
    replace(domNode) {
      const domNodeWithType = domNode as Element

      if (domNodeWithType.name === 'div' && domNodeWithType.attribs.class === 'content') {
        return (
          <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
            {domToReact(domNodeWithType.children as DOMNode[], options)}
          </Flex>
        )
      }

      if (domNodeWithType.name === 'img') {
        return (
          <Box
            as="img"
            sx={{
              maxWidth: '100%',
              height: 'auto',
              margin: '0 auto',
              display: 'block',
            }}
          />
        )
      }

      // Continue parsing other elements normally
      return domNodeWithType
    },
  }

  return (
    <Flex sx={{ justifyContent: 'center', flexWrap: 'wrap', marginX: '100px' }}>
      {parse(contentHtml, options)}
    </Flex>
  )
}
