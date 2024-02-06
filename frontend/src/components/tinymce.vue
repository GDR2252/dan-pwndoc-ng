<template>
        <div>
            <editor
            api-key="yrgllrwqeg0gndg3z3ouof8njfy0bsdwrr6295bsuwpev5uy"
            v-model="inputVal"
            />
            <button @click="checkData"></button>
        </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
    name: "App",
    props: ['value']
,
  components: {
	editor: Editor,
    },
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    data:() => {
    return {
        abc: ""
    };
    },
    watch: {
        async value(value) {
            console.log("v",value);
        }
    }
    ,
    mounted: function(){
        this.abc="<p>ioanwfe<p>"
    }
    , methods: {
        checkData() {
            // console.log(this.abc);
            console.log(this.value);
        },
        handleChange(value) {
            console.log(value);
      /* Fires only when editor emits focusout event. Receives generated HTML */
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
// collaboration
// ai 
// comments
// save to db