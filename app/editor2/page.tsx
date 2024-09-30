'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'; // Alterado para usar o novo hook
import dynamic from 'next/dynamic';

import { supabase } from '../supabase/supabaseClient';

// Carregando o Monaco Editor dinamicamente
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function Editor2() {
  const router = useRouter();
  const [htmlCode, setHtml] = useState('');
  const [cssCode, setCss] = useState('');
  const [jsCode, setJs] = useState('');

  // useEffect(() => {
  //   const user = supabase.auth.user();
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [router]);

  const handleEditorChange = (value: string, language: string) => {
    if (language === 'html') setHtml(value);
    else if (language === 'css') setCss(value);
    else if (language === 'javascript') setJs(value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.editorContainer}>
        <div style={styles.editor}>
          <h2>Editor HTML (Monaco)</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="html"
            defaultValue={htmlCode}
            onChange={(value) => handleEditorChange(value || '', 'html')}
          />
        </div>
        <div style={styles.editor}>
          <h2>Editor CSS (Monaco)</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="css"
            defaultValue={cssCode}
            onChange={(value) => handleEditorChange(value || '', 'css')}
          />
        </div>
        <div style={styles.editor}>
          <h2>Editor JavaScript (Monaco)</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="javascript"
            defaultValue={jsCode}
            onChange={(value) => handleEditorChange(value || '', 'javascript')}
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