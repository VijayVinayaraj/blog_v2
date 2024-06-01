import { Flex, Link } from 'theme-ui'
import { GithubIcon } from './icon/GithubIcon'
import { LinkedInIcon } from './icon/LinkedInIcon'

export const Footer = () => {
  return (
    <Flex
      sx={{
        width: '100%',
        background: 'secondary',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',
        marginTop: 'auto',
      }}
    >
      <Link href="https://github.com/VijayVinayaraj" target="_blank">
        <GithubIcon />
      </Link>
      <Link href="https://www.linkedin.com/in/vijayvinayaraj/" target="_blankButton">
        <LinkedInIcon />
      </Link>
    </Flex>
  )
}
