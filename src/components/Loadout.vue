<template>
    <div class="loadout panel">
        <header class="header">
            <h2> {{ $t('loadout') }} </h2>
        </header>
        <section class="main">
            <template v-for="(weapon, index) in loadout">
                <div
                    class="list-group-item noselect"
                    v-bind:class="{ active: weapon.selected }"
                    :key="index"
                    @click.prevent="showWeaponInfoBox(weapon)"
                    >
                    <div class="info">
                        <div class="bar">
                            <span class="quantity"><b-tag rounded> {{weapon.ammo}}</b-tag></span>
                        </div>
                        <div class="c-icon">
                            <b-icon
                                pack="fas"
                                :icon="weapon.icon ? weapon.icon : 'question'"
                                size="is-medium">
                            </b-icon>
                        </div>
                        <span> {{weapon.label}} </span>
                    </div>
                </div>
            </template>
        </section>
    </div>
</template>

<script>
export default {
  name: 'loadout',
  props: {
    loadout: {
        type: Array,
        required: false
    }
  },
  methods:{
    showWeaponInfoBox (weapon) {
        weapon.selected = !weapon.selected
        this.$emit('weaponAsSelected', weapon)
    }
  }
};
</script>

<style lang="scss">
    .loadout {
        width: 100%;
        max-height: 20%;
        z-index: 2;
        min-height: 20%;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        color: white;

        .list-group-item {
            
            &:hover {
                cursor: pointer
            }
            
            &.active{
                max-height: 17%;
                min-height: 17%;
                background: #f9bb57 !important
            }

            &.noselect {
                -webkit-touch-callout: none; /* iOS Safari */
                -webkit-user-select: none; /* Safari */
                -khtml-user-select: none; /* Konqueror HTML */
                -moz-user-select: none; /* Old versions of Firefox */
                -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                supported by Chrome, Edge, Opera and Firefox */
            }
        }

        
    }
</style>

