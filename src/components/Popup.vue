<template>
    <div v-show="hover" class="bg-white border-2 border-black -right-40 -top-28 absolute rounded-3xl w-48 h-64 z-50"></div>
</template>
<script>
export default {
    name: 'Popup',
    props: {
        code: Intl,
        subject: String,
        prereq: Boolean,
        coreq: Boolean,
        hover: Boolean
        
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}

</script>