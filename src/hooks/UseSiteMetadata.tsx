import { graphql, useStaticQuery } from 'gatsby'

type useSiteMetadataReturn = {
  title: string
  description: string
}

export const useSiteMetadata = (): useSiteMetadataReturn => {
  const data = useStaticQuery<Queries.siteMetadataQuery>(graphql`
    query siteMetadata {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return {
    title: data.site?.siteMetadata?.title || '',
    description: data.site?.siteMetadata?.description || '',
  }
}
