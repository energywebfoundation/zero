import { css, Global } from "@emotion/react"

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        body {
          background: #2d1155;
        }
      `}
    />
  )
}

export default GlobalStyles;
