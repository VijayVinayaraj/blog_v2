import { Flex, Text } from 'theme-ui'

type ArticleBoxProps = {
  title: string
  description: string
  date: string
  onClick: () => void
}
export const ArticleBox = ({ title, description, date, onClick }: ArticleBoxProps) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        flexDirection: 'column',
        gap: 2,
        alignItems: 'flex-start',
        border: '1px solid',
        p: 3,
        maxHeight: '200px',
        cursor: 'pointer',
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
