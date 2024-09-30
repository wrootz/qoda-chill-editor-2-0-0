'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

// import dynamic from 'next/dynamic';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase/supabaseClient';

import CodeMirror from "@uiw/react-codemirror";
import {CompletionContext} from "@codemirror/autocomplete"
import { autocompletion } from '@codemirror/autocomplete'; // Autocomplete core
import { completionKeymap } from '@codemirror/autocomplete'; // Keyboard shortcuts for autocompletion
import { keymap } from '@codemirror/view'; // To integrate keymaps with the editor

import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';

// https://discuss.codemirror.net/t/how-to-use-codemirror-autocomplete-from-a-react-js-app/2441
// import 'codemirror/addon/hint/show-hint';
// import 'codemirror/addon/hint/javascript-hint';
// import 'codemirror/addon/hint/show-hint.css';
// import 'codemirror/addon/hint/anyword-hint';
// import 'codemirror/addon/edit/closebrackets';
// import 'codemirror/addon/edit/closetag';
// import 'codemirror/addon/fold/foldcode';
// import 'codemirror/addon/fold/foldgutter';
// import 'codemirror/addon/fold/brace-fold';
// import 'codemirror/addon/fold/comment-fold';
// import 'codemirror/addon/fold/foldgutter.css';

// options={{
//     mode: 'javascript',
//     lineWrapping: true,
//     smartIndent: true,
//     lineNumbers: true,
//     foldGutter: true,
//     gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
//     autoCloseTags: true,
//     keyMap: 'sublime',
//     matchBrackets: true,
//     autoCloseBrackets: true,
//     extraKeys: {
//       'Ctrl-Space': 'autocomplete'
//     }
//   }}



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

  const basicExtensions = [autocompletion(), keymap.of(completionKeymap)]; // Adding autocomplete and keymaps

  return (
    <div style={styles.container}>
      <div style={styles.editorContainer}>
        <div style={styles.editor}>
          <h2>Editor HTML</h2>
          <CodeMirror
            value={htmlCode}
            onChange={handleHtmlChange}
            options={{
            //   mode: 'xml',
              mode: 'html',
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
          {/* <CodeMirror
            value={jsCode}
            onChange={handleJsChange}
            options={{
              mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              extensions: [javascript(), autocompletion()],
            }}
          /> */}
          <CodeMirror
            value={jsCode}
            onChange={handleJsChange}
            options={{
                mode: 'javascript',
              theme: 'material',
              lineNumbers: true,
              autocompletion: true,
              extensions: [javascript(), ...basicExtensions], // Enabling JS with autocompletion
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