import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        loadout: 'Loadout',
        items: 'Items',
        notifications:{
            moreThanOneWeaponSelect: 'You can select only 1 weapon!'
        }
    },
    'pt-br': {
        loadout: 'Armamentos',
        items: 'Equipamentos',
        notifications:{
            moreThanOneWeaponSelect: 'Você só pode selecionar uma arma!'
        }
    }
};

const i18n = new VueI18n({ 
    locale: 'pt-br', // set locale 
    fallbackLocale: 'en',
    messages
});

export default i18n;