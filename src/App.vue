<template>
  <div id="app" v-if="showInventoryHud">
    <draggable class="list-group" :list="inventory" group="people" dragoverBubble="true" forceFallback="false" @start="log" @change="log">
        <div
          class="list-group-item"
          v-for="(element, index) in list1"
          :key="element.name"
        >
          {{ element.name }} {{ index }}
        </div>
    </draggable>

    <draggable class="list-group" :list="floor" group="people" dragoverBubble="true" forceFallback="false" @start="log"  @change="log">
      <div
        class="list-group-item"
        v-for="(element, index) in list2"
        :key="element.name"
      >
        {{ element.name }} {{ index }}
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
      inventory: [],
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

        if(item.showInventoryHud && item.items) this.inventory.items = item.items 
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
}
.buttons {
  margin-top: 35px;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
    width: 25%;
    margin: 2%;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    border-radius: .25rem;
}
.list-group-item+.list-group-item {
    border-top-width: 0;
}
.list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0,0,0,.125);
}
</style>
