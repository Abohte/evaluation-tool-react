import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import App from './App'

describe('<App />', () => {
  const app = shallow(<App />)

  it('wraps everything in a muitheme tag', () => {
    expect(app).toHaveTagName('MuiThemeProvider')
  })
})
