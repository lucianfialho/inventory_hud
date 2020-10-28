
<template>
    <div class="weaponInfo">
        {{ $t('weaponInfo.stats.damage') }}
        <b-progress type="is-info" :value="weapon.stats.damage" show-value></b-progress>
        {{ $t('weaponInfo.stats.fireRate') }}
        <b-progress type="is-warning" :value="weapon.stats.fireRate" show-value></b-progress>
        {{ $t('weaponInfo.stats.accuracy') }}
        <b-progress type="is-danger" :value="weapon.stats.accuracy" show-value></b-progress>
        {{ $t('weaponInfo.stats.ammoCapacity') }}
        <b-progress type="is-success" :value="weapon.stats.ammoCapacity" show-value></b-progress>
        {{ $t('weaponInfo.stats.range') }}
        <b-progress :value="weapon.stats.range" show-value></b-progress>
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
    flex-flow: wrap;
    align-items: center;
    align-content: baseline;
    
    background: rgba($color: #000000, $alpha: 0.5); 
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
    padding: 1rem;
    font-size: 1rem;

    .progress {
        width: 21.5vh;
    }

    .progress-wrapper:not(:last-child) {
        margin-bottom: 0.1rem;
    }
}
</style>

