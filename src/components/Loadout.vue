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
                    @v-on:keyup.ctrl="teste(weapon)"
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

import Nui from '@/utils/Nui'

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
        if(this.checkWeaponSelected() && !weapon.selected) {
            
            this.$buefy.snackbar.open({
                message: this.$i18n.t('notifications.moreThanOneWeaponSelect'),
                type: 'is-warning',
                position: 'is-top',
                indefinite: true,
            })
            return 
        }
        weapon.selected = !weapon.selected
        this.$emit('weaponAsSelected', weapon)
    },
    checkWeaponSelected () {
        return this.loadout.filter((weapon) => (weapon.selected)).length > 0
    },
    getWeaponSelected () {
        return this.loadout.filter((weapon) => (weapon.selected))
    }
  },
  mounted () {
        this._keyListener = function(e) {
            const keys = ["1", "2", "3", "4", "5", "6"]
            if (keys.includes(e.key) && (e.ctrlKey)) {
                e.preventDefault();
                
                let weapon = this.getWeaponSelected()[0]
                
                if(weapon == null || weapon == undefined) {
                    this.$buefy.snackbar.open({
                        message: this.$i18n.t('notifications.needWeaponSelect'),
                        type: 'is-warning',
                        position: 'is-top',
                        indefinite: true,
                    })
                    return 
                }
                
                if(weapon.type === "item_weapon") {
                    weapon.bind = e.key
                    Nui.sendData('esx_inventory_hud:SetWeaponBinding', weapon)
                }else {
                     this.$buefy.snackbar.open({
                        message: this.$i18n.t('notifications.onlyWeaponCanBeBinding'),
                        type: 'is-warning',
                        position: 'is-top',
                        indefinite: true,
                    })
                }
            }
        };

        document.addEventListener('keydown', this._keyListener.bind(this));

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

