<template>
    <div class="g-icon">
        <img v-bind:src='`./images/${name}.svg`' />
    </div>
</template>
<script>
export default {
    name: 'g-icon',
    props: {
        name: {
            type: String,
        }
    },
    data () {
        return {
            publicPath: process.env.BASE_URL
        }
    }
}
</script>

<style lang="scss">
    .g-icon {
        width: 9rem;
        height: 3rem;
        
        display: flex;
        
        align-items: center;
        justify-content: center;

        margin-bottom: 0.75rem;

        img {
            width: 10rem;
        }
    }
</style>