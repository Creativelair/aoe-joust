import Head from 'next/head'
import Container from '@material-ui/core/Container';
import Footer from './footer'
import styles from './layout.module.scss'

export default function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fondamento&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <main className={styles.content}>
        <Container>
          {children}
        </Container>
      </main>
      <Footer />
    </div>
  )
}
