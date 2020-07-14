import App from 'next/app'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import '../styles/global.scss'

const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#2196f3',
    },
    type: 'dark',
  },
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    )
  }
}

const wrapper = createWrapper(() => store)

export default wrapper.withRedux(MyApp)
