<template>
  <div id="app" v-if="showInventoryHud">
    <div class="inventory" 
        @mouseleave="isDrop = true"
        @mouseenter="isDrop = false"
      >
      <div class="personalInfo">
        <personalInfo :user="user"> </personalInfo>
        <weaponInfo v-if="showWeaponInfo" :weapon="weaponInfo"></weaponInfo>
      </div>
      <div class="personalItems">
        
        <loadout :loadout="loadout" @weaponAsSelected="showWeaponBoxInfo" />

        <draggable :inventory="inventory" />
        
      </div>
    </div>
  </div>
</template>

<script>

import draggable from './components/Draggable'
import personalInfo from './components/PersonalInfo'
import loadout from './components/Loadout'
import weaponInfo from './components/WeaponInfo'

import axios from 'axios'

export default {
  name: 'app',
  components: {
      draggable,
      personalInfo,
      loadout,
      weaponInfo
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
      loadout: [{
          label: "WEAPON_SPECIALCARBINE",
          count: 1,
          type: 'item_weapon',
          value: "WEAPON_SPECIALCARBINE",
          usable: false,
          rare: false,
          ammo: 100,
          canGiveAmmo: true,
          canRemove: true,
          selected: false,
          stats: {
              damage: 100,
              fireRate: 25,
              ammoCapacity: 50,
              accuracy: 75,
              range: 96
          }
      }],
      showInventoryHud: false,
      showWeaponInfo: false,
      weaponInfo: {},
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
    },

    showWeaponBoxInfo (weapon) {
      this.showWeaponInfo = weapon.selected
      if(this.showWeaponInfo) this.weaponInfo = weapon
      
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
  background: url(https://media.discordapp.net/attachments/752611239988822027/766419973450891314/unknown.png);
  height: 100%;
  position: absolute;
  width: 100%;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.inventory {
  display: flex;
  flex-direction: row;
  width: 70%;
  margin: 2%;
  transform: perspective(1000px) rotateY(-5deg);
  box-sizing: border-box;

  .panel {
    color: white;
      
      .header {
        background: rgba($color: #000000, $alpha: 0.4);
        padding: 1rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .main {
        background: rgba($color: #000000, $alpha: 0.3);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        min-height: 130px;
        
        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bar {
          position: inherit;
          

          .quantity {
              position: absolute;
              top: 0;
              right: 4px;
          }
        }
        
        .list-group-item {
          position: relative;
          
          display: flex;
          flex-flow: column;

          padding: .75rem 1.25rem;
          max-height: 120px;
          
          max-width: 220px;
          background: rgba($color: #000000, $alpha: 0.3);
          margin: .75rem;
          border-radius: 1rem;

          .c-icon {
              width: 3rem;
              height: 3rem;
              background: rgba($color: #000000, $alpha: 0.3);
              border-radius: 3rem;
              display: flex;
              align-items: center;
              justify-content: center;
          }
        }
      }
  }


  .personalInfo {
    display: flex;
    flex-direction: column;
    backdrop-filter: 5px;
    width: 18%;
    margin-right: 2%;
  }
  .personalItems{
    width: 80%;
  }
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
  
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  place-content: flex-start;
  
  z-index: 2;
  
}

.list-group-item.active .menu-context{
  margin-top: 0.65rem;
  display: flex;
  flex-direction: column;
}

.list-group-item .bar .weight {
  left: -0.75rem;
}

.list-group-item .bar .quantity{
  right: -0.75rem;
}


</style>
