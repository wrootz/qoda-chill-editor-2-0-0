'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase/supabaseClient';

import CodeMirror from "@uiw/react-codemirror";


export default function EditorPage() {
  const router = useRouter();
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');

//   useEffect(() => {
//     const user = supabase.auth.user();
//     if (!user) {
//       router.push('/login');
//     }
//   }, [router]);

  const handleHtmlChange = (value: string) => setHtml(value);
  const handleCssChange = (value: string) => setCss(value);
  const handleJsChange = (value: string) => setJs(value);

  return (
    <div style={styles.container}>
      <div style={styles.editorContainer}>
        <div style={styles.editor}>
          <h2>Editor HTML</h2>
          <CodeMirror value={html} onChange={handleHtmlChange} options={{ mode: 'xml', theme: 'material', lineNumbers: true }} />
        </div>
        <div style={styles.editor}>
          <h2>Editor CSS</h2>
          <CodeMirror value={css} onChange={handleCssChange} options={{ mode: 'css', theme: 'material', lineNumbers: true }} />
        </div>
        <div style={styles.editor}>
          <h2>Editor JavaScript</h2>
          <CodeMirror value={js} onChange={handleJsChange} options={{ mode: 'javascript', theme: 'material', lineNumbers: true }} />
        </div>
      </div>
      <div style={styles.previewContainer}>
        <h2>Preview</h2>
        <iframe
          srcDoc={`<!DOCTYPE html><html><head><style>${css}</style></head><body>${html}<script>${js}<\/script></body></html>`}
          style={styles.preview}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    padding: '10px',
  },
  editorContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginRight: '10px',
  },
  editor: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
  },
  previewContainer: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    backgroundColor: '#fff',
  },
  preview: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
};