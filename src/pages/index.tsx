import * as React from 'react'
import { graphql, type HeadFC, type PageProps } from 'gatsby'
import { Navbar } from '../components/Navbar'

const App: React.FC<PageProps> = () => {
  return (
    <div sx={{ backgroundColor: 'primary' }}>
      <Navbar></Navbar>
    </div>
  )
}
export default App
