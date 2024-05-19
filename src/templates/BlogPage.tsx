import { PageProps } from 'gatsby'
import React from 'react'
import parse from 'html-react-parser'
import { Text } from 'theme-ui'
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
  return (
    <div>
      <Text>{title}</Text>
      <Text>{dateString}</Text>
      {parse(contentHtml)}
    </div>
  )
}
