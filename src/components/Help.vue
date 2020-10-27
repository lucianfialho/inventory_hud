<template>
    <section>
        <b-collapse
            aria-id="contentIdForA11y2"
            class="panel"
            animation="slide"
            v-model="isOpen">
            <div
                slot="trigger"
                class="header"
                role="button"
                aria-controls="contentIdForA11y2">
                <strong>Help and shortcuts</strong>
            </div>
            <div class="main">
                <b-tabs v-model="activeTab">
                    <b-tab-item label="Items">
                        <b-table
                            :data="items"
                            :columns="columns"
                            >
                        </b-table>
                    </b-tab-item>

                    <b-tab-item label="Weapons">
                        <b-table
                            :data="loadout"
                            :columns="columns"
                            >
                        </b-table>
                    </b-tab-item>
                </b-tabs>
            </div>
        </b-collapse>

    </section>
</template>

<script>
    export default {
        data() {
            return {
                items: [{'id': 1, 'behavior': 'When you drag and drop a item outside of your inventory canvas', 'action': 'Drop current item dragged with full count on the floor'},
                        {'id': 2, 'behavior': 'When you drag and drop an item to your inventory screen with CTRL pressed', 'action': 'Drop current item dragged with one quantity on the floor'},
                        {'id': 3, 'behavior': 'When you right-clicked on item', 'action': 'Use the item'},
                        {'id': 4, 'behavior': 'When you middle-clicked on item', 'action': 'Open the "givem menu" of item, if you have players closest'},
                        {'id': 5, 'behavior': 'When you left-clicked on gift button in "givem menu"', 'action': 'Give a item to player selected quantity as required'},
                        {'id': 6, 'behavior': 'When you middle-clicked on item with CTRL pressed', 'action': 'Split element in two new items'},
                        {'id': 6, 'behavior': 'When you left-clicked on gift button in givem menu', 'action': 'Split element in two new items'}],
                loadout: [{'id': 1, 'behavior': 'When you left-clicked on weapon', 'action': 'Select de weapon and show the weapon info'},
                         {'id': 2, 'behavior': 'When you right-clicked with CTRL pressed on weapon', 'action': 'Open the "Weapon context menu"'},
                         {'id': 3, 'behavior': 'When you left-clicked on gift button in "Weapon menu"', 'action': 'Give a ammo to player selected quantity as required'},
                         {'id': 4, 'behavior': 'When you press CTRL + 1 (2, 3, 4, 5) on weapon selected', 'action': 'Bind weapon on fastWeapon feature'}],
                isOpen: false,
                activeTab: 0,
                showBooks: false,
                columns: [
                    {
                        field: 'behavior',
                        label: 'Behavior',
                    },
                    {
                        field: 'action',
                        label: 'Action',
                    },
                ]

            }
        }
    }
</script>
