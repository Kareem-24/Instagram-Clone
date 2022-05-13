import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider} from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from '../app/store'
function MyApp({ Component, pageProps:{session , ...pageProps} }: any) {
  return(
    <SessionProvider session={session}>
      <Provider store={store}>
 <Component {...pageProps} />
 </Provider>
    </SessionProvider>
  )
}

export default MyApp
