<template>
    <editor-content :editor="editor" />
  </template>
  
  <script>
  import { Editor, EditorContent } from '@tiptap/vue-2'
import Collaboration from '@tiptap/extension-collaboration'
  import StarterKit from '@tiptap/starter-kit'
  import { TiptapCollabProvider } from "@hocuspocus/provider";

import { HocuspocusProvider } from '@hocuspocus/provider'
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'

  export default {
    components: {
      EditorContent,
    },
  
    data() {
      return {
        editor: null,
      }
    },
  
    mounted() {
      const provider = new TiptapCollabProvider({
         appId: "xm411nm2",           
          name: "test1",
          token: ""
        });
  // const ydoc = new Y.Doc()
  //       const provider = new WebrtcProvider('example-document', ydoc)

      this.editor = new Editor({
        content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
        extensions: [
        StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
          }),
          Collaboration.configure({
              document: provider.document,
              field: "default",
      
    }),
        ],
      })
    },
  
    beforeDestroy() {
      this.editor.destroy()
    },
  }
  </script>