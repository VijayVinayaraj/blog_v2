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
  description: string
  keywords: string
  imageFilenames: string[]
  contentHtml: string
  prev: { id: string; title: string }
  next: { id: string; title: string }
}

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
  const dateString = $('p.date').text()
  const description = $('meta[name="description"]').attr('content')
  const keywords = $('meta[name="keywords"]').attr('content')
  const dateRegex = /\d{4}-\d{2}-\d{2}/

  const imageFilenames = $('img')
    .map(function () {
      return $(this).attr('src')?.split('/').pop()
    })
    .get()

  $('img').each(function () {
    $(this).parent('p').contents().unwrap()
  })
  $('p.date').remove()
  const extractedDate = dateString?.trim().match(dateRegex)
  let date = new Date()
  if (extractedDate && extractedDate[0]) {
    date = new Date(extractedDate[0])
  }
  return {
    title,
    date,
    description,
    keywords,
    imageFilenames: imageFilenames,
    contentHtml: DOMPurify.sanitize($.html(), { USE_PROFILES: { html: true } }),
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
  const { createPage } = actions
  const posts = getSortedPostsData()

  posts.forEach((post, index) => {
    createPage({
      path: `/blog/${post.id}`,
      component: path.resolve(`./src/templates/BlogPage.tsx`),
      context: {
        id: post.id,
        title: post.title,
        date: post.date.toISOString(),
        description: post.description,
        keywords: post.keywords,
        images: post.imageFilenames,
        contentHtml: post.contentHtml,
        prev: index == 0 ? null : { id: posts[index - 1].id, title: posts[index - 1].title },
        next:
          index == posts.length - 1
            ? null
            : { id: posts[index + 1].id, title: posts[index + 1].title },
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

  type ContextLink {
  id:String
  title:String
  }
  
    type Context {
      id: String!
      title: String!
      date: Date!
      description:String
  keywords:String
  images:[String]
  contentHtml: String!
  prev:ContextLink 
  next: ContextLink
    }
  `)
}
