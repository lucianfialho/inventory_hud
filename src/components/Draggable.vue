<template>
    <div>  
        <ul>
            <li v-for="list in items" :key="list.id" v-on:mousemouve="onMouseMove"> </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Draggable',
    props: ['items'],
    methods: {
        onMouseMove (ev) {
            console.log(ev)
        }
    }
}
</script>

<style>

</style>