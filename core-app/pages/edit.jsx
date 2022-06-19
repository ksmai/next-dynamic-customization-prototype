import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react';
import useComponents from '../hooks/useComponents';
import useActions from '../hooks/useActions';
import { useMemo, useState } from 'react';
import cookie from 'cookie';
import Link from 'next/link';

const Editor = ({ initialValue, overrideScript }) => {
  const Components = useComponents(overrideScript);

  const actions = useActions();

  const [edited, setEdited] = useState(initialValue);

  const elements = useMemo(() => {
    try {
      return JSON.parse(edited).map((component, i) => {
        const Component = Components[component.type];
        return Component ? <Component data={component.data} actions={actions} key={i} /> : null;
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [edited])

  const onSave = async () => {
    const res = await fetch('/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf8',
      },
      body: JSON.stringify({
        components: JSON.parse(edited),
      }),
    });

    if (res.ok) {
      alert('saved successfully');
    } else {
      alert('failed to save');
    }

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Editor for next-dynamic-customization-prototype</title>
        <meta name="description" content="Editor for next-dynamic-customization-prototype" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Powerful editor for the layout</h1>
        <textarea style={{ width: '100%' }} rows="16" value={edited} onChange={e => setEdited(e.target.value)} />
      </div>

      <button type="button" onClick={onSave}>Save</button>

      <Link href="/">Go back to website</Link>

      <div>
        <h1>Preview here</h1>
        <div>{elements}</div>
      </div>
    </div>
  )
}

export default Editor;

export async function getServerSideProps(context) {
  const components = cookie.parse(context.req.headers.cookie || '').components ?? '[{"type":"Component1","data":{"text":"myText","color":"red"}},{"type":"Component2","data":{"text":"myText 2","color":"blue"}},{"type":"Component3","data":{"text":"myText 3 ggggggg","color":"#18b68c"}},{"type":"ExampleOverride","data":{"text":"override myText 3 ggggggg","color":"#18b68c"}},{"type":"ExampleWithMui","data":{"title":"This is a title","description":"This is a description","count":42,"color":"#18b68c"}}]';

  const filename = context.query.filename;
  let overrideScript = '';
  if (filename) {
    const res = await fetch(`https://ksmai.github.io/next-dynamic-customization-prototype/${filename}`);
    overrideScript = await res.text();
  }

  return {
    props: {
      initialValue: components || '',

      overrideScript,
    },
  };
}