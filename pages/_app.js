import '../styles/globals.css'

function MyApp({ Component, router, pageProps }) {
  return <Component router={router} {...pageProps} />
}

export default MyApp
