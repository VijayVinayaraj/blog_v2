import { HeadProps, PageProps, graphql } from 'gatsby'
import React from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import c from 'react-syntax-highlighter/dist/esm/languages/prism/c'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import cpp from 'react-syntax-highlighter/dist/esm/languages/prism/cpp'
import parse, {
  Element,
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  attributesToProps,
} from 'html-react-parser'
import { Flex, Link, useThemeUI } from 'theme-ui'
import { Layout } from '../components/Layout'
import { CopyButton } from '../components/CopyButton'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { BlogPost } from '../../gatsby-node'

SyntaxHighlighter.registerLanguage('c', c)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('cpp', cpp)

export default function BlogPage({
  data,
  pageContext,
}: PageProps<Queries.BlogPostQuery, BlogPost>) {
  const { date, contentHtml } = pageContext
  const dateString = new Date(date).toISOString()

  const { colorMode } = useThemeUI()

  const imageDataEdges = data.allFile.edges

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
      if (domNodeWithType.name == 'pre') {
        const preClass = domNodeWithType.attribs.class
        const langRegex = /src src-([a-zA-Z]+)/
        const match = preClass.match(langRegex)
        if (match) {
          const lang = match[1]
          const codeString = domNodeWithType.children.map((child) => child.data || '').join('')

          return (
            <Flex sx={{ flexDirection: 'column' }}>
              <CopyButton text={codeString} />
              <SyntaxHighlighter language={lang} style={colorMode == 'dark' ? oneDark : oneLight}>
                {codeString}
              </SyntaxHighlighter>
            </Flex>
          )
        }
      }
      if (domNodeWithType.name == 'a') {
        const prop = attributesToProps(domNodeWithType.attribs)
        return (
          <Link {...prop} target="_blank">
            {domToReact(domNodeWithType.children as DOMNode[], options)}
          </Link>
        )
      }
      if (domNodeWithType.name === 'img') {
        const src = domNodeWithType.attribs.src
        const alt = domNodeWithType.attribs.alt
        const fileName = src.split('/').pop()
        const imageData = imageDataEdges.find(({ node }) => node.relativePath == fileName)

        if (imageData != null) {
          const image = getImage(imageData?.node.childImageSharp)

          return image && <GatsbyImage image={image} alt={alt} />
        }
      }

      // Continue parsing other elements normally
      return domNodeWithType
    },
  }

  return (
    <Layout>
      <Flex sx={{ justifyContent: 'center', flexWrap: 'wrap', marginX: [2, 7] }}>
        {parse(contentHtml, options)}
      </Flex>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPost($images: [String]) {
    allFile(filter: { relativePath: { in: $images } }) {
      edges {
        node {
          id
          relativePath
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
