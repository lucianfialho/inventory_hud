<template>
  <div id="app" v-if="showInventoryHud">
    <draggable class="list-group" :list="inventory" group="people" handle=".info" dragoverBubble="true" forceFallback="false">
        <template v-for="element in inventory">
          <div
            class="list-group-item"
            v-bind:class="{ active: element.context }"
            v-if="element.count"
            :key="element.name"
            @contextmenu.prevent="element.context = !element.context"
          >
            <div class="info">
              <div class="bar">
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

            <div v-if="element.context" class="menu-context">
              <b-button size="is-small"
                icon-left="user-check"
                @click.prevent="useItem(element)"
                >
                Use
              </b-button>
              <b-field>
                <b-input placeholder="Throw"
                    v-if="element.canRemove"
                    size="is-small"
                    v-model="element.dropQuantity"
                    min="1"
                    :max="element.count"
                    type="number"
                    icon-right="trash"
                    icon-right-clickable
                    @icon-right-click="dropItem(element)">
                </b-input>
              </b-field>
            </div>
          </div>
        </template>
    </draggable>

    <draggable class="list-group drop-zone" :list="floor" group="people" dragoverBubble="true" forceFallback="false" @change="dropItem">
      <div
        class="list-group-item"
        v-for="element in floor"
        :key="element.name"
      >
        {{ element.label }}
      </div>
    </draggable>
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
      showInventoryHud: false,
      inventory: [
        {"name": "bandage", "label": "Bandage", "weight": 2, "rare": 0, "canRemove": 1, "icon": "band-aid", "count": 4, "context": false, dropQuantity: 0},
        {"name": "medikit", "label": "Medikit", "weight": 2, "rare": 0, "canRemove": 1, "icon": "medkit", "count": 4, "context": false, dropQuantity: 0},
        {"name": "asd", "label": "asd", "weight": 2, "rare": 0, "canRemove": 1, "icon": null, "count": 1, "context": false, dropQuantity: 0},
        {"name": "weed", "label": "Weed", "weight": 2, "rare": 0, "canRemove": 1, "icon": "cannabis", "count": 1, "context": false, dropQuantity: 0},
        {"name": "blublerrykush", "label": "Blublerry Kush", "weight": 2, "rare": 0, "canRemove": 1, "icon": "cannabis", "count": 1, "context": false, dropQuantity: 0},
        {"name": "ak-47", "label": "Ak-47", "weight": 10, "rare": 0, "canRemove": 1, "icon": "cannabis", "count": 1, "context": false, dropQuantity: 0}
      ],
      floor: []
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
    dropItem (element) {
      const item = (element.hasOwnProperty('added')) ? element.added.element : element
      const hasDropped = this.sendData('esx_inventory_hud:DropItem', item)
            hasDropped.then(response => {
              if (response.data) this.floor.splice(0, 1) 
            })
    },
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
  flex-direction: column;
  background: rgba(0,0,0,.125);
  height: 100%;
  position: absolute;
  width: 100%;
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
    width: 35%;
    margin: 2%;
    min-height: 200px;

    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
    background: rgba(0,0,0,.425);
    
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    place-content: flex-start;
}

.list-group-item+.list-group-item {
    border-top-width: 0;
}

.list-group.drop-zone {
  border: 5px dotted red;
}

.list-group.drop-zone::after{
  content: "DROP ZONE";
  color: WHITE;
  line-height: 200px;
  margin: 0 auto;
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
