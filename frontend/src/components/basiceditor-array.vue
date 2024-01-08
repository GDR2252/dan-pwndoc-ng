<template>
    <BasicEditor
    v-model="dataString"
    v-on:editorchange="$emit('editorchange')"
    :idUnique="idUnique" 
    :editable="editable"
    :ref="dynRef"
    noSync
    />
</template>

<script>
import BasicEditor from './new-editor';

export default {
    name: 'basiceditor-array',
    props: {
        label: String,
        value: Array,
        noEmptyLine: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        dynRef: String,
        idUnique: String,
        editable:Boolean,
    },

    components:{
        BasicEditor
    },

    data: function() {
        return {
            dataString: ""
        }
    },

    mounted: function() {
        if (this.value)
            this.dataString = this.value.join('\n')
    },

    watch: {
        value (val) {
            var str = (val)? val.join('\n'): ""
            if (str === this.dataString)
                return
            this.dataString = str
        },
        dataString(){
            this.updateParent();
        }
    },

    methods: {
        updateParent: function() {
            if (this.noEmptyLine)
                this.$emit('input', this.dataString.split('\n').filter(e => e !== ''))
            else
                this.$emit('input', this.dataString.split('\n'))
        }
    }
}

</script>

<style>
</style>