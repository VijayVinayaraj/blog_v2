import * as React from 'react'
import { graphql, type HeadFC, type PageProps } from 'gatsby'
import { Layout } from '../components/Layout'
import { Flex, Text } from 'theme-ui'
import { ArticleBox } from '../components/ArticleBox'
import { Footer } from '../components/Footer'

const App = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const articles = data.allSitePage.edges
  return (
    <Layout>
      <Flex
        sx={{
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Text as="h2">Hi, I'm Vijay Vinayaraj</Text>
        <Text as="h3">Web Developer by Day/</Text>
        <Text as="h3"> Embedded Firmware Engineer by Night</Text>
        <Text>I'm passionate about developing technologies. Fasinated about C. </Text>
      </Flex>

      <Flex
        sx={{
          flexDirection: 'column',
          marginX: 'auto',
          gap: 4,
          maxWidth: '500px',
          marginBottom: 5,
        }}
      >
        {articles.map(({ node }) => {
          return (
            <ArticleBox
              title={node.context?.title || ''}
              date={node.context?.date || ''}
              description={node.context?.description || ''}
            />
          )
        })}
      </Flex>
      <Footer />
    </Layout>
  )
}
export default App

export const query = graphql`
  query IndexPage {
    allSitePage(
      limit: 5
      sort: { context: { date: DESC } }
      filter: { context: { id: { ne: null } } }
    ) {
      edges {
        node {
          id
          context {
            id
            title
            date
            description
            keywords
          }
        }
      }
    }
  }
`
