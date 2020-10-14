<template>
  <div id="app" v-if="showInventoryHud">
    <div class="card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img src="https://media.discordapp.net/attachments/752611239988822027/765551405133987850/Sem_Titulo-1.jpg" alt="Placeholder image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{user.firstName}} {{user.lastName}}</p>
            <p class="subtitle is-6">
              <b-icon
                icon="briefcase"
                size="is-small">
              </b-icon>
              <span> {{user.job.label}} - <small>{{user.job.grade_label}}</small></span>
            </p>
            <p class="bank-info">
              <b-icon
                icon="piggy-bank"
                size="is-small">
              </b-icon>
              <span> {{user.bank}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="inventory" 
        @mouseleave="isDrop = true"
        @mouseenter="isDrop = false"
      >
      <h1> Inventory</h1>
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
    </div>
    <div class="loadout">
      <h2> Loadout </h2>
      <template v-for="(weapon, index) in loadout">
        <div
          class="list-group-item"
          v-bind:class="{ active: weapon.selected }"
          :key="index"
          @click.prevent="weapon.selected = !weapon.selected"
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
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  name: 'app',
  components: {
      draggable,
  },

  data() {
    return {
      user: {
        firstName: 'Lucian',
        lastName: 'Fialho',
        dateOfBirth: '16/08/1989',
        bank: 0,
        job: {
          label: 'LSPD',
          grade_label: 'Commandant'
        }
      },
      loadout: [],
      showInventoryHud: false,
      inventory: [{"name": "meu_pau","rare": false, "type": "item_standard", "count": 1, "label": "Meu Pau", "canRemove": true, "usable": true}, 
                  {"name": "seu_cu","rare": false, "type": "item_standard", "count": 1, "label": "Seu cu", "canRemove": true, "usable": true}],
      floor: [],
      isDrop: false,
    };
  },
  destroyed() {
    window.removeEventListener('message', this.listener);
  },
  mounted() {
    this.listener = window.addEventListener(
      'message',
      event => {
        const item = event.data;

        if(item.showInventoryHud === true) this.showInventoryHud = item.showInventoryHud
        if(item.showInventoryHud === false) this.showInventoryHud = item.showInventoryHud

        if(item.items) this.inventory = item.items

        if(item.user) {
          this.user = item.user
          this.loadout = item.loadout
        }
      },
      false,
    );
  },
  methods: {
    sendData (name, data) {
      return axios.post(`http://esx_inventory_hud/${name}`, { data: data })
    },

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
    }
  },
};
</script>

<style lang="scss">
/* Want nice animations? Check out https://github.com/asika32764/vue2-animate */
/* @import 'https://unpkg.com/vue2-animate/dist/vue2-animate.min.css'; */

html {
  background: transparent;
  overflow-y: hidden;
}
#app {
  display: flex;
  flex-direction: row;
  background: rgba(0,0,0,.125);
  height: 100%;
  position: absolute;
  width: 100%;
  flex-wrap: wrap;
}
.card, .loadout {
  min-width: 25% !important;
  max-width: 30% !important;
  max-height: 17%;
  margin: 2%;
  z-index: 2;
  min-height: 17%;
}

.inventory {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 2%;
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
    width: 100%;
    min-height: 200px;

    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
    background: rgba(0,0,0,.425);
    
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    place-content: flex-start;
    z-index: 2;
}

.list-group-item+.list-group-item {
    border-top-width: 0;
}


.list-group-item {
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: .75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  max-height: 100px;
  flex-flow: column;
  
  margin: .75rem;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-group-item.active {
  min-height: 220px;
  max-height: 100px;
  flex-grow: 2;
}

.list-group-item.active .menu-context{
  margin-top: 0.65rem;
  display: flex;
  flex-direction: column;
}

.list-group-item .bar .weight,
.list-group-item .bar .quantity{
  position: relative;
  top: -0.45rem;
}

.list-group-item .bar .weight {
  left: -0.75rem;
}

.list-group-item .bar .quantity{
  right: -0.75rem;
}


</style>
