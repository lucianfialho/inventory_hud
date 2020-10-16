
<template>
    <div>{{weapon}}</div>
    <!-- <div class="info">
        <div class="bar">
            <span class="quantity">
                <b-tag rounded> {{weapon.ammo}}qtd</b-tag>
            </span>
        </div>
        <b-icon
            pack="fas"
            :icon="weapon.icon ? weapon.icon : 'question'"
            size="is-medium">
        </b-icon>
        <span> {{weapon.label}} </span>
    </div> -->
</template>

<script>
export default {
  name: 'weapon-info',
  props: {
      weapon: {
          type: Object,
          required: false
      }
  }
};
</script>

<style lang="scss">

</style>

