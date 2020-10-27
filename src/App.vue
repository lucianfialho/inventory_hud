<template>
  <div id="app" v-if="showInventoryHud" @keyup.esc="closeInventory" ref="inventoryHud" autofocus="true" tabindex="0">
    <div class="inventory" 
        @mouseleave="isDrop = true"
        @mouseenter="isDrop = false"
      >
      <div class="personalInfo">
        <personalInfo :user="user"> </personalInfo>
        <weaponInfo v-if="showWeaponInfo" :weapon="weaponInfo"></weaponInfo>
      </div>
      <div class="personalItems">
        <loadout :loadout="loadout" :weaponSelected="weaponInfo" @weaponAsSelected="showWeaponBoxInfo" />
        <draggable :inventory="inventory" @itemWasSplited="insertInInventory" :isDrop="isDrop"  />
        <help />
      </div>
    </div>
  </div>
</template>

<script>
import Nui from './utils/Nui'
import draggable from './components/Draggable'
import personalInfo from './components/PersonalInfo'
import loadout from './components/Loadout'
import weaponInfo from './components/WeaponInfo'
import help from './components/Help'

export default {
  name: 'app',
  components: {
    draggable,
    personalInfo,
    loadout,
    weaponInfo,
    help
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
      showWeaponInfo: false,
      weaponInfo: {},
      inventory: [],
      floor: [],
      isDrop: false,
    };
  },
  destroyed() {
    window.removeEventListener('message', this.listener);
    window.removeEventListener('keydown', this.keyListener);
  },
  mounted() {

    this.listener = window.addEventListener(
      'message',
      event => {

        const item = event.data;

        if(item.showInventoryHud === true) {
          this.showInventoryHud = item.showInventoryHud
          setTimeout(() => {
            this.$refs.inventoryHud.focus()
          }, 1000);
        }

        if(item.showInventoryHud === false) this.showInventoryHud = item.showInventoryHud

        if(item.items) this.inventory = item.items

        if(item.user) {
          this.user = item.user
          this.loadout = item.loadout
        }
      },
      false,
    );

    this.keyListener = window.addEventListener(
      'keydown',
      event => {
        const keys = ["1", "2", "3", "4", "5"]
            
        if (keys.includes(event.key) && event.ctrlKey) {
          event.preventDefault()
          
          const weapon = this.weaponInfo

          if(Object.keys(weapon).length === 0  && weapon.constructor === Object) {
              this.$buefy.snackbar.open({
                  message: this.$i18n.t('notifications.needWeaponSelect'),
                  type: 'is-warning',
                  position: 'is-top',
                  indefinite: true,
              })
              return 
          }
            
          Nui.sendData('esx_inventory_hud:ToggleWeaponBinding', {bind: event.key, weapon: weapon})
              .then(response => {
                  const data = {
                      bind: response.data,
                      weapon: weapon
                  }
                  
                  this.setBindValue(data)
              })
        }
      }
    )

  },
  methods: {
    showWeaponBoxInfo (weapon) {
      this.showWeaponInfo = weapon.selected

      if(this.showWeaponInfo) {
        this.weaponInfo = weapon
      } else {
        this.weaponInfo = {}
      }
    },

    closeInventory () {
      Nui.sendData('esx_inventory_hud:CloseInventory')
          .then(response => {
            if (response.data) {
              this.showInventoryHud = false
              this.weaponInfo = {}
              this.inventory = []
            }
          })
    },
    insertInInventory (arrayOfItems) {
      let newinventory = this.inventory.filter(el => (el.value !== arrayOfItems[0].value))
      this.inventory = [...newinventory, ...arrayOfItems]
    },
    setBindValue (data) {
      this.weaponInfo.bind = data.bind
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
  // background: url(https://media.discordapp.net/attachments/752611239988822027/766419973450891314/unknown.png);
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
      strong {
        color: white;
      }
      .header {
        background: rgba($color: #000000, $alpha: 0.5);
        padding: 1rem;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      .main {
        background: rgba($color: #000000, $alpha: 0.5);
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        min-height: 130px;
        display: flex;
        flex-direction: row;

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .bar {
          position: inherit;
          
          .weight {
            position: absolute;
            top: 0;
            left: 4px;
          }
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
          min-width: 140px;

          background: rgba($color: #000000, $alpha: 0.3);
          margin: .75rem;
          border-radius: 1rem;

          &.noselect {
            -webkit-touch-callout: none; /* iOS Safari */
            -webkit-user-select: none; /* Safari */
            -khtml-user-select: none; /* Konqueror HTML */
            -moz-user-select: none; /* Old versions of Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
            supported by Chrome, Edge, Opera and Firefox */
          }

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

        .tabs a{
          color: white;
        }
        .table {
          background: rgba($color: #000000, $alpha: 0.2);
          color: white;
          font-size: 15px;
          th {
            color: white;
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
    color: white;
  }
  .personalItems{
    width: 80%;
    color: white;
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

</style>
