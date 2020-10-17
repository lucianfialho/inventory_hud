import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        loadout: 'Loadout',
        items: 'Items'
    },
    'pt-br': {
        loadout: 'Armamentos',
        items: 'Equipamentos'
    }
};

const i18n = new VueI18n({ 
    locale: 'pt-br', // set locale 
    fallbackLocale: 'en',
    messages
});

export default i18n;