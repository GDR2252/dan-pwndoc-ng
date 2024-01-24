<template>
    <div class="container mx-auto">
      <div class="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <div>
          <h1 class="text-3xl mb-8 font-bold">
            Collaborative Editing with Collaboration
          </h1>
  
          <p class="text-gray-700">Just enter your App ID (or URL, if on-premise) and secret to get started. ✨</p>
          <br />
          <p class="text-gray-700">The JWT is generated client-side and NEVER leaves your device.</p>
          <br />
          <p class="text-gray-700">
            Click
            <a href="https://www.tiptap.dev/docs/cloud" class="underline">here</a>
            to open the documentation.
          </p>
        </div>
  
        <div>
          <p>Current mode: {{ mode }}.
            <span @click="switchMode" class="cursor-pointer underline">
              Click here to switch to {{ alternativeMode }}
            </span>
          </p>
          <br />
          <p>AI: {{ aiEnabled ? 'enabled' : 'disabled' }}.
            <span @click="aiEnabled = !aiEnabled" class="cursor-pointer underline">
              Click here to toggle.
            </span>
          </p>
          <br />
  
          <div class="grid gap-4">
            <hr />
  
            <h2>Collaboration settings</h2>
            <div class="grid gap-1" v-if="mode === 'on-premise'">
              <input
                id="appUrl"
                type="text"
                placeholder="App URL (e.g. ws://localhost:8080)"
                v-model="appUrl"
              />
            </div>
  
            <div class="grid gap-1" v-if="mode === 'cloud'">
              <input
                id="appId"
                type="text"
                placeholder="App ID"
                v-model="appId"
              />
            </div>
  
            <div class="grid gap-2">
              <input
                id="secret"
                type="text"
                placeholder="App Secret"
                v-model="secret"
              />
            </div>
          </div>
  
          <div v-if="aiEnabled" class="grid gap-4 mt-4">
            <hr />
  
            <h2>Ai settings</h2>
  
            <div class="grid gap-1" v-if="mode === 'on-premise'">
              <input
                id="appUrl"
                type="text"
                placeholder="AI App URL (e.g. http://localhost:8080)"
                v-model="aiUrl"
              />
            </div>
  
            <div class="grid gap-1" v-if="mode === 'cloud'">
              <input
                id="aiId"
                type="text"
                placeholder="AI App ID"
                v-model="aiId"
              />
            </div>
  
            <div class="grid gap-2">
              <input
                id="aiSecret"
                type="text"
                placeholder="AI Secret"
                v-model="aiSecret"
              />
            </div>
          </div>
        </div>
      </div>
  
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
        <editor
          :mode="mode"
          :appUrl="appUrl"
          :appId="appId"
          :jwt="jwt"
          :aiEnabled="aiEnabled"
          :aiUrl="aiUrl"
          :aiId="aiId"
          :aiJwt="aiJwt"
        ></editor>
  
        <editor
          :mode="mode"
          :appUrl="appUrl"
          :appId="appId"
          :jwt="jwt"
          :aiEnabled="aiEnabled"
          :aiUrl="aiUrl"
          :aiId="aiId"
          :aiJwt="aiJwt"
        ></editor>
      </div>
    </div>
  </template>
  
  <script>
  import Editor from '@/components/Tiptap-collab.vue';
  import jose from 'jose';
  
  export default {
    data() {
      return {
        mode: 'cloud',
        alternativeMode: 'on-premise',
        aiEnabled: true,
        appUrl: '',
        appId: '',
        secret: '',
        jwt: '',
        aiUrl: '',
        aiId: '',
        aiSecret: '',
        aiJwt: '',
      };
    },
    // methods: {
    //   switchMode() {
    //     this.mode = this.mode === 'cloud' ? 'on-premise' : 'cloud';
    //   },
    // },
    // watch: {
    //   async secret() {
    //     this.jwt = await new jose.SignJWT({
    //       allowedDocumentNames: ['test1', 'test2'],
    //     })
    //       .setProtectedHeader({ alg: 'HS256' })
    //       .setIssuedAt()
    //           .sign(new TextEncoder().encode(this.secret));
    //   },
    //   async aiSecret() {
    //     this.aiJwt = await new jose.SignJWT({})
    //       .setProtectedHeader({ alg: 'HS256' })
    //       .setIssuedAt()
    //       .sign(new TextEncoder().encode(this.aiSecret));
    //   },
    //   mode() {
    //     this.alternativeMode = this.mode === 'cloud' ? 'on-premise' : 'cloud';
    //   },
    //   '$data': {
    //     handler() {
    //       localStorage.setItem('appUrl', this.appUrl);
    //       localStorage.setItem('appId', this.appId);
    //       localStorage.setItem('mode', this.mode);
    //       localStorage.setItem('secret', this.secret);
  
    //       localStorage.setItem('aiEnabled', this.aiEnabled ? '1' : '0');
    //       localStorage.setItem('aiUrl', this.aiUrl);
    //       localStorage.setItem('aiId', this.aiId);
    //       localStorage.setItem('aiSecret', this.aiSecret);
    //     },
    //     deep: true,
    //   },
    // },
    mounted() {
      this.appUrl = window.localStorage.getItem('appUrl') || '';
      this.appId = window.localStorage.getItem('appId') || '';
      this.mode = window.localStorage.getItem('mode') || 'cloud';
      this.secret = window.localStorage.getItem('secret') || '';
  
      this.aiEnabled = window.localStorage.getItem('aiEnabled') === '1';
      this.aiUrl = window.localStorage.getItem('aiUrl') || '';
      this.aiId = window.localStorage.getItem('aiId') || '';
      this.aiSecret = window.localStorage.getItem('aiSecret') || '';
  
      const urlParams = new URLSearchParams(window.location.search);
      const modeParam = urlParams.get('mode');
  
      if (modeParam && ['cloud', 'on-premise'].includes(modeParam)) {
        this.mode = modeParam;
      }
    },
  };
  </script>
  
  <style scoped lang="postcss">
  /* Your styles here */
  </style>
  