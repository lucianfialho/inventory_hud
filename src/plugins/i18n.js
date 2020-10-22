import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        loadout: 'Loadout',
        items: 'Items',
        notifications:{
            moreThanOneWeaponSelect: 'You can select only 1 weapon!',
            needWeaponSelect: 'You need selected a weapon',
            onlyWeaponCanBeBinding: 'Only weapon can be binding',
            thisItemCannotBeGivem: 'This item cannot be gifted',
            thereIsNoPlayersClosest: 'There no players closest to u :/',
            thereIsNoPlayersSelected: 'There no players selected to u :/'
        }
    },
    'pt-br': {
        loadout: 'Armamentos',
        items: 'Equipamentos',
        notifications:{
            moreThanOneWeaponSelect: 'Você só pode selecionar uma arma!',
            needWeaponSelect: 'Você precisa ter uma arma selecionada',
            onlyWeaponCanBeBinding: 'Somente armas podem ser bindadas',
            thisItemCannotBeGivem: 'Esse item não pode ser dado como presente',
            thereIsNoPlayersClosest: 'Não tem nenhum player próximo a você :/',
            thereIsNoPlayersSelected: 'Você precisa selecionar um player'
        }
    }
};

const i18n = new VueI18n({ 
    locale: 'pt-br', // set locale 
    fallbackLocale: 'en',
    messages
});

export default i18n;