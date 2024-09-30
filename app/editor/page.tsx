'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase/supabaseClient';

import CodeMirror from "@uiw/react-codemirror";
import { autocompletion } from '@codemirror/autocomplete';
import {linter, Diagnostic} from "@codemirror/lint"
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';

// const CodeMirror = dynamic(() => import('react-codemirror'), { ssr: false });

export default function EditorPage() {
  const router = useRouter();
  const [htmlCode, setHtml] = useState('');
  const [cssCode, setCss] = useState('');
  const [jsCode, setJs] = useState('');

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
          <CodeMirror
            value={htmlCode}
            onChange={handleHtmlChange}
            options={{
              mode: 'xml',
              theme: 'material',
              lineNumbers: true,
              extensions: [html(), autocompletion()],
            }}
          />
        </div>
        <div style={styles.editor}>
          <h2>Editor CSS</h2>
          <CodeMirror
            value={cssCode}
            onChange={handleCssChange}
            options={{
              mode: 'css',
              theme: 'material',
              lineNumbers: true,
              extensions: [css(), autocompletion()],
            }}
          />
        </div>
        <div style={styles.editor}>
          <h2>Editor JavaScript</h2>
          <CodeMirror
            value={jsCode}
            onChange={handleJsChange}
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              extensions: [javascript(), autocompletion()],
            }}
          />
        </div>
      </div>
      <div style={styles.previewContainer}>
        <h2>Preview</h2>
        <iframe
          srcDoc={`<!DOCTYPE html><html><head><style>${cssCode}</style></head><body>${htmlCode}<script>${jsCode}<\/script></body></html>`}
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