
<template>
    <div class="weaponInfo">
        <span> {{weapon.label}} </span>
        
        <b-progress :value="weapon.stats.range" show-value></b-progress>

        <b-progress type="is-danger" :value="weapon.stats.accuracy" show-value></b-progress>

        <b-progress type="is-success" :value="weapon.stats.ammoCapacity" show-value></b-progress>

        <b-progress type="is-info" :value="weapon.stats.damage" show-value></b-progress>

        <b-progress type="is-warning" :value="weapon.stats.fireRate" show-value></b-progress>
        
    </div>
</template>

<script>

import 'buefy/dist/buefy.css'

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
.weaponInfo {
    width: 100%;
    min-height: 240px;
    max-height: 240px;
  
  display: flex;
  flex-grow: 1;
  flex-flow: wrap;
  align-items: center;
  align-content: baseline;

  padding: .75rem 1.25rem;
  
  background: #fff;
  margin: .75rem;
  
  .progress {
      width: 20vh;
  }
}
</style>

