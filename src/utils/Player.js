import Nui from "./Nui"

export default {
    async getClosestsPlayers(element) {
        
        // Desacoplando a função que pega os players proximos, quero usar ela no de arma tbm
        const closestsPlayers = await Nui.sendData('esx_inventory_hud:GetClosestsPlayers', element)
        
        return closestsPlayers.data.playersClosest
    },

    async giveItemToPlayer (playerToGive, element) {
        const givemItem = await Nui.sendData('esx_inventory_hud:GiveItemToAPlayer', {playerToGive: playerToGive, element: element})
        return givemItem.data
    },
}