import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { css } from '@codemirror/lang-css';
import { cpp } from '@codemirror/lang-cpp';
import { rust } from '@codemirror/lang-rust';

const SnippetCodeEditor = ({ code, setCode, len }) => {

    let lenFunction
    switch (len) {
        case 'JS':
            lenFunction = javascript
            break

        case 'C':
            lenFunction = cpp
            break

        case 'PYTHON':
            lenFunction = python
            break
        case 'CSS':
            lenFunction = css
            break
        case 'RUST':
            lenFunction = rust
            break
        default:
            lenFunction = javascript

    }

    return (

        <CodeMirror
            extensions={lenFunction()}
            height='400px'
            value={code}
            onChange={(editor, change) => {
                setCode(editor)
            }}

        />


    )

}
export default SnippetCodeEditor;