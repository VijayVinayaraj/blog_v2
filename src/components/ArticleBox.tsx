import { Flex, Text } from 'theme-ui'

type ArticleBoxProps = {
  title: string
  description: string
  date: string
}
export const ArticleBox = ({ title, description, date }: ArticleBoxProps) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
        border: '1px solid',
        p: 3,
        maxHeight: '200px',
      }}
    >
      <Text as="h4" sx={{ fontWeight: 'blod' }}>
        {date}
      </Text>
      <Text as="h2" sx={{ fontWeight: '900' }}>
        {title}
      </Text>
      <Text as="h3" sx={{ fontWeight: '900' }}>
        {description}
      </Text>
    </Flex>
  )
}
