import { useThemeUI } from 'theme-ui'

export const ArrowIcon = ({ rotate }: { rotate?: number }) => {
  const { colorMode } = useThemeUI()
  return (
    <svg
      fill={colorMode == 'light' ? '#1c2023' : '#f0f0f0'}
      height="30px"
      width="30px"
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <g id="SVGRepo_iconCarrier">
        <g id="next">
          <g>
            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12 "></polygon>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  )
}
