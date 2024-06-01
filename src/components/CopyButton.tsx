import { Button, Flex } from 'theme-ui'
import { CopyIcon } from './icon/CopyIcon'
import { useState } from 'react'

export const CopyButton = ({ text }: { text: string }) => {
  const [clicked, setClicked] = useState(false)
  return (
    <Flex
      sx={{
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        top: 5,
      }}
    >
      {clicked && 'Copied'}
      <Button
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigator.clipboard.writeText(text)
          setClicked(true)
          setTimeout(() => {
            setClicked(false)
          }, 1000)
        }}
      >
        {<CopyIcon />}
      </Button>
    </Flex>
  )
}
