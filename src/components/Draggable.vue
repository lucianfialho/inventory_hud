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
                        class="list-group-item"
                        v-bind:class="{ active: element.context }"
                        v-if="element.count"
                        :key="index"
                        @contextmenu.prevent="useItem(element)"
                        @click.middle.ctrl.exact="splitItem(element)"
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
                    </div>
                    </template>
                </draggable>
        </section>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'loadout',
  components: {
    draggable
  },
  props: {
    inventory: {
        type: Array,
        required: false
    }
  },
  methods: {
    useItem (item) {
        this.sendData('esx_inventory_hud:UseItem', item.value)
    },

    dropItem (event) {
        let isDrop = this.checkIfDrop()
      
          if(isDrop === false) return
      
        const item = this.inventory[event.oldIndex]
        item.dropQuantity = event.originalEvent.ctrlKey ? 1 : item.dropQuantity

        const hasDropped = this.sendData('esx_inventory_hud:DropItem', item)

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
      
          this.insertInInventory([obj1, obj2])
      
    },

    insertInInventory (arrayOfItems) {
          let newinventory = this.inventory.filter(el => (el.value !== arrayOfItems[0].value))
      
          this.inventory = [...newinventory, ...arrayOfItems]
    },
    checkIfDrop () {
          return this.isDrop
    },
  }
};
</script>

<style lang="scss">
    .items {
        .list-group-item {
            &.sortable-chosen {
                background: #ffcd7c !important 
            }
                

        }
    }
</style>

