<template>
    <div class="loadout panel">
        <header class="header">
            <h2> {{ $t('loadout') }} </h2>
        </header>
        <section class="main">
            <template v-for="(weapon, index) in loadout">
                <div
                    class="list-group-item noselect"
                    v-bind:class="{ active: weapon.selected, openMenu: weapon.openMenuWeapon }"
                    :key="index"
                    @click.capture.prevent="selectWeapon(weapon)"
                    @contextmenu.prevent.ctrl.exact="openMenuWeapon(weapon)"
                    >
                    <div class="info">
                        <div class="bar">
                            <span class="weight" v-if="weapon.bind">
                                <b-tag rounded> {{weapon.bind}}</b-tag>
                            </span>
                            <span class="quantity">
                                <b-tag rounded> {{weapon.ammo}}</b-tag>
                            </span>
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
                    <div class="menu" v-if="weapon.openMenuWeapon">
                        <b-button @click="confirmDrop(weapon)" type="is-danger" icon-left="trash">Drop</b-button>
                        
                            <b-select v-if="playersClosests.length > 0" v-model="playerIdSelectToGiveWeapon" placeholder="Select a character" icon="account">
                                <template v-for="player in playersClosests"> 
                                    <option
                                        :value="player.playerId"
                                        :key="player.playerId">
                                        {{ player.name }}
                                    </option>
                                </template>
                            </b-select>
                            <b-field v-if="playerIdSelectToGiveWeapon">
                                <b-input placeholder="Digite a quantidade"
                                    v-model="weapon.giveAmmoQuantity"
                                    type="number"
                                    icon-right="gift"
                                    icon-right-clickable
                                    @icon-right-click="giveItemToPlayer(weapon)">
                                </b-input>
                            </b-field>
                        </div>
                </div>
            </template>
        </section>
    </div>
</template>

<script>

import Nui from '@/utils/Nui'
import Player from '@/utils/Player';

export default {
  name: 'loadout',
  props: {
    weaponSelected: {
        type: Object
    },
    loadout: {
        type: Array,
    }
  },
  data () {
    return {
        bindHover: false,
        playersClosests: [],
        playerIdSelectToGiveWeapon: null,
    }
  },
  methods:{
    selectWeapon (weapon) {
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
        if(!this.loadout) return false

        return this.loadout.filter((weapon) => (weapon.selected)).length > 0
    },  
    getWeaponSelected () {
        return this.weaponSelected
    },

    checkIfExistsBinding (key) {
        return this.loadout.filter((weapon) => (weapon.bind == key))
    },
    confirmDrop(weapon) {
        this.$buefy.dialog.confirm({
            title: 'Droping weapon',
            message: this.$i18n.t('notifications.areYouSure'),
            confirmText: this.$i18n.t('actions.drop'),
            cancelText: this.$i18n.t('actions.cancel'),
            type: 'is-danger',
            hasIcon: true,
            onConfirm: () => this.dropWeapon(weapon)
        })
    },
    dropWeapon(weapon) {
        const hasDropped = Nui.sendData('esx_inventory_hud:DropItem', weapon)

        hasDropped.then(response => {
            if (response.data)
            this.loadout.splice(event.oldIndex, 1)
        })
    },
    openMenuWeapon(weapon) {
        this.playersClosests = Player.getClosestsPlayers(weapon)

        if(!this.playersClosests) {
                this.$buefy.snackbar.open({
                    message: this.$i18n.t('notifications.thereIsNoPlayersClosest'),
                    type: 'is-warning',
                    position: 'is-top',
                    indefinite: true,
                })
                this.playersClosests = []
                return
            }
        weapon.openMenuWeapon = true
    }   
  },
  mounted() {
        this._keyListener = (e) => {
            const keys = ["1", "2", "3", "4", "5"]
            
            if (keys.includes(e.key) && e.ctrlKey) {
                e.preventDefault()
                
                const weapon = this.getWeaponSelected()

                if(Object.keys(weapon).length === 0  && weapon.constructor === Object) {
                    this.$buefy.snackbar.open({
                        message: this.$i18n.t('notifications.needWeaponSelect'),
                        type: 'is-warning',
                        position: 'is-top',
                        indefinite: true,
                    })
                    return 
                }
                
                Nui.sendData('esx_inventory_hud:ToggleWeaponBinding', {bind: e.key, weapon: weapon})
                    .then(response => {
                        const data = {
                            bind: response.data,
                            weapon: weapon
                        }
                        
                        this.$emit('bindHasSelected', data)
                    })
            }
        }

        document.addEventListener('keydown', this._keyListener.bind(this), true);

  }
};
</script>

<style lang="scss">
    .loadout {
        width: 100%;
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
                max-height: 20%;
                min-height: 17%;
                background: #f9bb57 !important
            }

            &.openMenu{
                max-height: 200px !important;

                .menu {
                    display: flex;
                    align-content: center;
                    flex-direction: column;
                }
            }
        }

        
    }
</style>

