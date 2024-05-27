import { Flex } from 'theme-ui'
import { GithubIcon } from './icon/GithubIcon'
import { LinkedInIcon } from './icon/LinkedInIcon'

export const Footer = () => {
  return (
    <Flex
      sx={{
        width: '100%',
        background: 'secondary',
        gap: 3,
        alignContent: 'center',
        justifyContent: 'center',
        height: '70px',
        marginTop: 'auto',
      }}
    >
      <GithubIcon />
      <LinkedInIcon />
    </Flex>
  )
}
