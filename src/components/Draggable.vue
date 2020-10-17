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

