import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        loadout: 'Loadout',
        items: 'Items',
        notifications:{
            moreThanOneWeaponSelect: 'You can select only 1 weapon!',
            needWeaponSelect: 'You need a weapon selected',
            onlyWeaponCanBeBinding: 'Only weapon can be binding'
        }
    },
    'pt-br': {
        loadout: 'Armamentos',
        items: 'Equipamentos',
        notifications:{
            moreThanOneWeaponSelect: 'Você só pode selecionar uma arma!',
            needWeaponSelect: 'Você precisa ter uma arma selecionada',
            onlyWeaponCanBeBinding: 'Somente armas podem ser bindadas'
        }
    }
};

const i18n = new VueI18n({ 
    locale: 'pt-br', // set locale 
    fallbackLocale: 'en',
    messages
});

export default i18n;