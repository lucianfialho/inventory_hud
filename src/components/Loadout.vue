<template>
    <div class="loadout">
        <template v-for="(weapon, index) in loadout">
            <div
                class="list-group-item"
                v-bind:class="{ active: weapon.selected }"
                :key="index"
                @click.prevent="showWeaponInfoBox(weapon)"
                >
                <div class="info">
                    <div class="bar">
                        <span class="quantity"><b-tag rounded> {{weapon.ammo}}qtd</b-tag></span>
                    </div>
                    <b-icon
                        pack="fas"
                        :icon="weapon.icon ? weapon.icon : 'question'"
                        size="is-medium">
                    </b-icon>
                    <span> {{weapon.label}} </span>
                </div>
            </div>
        </template>
        <!-- TODO: Iniciar Weapon info das armas, lembrar que esse cara pode receber um array para o cara na hora que selecionar ele poder comparar as 2 armas que ele tem lembrar de limitar -->
        <div class="weapon-info">

        </div>
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
        max-height: 17%;
        z-index: 2;
        min-height: 17%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .list-group-item {
            max-width: 25%;
            &.active{
                max-height: 17%;
                min-height: 17%;
                background: greenyellow
            }
        }
    }
</style>

