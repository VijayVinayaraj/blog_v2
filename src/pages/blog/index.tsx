import { Link, PageProps, graphql, navigate } from 'gatsby'
import { Layout } from '../../components/Layout'
import { Flex } from 'theme-ui'
import { ArticleBox } from '../../components/ArticleBox'

const Blog = ({ data }: PageProps<Queries.BlogPageQuery>) => {
  const blogs = data.allSitePage.edges
  return (
    <Layout>
      <Flex
        sx={{
          flexDirection: 'column',
          marginX: 'auto',
          gap: 4,
          maxWidth: '500px',
          marginY: 6,
        }}
      >
        {blogs.map(({ node }) => {
          return (
            <ArticleBox
              key={node.id}
              onClick={() => {
                navigate(node.path)
              }}
              title={node.context?.title || ''}
              date={node.context?.date || ''}
              description={node.context?.description || ''}
            />
          )
        })}
      </Flex>
    </Layout>
  )
}

export const query = graphql`
  query BlogPage {
    allSitePage(sort: { context: { date: DESC } }, filter: { context: { id: { ne: null } } }) {
      edges {
        node {
          id
          path
          context {
            id
            title
            date
            description
          }
        }
      }
    }
  }
`

export default Blog
