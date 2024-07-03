import React from 'react'
import { useSiteMetadata } from '../hooks/UseSiteMetadata'

type SEOProps = {
  title?: string
  description?: string
  children?: React.ReactNode
}
export const Seo = ({ title, description, children }: SEOProps) => {
  const { title: defaultTitle, description: defaultDescription } = useSiteMetadata()

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
  }
  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={defaultTitle} />
      <link rel="icon" href="../images/favicon.png" />
      {children}
    </>
  )
}
