import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import React from 'react';
import useComponents from '../hooks/useComponents';
import useActions from '../hooks/useActions';
import cookie from 'cookie';

const Index = ({ components, overrideScript }) => {
  const Components = useComponents(overrideScript);

  const actions = useActions();

  const elements = components.map((component, i) => {
    const Component = Components[component.type];
    return Component ? <Component data={component.data} actions={actions} key={i} /> : null;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>next-dynamic-customization-prototype</title>
        <meta name="description" content="next-dynamic-customization-prototype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <hr />

      <main>{elements}</main>

      <hr />

      <Link href="/edit">
        <a>Go to edit</a>
      </Link>
    </div>
  )
}

export default Index;

export async function getServerSideProps(context) {
  let components = [];
  try {
    components = JSON.parse(cookie.parse(context.req.headers.cookie || '').components);
  } catch (e) {
    console.error(e);
  }

  const filename = context.query.filename;
  let overrideScript = '';
  if (filename) {
    const res = await fetch(`https://ksmai.github.io/next-dynamic-customization-prototype/${filename}`);
    overrideScript = await res.text();
  }


  return {
    props: {
      components,
      overrideScript,
    },
  };
}