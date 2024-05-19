import { GatsbyNode } from 'gatsby'
const path = require('path')
const fs = require('fs')
import DOMPurify from 'isomorphic-dompurify'
import * as cheerio from 'cheerio'

const postsDirectory = path.join(process.cwd(), 'content')
export type BlogPost = {
  id: string
  title: string
  date: Date
  contentHtml: ContentHTML
}
type ContentHTML = JSX.Element | string | JSX.Element[]

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData: BlogPost[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.html$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const blogData = extractBlogData(fileContents)
    return {
      id,
      ...blogData,
    }
  })
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

function extractBlogData(fileContent: string) {
  const sanitizedHtml = DOMPurify.sanitize(fileContent, { USE_PROFILES: { html: true } })
  const $ = cheerio.load(sanitizedHtml)
  const title = $('.title').text()
  const dateString = $('.date').text()

  const dateRegex = /\d{4}-\d{2}-\d{2}/
  const extractedDate = dateString?.trim().match(dateRegex)
  let date = new Date()
  if (extractedDate && extractedDate[0]) {
    date = new Date(extractedDate[0])
  }
  return {
    title,
    date,
    contentHtml: sanitizedHtml,
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
  const { createPage } = actions
  const posts = getSortedPostsData()

  posts.forEach((post) => {
    createPage({
      path: `/blog/${post.id}`,
      component: path.resolve(`./src/templates/BlogPage.tsx`),
      context: {
        id: post.id,
        title: post.title,
        date: post.date.toISOString(),
        contentHtml: post.contentHtml,
      },
    })
  })
}

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type SitePage implements Node {
      context: Context
    }
    type Context {
      id: String
      title: String
      date: Date
      contentHtml: String
    }
  `)
}
