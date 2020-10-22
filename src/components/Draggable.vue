<template>
    <div class="items panel">
        <header class="header">
            <h2> {{ $t('items') }}</h2>
        </header>
        <section class="main">
            <draggable class="list-group"
                :list="inventory"
                group="people"
                handle=".info"
                dragoverBubble="false"
                forceFallback="true"
                @end="dropItem"
                >
                    <template v-for="(element, index) in inventory">
                    <div
                        class="list-group-item noselect"
                        v-bind:class="{ active: element.context, openMenu: element.openMenu }"
                        v-if="element.count"
                        :key="index"
                        @contextmenu.prevent="useItem(element)"
                        @click.middle.ctrl.exact="splitItem(element)"
                        @click.middle.prevent.exact="getClosestsPlayers(element)"
                    >
                        <div class="info">
                            <div class="bar">
                                <!-- TODO: Tratar esse component para verificar se o item em questão tem o peso  -->
                                <span class="weight"><b-tag rounded> {{element.weight}}kg</b-tag></span>
                                <span class="quantity"><b-tag rounded> {{element.count}}</b-tag></span>
                            </div>

                            <b-icon
                                pack="fas"
                                :icon="element.icon ? element.icon : 'question'"
                                size="is-medium">
                            </b-icon>
                            <span> {{element.label}} </span>
                        </div>
                        <div class="menu" v-if="element.openMenu">
                            <b-select v-model="playerIdSelectToGive" placeholder="Select a character" icon="account">
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
                                    v-model="element.giveQuantity"
                                    type="number"
                                    icon-right="gift"
                                    icon-right-clickable
                                    @icon-right-click="giveItemToPlayer(element)">
                                </b-input>
                            </b-field>
                        </div>
                    </div>
                    </template>
                </draggable>
        </section>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Nui from '@/utils/Nui';
export default {
  name: 'loadout',
  components: {
    draggable
  },
  data() {
    return {
        playersClosests: [{name: 'Cebolinha Xeracola', playerId: 2, selected: false}],
        openMenu: false,
        playerIdSelectToGive: null
    }
  },
  props: {
    inventory: {
        type: Array,
        required: false
    },
    isDrop: {
        type: Boolean,
        required: false
    }
  },
  methods: {
    useItem (item) {
        Nui.sendData('esx_inventory_hud:UseItem', item.value)
    },

    dropItem (event) {
        let isDrop = this.checkIfDrop()
      
          if(isDrop === false) return
      
        const item = this.inventory[event.oldIndex]
        item.dropQuantity = event.originalEvent.ctrlKey ? 1 : item.dropQuantity

        const hasDropped = Nui.sendData('esx_inventory_hud:DropItem', item)

        hasDropped.then(response => {
            if (response.data)
            this.inventory.splice(event.oldIndex, 1)
        })
    },

    splitItem (element) {

        if (element.count < 2) return

        let countObj1 = parseInt(element.count / 2)
        let countObj2 = element.count - countObj1
        
        const obj1 = {...element, count: countObj1}
        const obj2 = {...element, count: countObj2}

        this.$emit('itemWasSplited', [obj1, obj2])

    },
    checkIfDrop () {
          return this.isDrop
    },

    getClosestsPlayers (element) {
        if(!element.canRemove) {
            this.$buefy.snackbar.open({
                message: this.$i18n.t('notifications.thisItemCannotBeGivem'),
                type: 'is-warning',
                position: 'is-top',
                indefinite: true,
            })

            this.openMenu = false

            return
        }

        const closestsPlayers = Nui.sendData('esx_inventory_hud:GetClosestsPlayers', element)
              closestsPlayers.then(response => {
                if(!response.data) {
                    this.$buefy.snackbar.open({
                        message: this.$i18n.t('notifications.thereIsNoPlayersClosest'),
                        type: 'is-warning',
                        position: 'is-top',
                        indefinite: true,
                    })

                    return
                }
                
                element.openMenu = true
                this.playersClosests = response.data.playersClosest
              })
    },

    giveItemToPlayer (element) {

        if(this.playerIdSelectToGive === null) {
            this.$buefy.snackbar.open({
                message: this.$i18n.t('notifications.thereIsNoPlayersSelected'),
                type: 'is-warning',
                position: 'is-top',
                indefinite: true,
            })
        }

        const givemItem = Nui.sendData('esx_inventory_hud:GiveItemToAPlayer', {playerToGive: this.playerIdSelectToGive, element: element})
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
                
                element.openMenu = true
                this.playersClosests = response.data.playersClosest
              })
    },

    checkClosestPlayerSelected () {
        return this.playersClosests.filter((player) => (player.selected)).length > 0
    },  
    getClosestPlayerSelected () {
        return this.playersClosests.filter((player) => (player.selected))
    }
  }
};
</script>

<style lang="scss">
    .items {
        .list-group-item {
            &.sortable-chosen {
                background: #ffcd7c !important 
            }

            &.openMenu{
                min-height: 150px;
            }
        }
    }
</style>

