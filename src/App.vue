<template>
  <div id="app" v-if="showInventoryHud">
    <draggable class="list-group" :list="inventory" group="people" dragoverBubble="true" forceFallback="false" @start="log" @change="log">
        <template v-for="element in inventory">
          <div
            class="list-group-item"
            v-bind:class="{ active: element.context }"
            v-if="element.count"
            :key="element.name"
            @contextmenu.prevent="rightClick(element); element.context = !element.context"
          >
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

            <div v-if="element.context" class="menu-context">
              <b-field>
                <b-input placeholder="Use"
                    size="is-small"
                    :value="element"
                    min="1"
                    :max="element.count"
                    type="number"
                    icon-right="user-check"
                    icon-right-clickable
                    @icon-right-click="clearIconClick">
                </b-input>
              </b-field>
              <b-field>
                <b-input placeholder="Throw"
                    size="is-small"
                    :value="element"
                    min="1"
                    :max="element.count"
                    type="number"
                    icon-right="trash"
                    icon-right-clickable
                    @icon-right-click="clearIconClick">
                </b-input>
              </b-field>
            </div>
          </div>
        </template>
    </draggable>

    <draggable class="list-group" v-if="floor" :list="floor" group="people" dragoverBubble="true" forceFallback="false" @start="log"  @change="log">
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

export default {
  name: 'app',
  components: {
      draggable,
  },

  data() {
    return {
      showInventoryHud: false,
      inventory: [
        {"name": "bandage", "label": "Bandage", "weight": 2, "rare": 0, "can_remove": 1, "icon": "band-aid", "count": 4, "context": false},
        {"name": "medikit", "label": "Medikit", "weight": 2, "rare": 0, "can_remove": 1, "icon": "medkit", "count": 4, "context": false},
        {"name": "asd", "label": "asd", "weight": 2, "rare": 0, "can_remove": 1, "icon": null, "count": 1, "context": false},
        {"name": "weed", "label": "Weed", "weight": 2, "rare": 0, "can_remove": 1, "icon": "cannabis", "count": 1, "context": false},
        {"name": "blublerrykush", "label": "Blublerry Kush", "weight": 2, "rare": 0, "can_remove": 1, "icon": "cannabis", "count": 1, "context": false},
        {"name": "ak-47", "label": "Ak-47", "weight": 10, "rare": 0, "can_remove": 1, "icon": "cannabis", "count": 1, "context": false}
      ],
      floor: false
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

        if(item.items)
          this.inventory = item.items.map(item => ( {...item, context: false}))

      },
      false,
    );
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan" });
    },
    replace: function() {
      this.list = [{ name: "Edgard" }];
    },
    clone: function(el) {
      return {
        name: el.name + " cloned"
      };
    },
    log: function(evt) {
      window.console.log(evt);
    },
    rightClick (element) {
      window.console.log(element)
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
.list-group-item {
  position: relative;
  display: flex;
  flex-grow: 1;
  padding: .75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0,0,0,.125);
  max-height: 100px;
  flex-flow: column;
  align-items: center;
  margin: .75rem;
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
