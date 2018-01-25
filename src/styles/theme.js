// src/styles/theme.js
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Colors
export const green        = '#00AA86'
export const yellow       = '#FFDC00'
export const red          = '#D32F2F'
export const darkRed      = '#C1272D'
export const white        = '#ffffff'
export const black        = '#000000'
export const darkGrey     = '#757575'
export const grey         = '#AAAAAA'
export const grey50       = 'rgba(222, 222, 222, 0.5)'
export const grey30       = 'rgba(222, 222, 222, 0.7)'

// Palette
export const palette = {
  primary1Color: grey,
  primary2Color: darkGrey,
  primary3Color: green,
  accent1Color: darkGrey,
  textColor: black,
  alternateTextColor: white,
  canvasColor: white,
  borderColor: grey,
  disabledColor: grey30,
  yellow: yellow
}

export default getMuiTheme({ palette })
