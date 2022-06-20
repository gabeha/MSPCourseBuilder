<!-- we do this so we can have our little templates to insert!! -->
<template>
<!-- button is clicked, calls the onClick method -->
    <button @click="onClick()">{{ text }}</button>
</template>

<script>
export default{
    name:'button',
    props:{
        text: String,
    },
    methods:{
        onClick(){
            // emits btn-click, which then goes to Header
            this.$emit('btn-click')
        }
    }
}
</script>