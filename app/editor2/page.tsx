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
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark'); // Estado para o tema // Estado para o tema
  const [fontSize, setFontSize] = useState(14); // Estado para o tamanho da fonte

  // useEffect(() => {
  //   const user = supabase.auth.user();
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, [router]);

const handleEditorChange = (value: string | undefined, language: string) => {
    if (language === 'html') setHtml(value || '');
    else if (language === 'css') setCss(value || '');
    else if (language === 'javascript') setJs(value || '');
  };
  
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value as 'vs-dark' | 'vs-light');
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 2); // Aumentar fonte
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => (prevSize > 10 ? prevSize - 2 : prevSize)); // Diminuir fonte, sem ficar muito pequeno
  };

  return (
    <div style={styles.container}>

      {/* Controles */}
      <div style={styles.buttonsContainer}>
        <label htmlFor="theme-select">Selecione o Tema: </label>
        <select id="theme-select" onChange={handleThemeChange} value={theme}>
          <option value="vs-dark">VS Dark</option>
          <option value="vs-light">VS Light)</option>
        </select>

        <button onClick={increaseFontSize}>Aumentar Fonte</button>
        <button onClick={decreaseFontSize}>Diminuir Fonte</button>
      </div>


      <div style={styles.editorContainer}>
        <div style={styles.editor}>
          <h2>HTML</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="html"
            defaultValue={htmlCode}
            onChange={(value) => handleEditorChange(value || '', 'html')}
            theme={theme} // Tema escuro
            options={{
              minimap: { enabled: false }, // Desabilitando o minimapa
              fontSize: fontSize, // Tamanho da fonte dinâmico
            }}
          />
        </div>
        <div style={styles.editor}>
          <h2>CSS</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="css"
            defaultValue={cssCode}
            onChange={(value) => handleEditorChange(value || '', 'css')}
            theme={theme} // Tema escuro
            options={{
              minimap: { enabled: false }, // Desabilitando o minimapa
              fontSize: fontSize, // Tamanho da fonte dinâmico
            }}
          />
        </div>
        <div style={styles.editor}>
          <h2>JS</h2>
          <MonacoEditor
            height="200px"
            defaultLanguage="javascript"
            defaultValue={jsCode}
            onChange={(value) => handleEditorChange(value || '', 'javascript')}
            theme={theme} // Tema escuro
            options={{
              minimap: { enabled: false }, // Desabilitando o minimapa
              fontSize: fontSize, // Tamanho da fonte dinâmico
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
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
  },
  buttonsContainer: {
    marginBottom: '10px',
    display: 'flex',
    gap: '10px',
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    gap: '10px',
    marginTop: '10px',
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