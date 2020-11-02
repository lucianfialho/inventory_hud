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
                        <gIcon :name="weapon.value" />
                        <span> {{weapon.label}} </span>
                    </div>
                    <div class="menu" v-if="weapon.openMenuWeapon">
                        <b-button @click="confirmDrop(weapon)" type="is-danger" icon-left="trash">Drop</b-button>
                        
                            <b-select v-if="playersClosests.length > 0" v-model="playerIdSelectToGive" placeholder="Select a character" icon="account">
                                <template v-for="player in playersClosests"> 
                                    <option
                                        :value="player.playerId"
                                        :key="player.playerId">
                                        {{ player.name }}
                                    </option>
                                </template>
                            </b-select>
                            <b-field v-if="playerIdSelectToGive">
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
import gIcon from '@/components/Icon'

export default {
  name: 'loadout',
  components: {
    gIcon
  },
  props: {
    loadout: {
        type: Array,
    }
  },
  data () {
    return {
        bindHover: false,
        playersClosests: [],
        playerIdSelectToGive: null,
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
    async openMenuWeapon(weapon) {
        this.playersClosests = await Player.getClosestsPlayers(weapon)

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
    },
    sendWeaponToPlayer (weapon) {
        if(this.playerIdSelectToGive === null) {
            this.$buefy.snackbar.open({
                message: this.$i18n.t('notifications.thereIsNoPlayersSelected'),
                type: 'is-warning',
                position: 'is-top',
                indefinite: true,
            })
        }

        const givemItem = Player.giveItemToPlayer(this.playerIdSelectToGive, weapon)
            givemItem.then(response => {
                if(!response.data) {
                    this.$buefy.snackbar.open({
                        message: this.$i18n.t('notifications.thereIsNoPlayersClosest'),
                        type: 'is-warning',
                        position: 'is-top',
                        indefinite: true,
                    })

                    return
                }

                weapon.openMenu = false
                
                this.$emit('itemGived', this.playerIdSelectToGive)
            })
    },
   
  },
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

