import Head from 'next/head'
import Link from 'next/link'
import { gql } from '@apollo/client';

import { getApolloClient } from 'lib/apollo-client';

import styles from '../styles/Home.module.css'

export default function Complete({ page }) {
  const { title } = page;
  const { fullHead } = page.seo;
  console.log(fullHead);

  return (
    <div className={styles.container}>
      <Head>
          <title>{title}</title>
          {fullHead}
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = getApolloClient();

  const data = await apolloClient.query({
    query: gql`
      {
        pageBy(uri: "index.php/complete") {
          title
          seo {
            fullHead
          }
        }
      }
    `,
  });

  const page = {
    ...data?.data.pageBy
  }

  return {
    props: {
      page
    }
  }
}
