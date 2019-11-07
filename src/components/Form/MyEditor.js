import React from 'react';
import Editor from 'draft-js-plugins-editor';
import createUndoPlugin from 'draft-js-undo-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-undo-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-linkify-plugin/lib/plugin.css';


// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const undoPlugin = createUndoPlugin();
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin({
  target: '_blank'  // default is '_self'
});
const { UndoButton, RedoButton } = undoPlugin;

const plugins = [ inlineToolbarPlugin, undoPlugin, imagePlugin, linkifyPlugin];

// The Editor accepts an array of plugins. In this case, only the undoPlugin
// is passed in, although it is possible to pass in multiple plugins.
const MyEditor = ({ editorState, onChange }) => {
  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  React.useEffect(() => {
  
  }, []);
  
  return (
    <div>
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
      />
      <UndoButton />
      <RedoButton />
    </div>
  )
};

export default MyEditor;