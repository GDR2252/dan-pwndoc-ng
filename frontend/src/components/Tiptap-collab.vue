<template>
    <div>
      <StatusBar
        v-if="provider"
        :provider="provider"
        :socket="provider.configuration.websocketProvider"
      />
      <div v-if="editor">
        <div class="rounded-xl border-[3px] border-black">
          <div v-if="aiEnabled">
            <!-- ... your AI buttons and controls ... -->
          </div>
          <editor-content :editor="editor" class="editor" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Editor, EditorContent } from "@tiptap/vue-2";
  import StarterKit from "@tiptap/starter-kit";
  import Collaboration from "@tiptap/extension-collaboration";
  import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
  import { TiptapCollabProvider } from "@hocuspocus/provider";

  import {
    onBeforeUnmount,
    onMounted,
    ref,
    watch,
    defineProps,
  } from "vue";
  
  export default {
    props: {
    //   mode: String,
    //   appId: String,
    //   appUrl: String,
    //   jwt: String,
    //   aiEnabled: Boolean,
    //   aiUrl: String,
    //   aiId: String,
    //   aiJwt: String,
    },
    data() {
      return {
        provider: null,
        editor: null,
        isDisabled: false,
        streamMode: true,
        isLoading: false,
        errorMessage: "",
      };
    },
    watch: {
    //   props: "recreate",
    },
    mounted() {
      this.recreate();
    },
    beforeDestroy() {
      this.provider && this.provider.destroy();
      this.editor && this.editor.destroy();
    },
    methods: {
      recreate() {
        this.provider?.destroy();
        this.editor?.destroy();
  
        this.provider = new TiptapCollabProvider({
         appId: "xm411nm2",           
          name: "test1",
          token: ""});
  
        this.editor = new Editor({
          extensions: [
            StarterKit.configure({
              history: false,
            }),
            Collaboration.configure({
              document: this.provider.document,
              field: "default",
            }),
            CollaborationCursor.configure({
              provider: this.provider,
              user: {
                name: "Editor1",
                color: "#EADDCA",
              },
            }),
           
          ],
          enableInputRules: true,
          enablePasteRules: true,
          onSelectionUpdate(props) {
            const {
              empty: selectionIsEmpty,
              from: selectionFrom,
              to: selectionTo,
            } = props.editor.state.selection;
            const selectionContainsText = props.editor.state.doc.textBetween(
              selectionFrom,
              selectionTo,
              " "
            );
  
            this.isDisabled = selectionIsEmpty || !selectionContainsText;
          },
        });
      },
    },
  };
  </script>
  