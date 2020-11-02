import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
        loadout: 'Loadout',
        items: 'Items',
        actions: {
            drop: 'Drop',
            cancel: 'Cancel',
            give: 'Give'
        },
        weaponInfo: {
            stats: {
                range: 'Range',
                accuracy: 'Accuracy',
                ammoCapacity: 'Capacity',
                damage: 'Damage',
                fireRate: 'Fire rate',
            }
        },
        notifications:{
            moreThanOneWeaponSelect: 'You can select only 1 weapon!',
            needWeaponSelect: 'You need selected a weapon',
            onlyWeaponCanBeBinding: 'Only weapon can be binding',
            thisItemCannotBeGivem: 'This item cannot be gifted',
            thereIsNoPlayersClosest: 'There no players closest to u :/',
            thereIsNoPlayersSelected: 'There no players selected to u :/',
            youAlreadyHaveAWeaponWhitThisBind: 'You already have a weapon with this bind number',
            areYouSure: 'Are you sure you want to <b>drop</b> your weapon? This action cannot be undone.'
        }
    },
    'pt-br': {
        loadout: 'Armamentos',
        items: 'Equipamentos',
        actions: {
            drop: 'Dropar',
            cancel: 'Cancelar',
            give: 'Presentear'
        },
        weaponInfo: {
            stats: {
                range: 'Distância',
                accuracy: 'Precisão',
                ammoCapacity: 'Capacidade',
                damage: 'Dano',
                fireRate: 'Velocidade de tiro',
            }
        },
        notifications:{
            moreThanOneWeaponSelect: 'Você só pode selecionar uma arma!',
            needWeaponSelect: 'Você precisa ter uma arma selecionada',
            onlyWeaponCanBeBinding: 'Somente armas podem ser bindadas',
            thisItemCannotBeGivem: 'Esse item não pode ser dado como presente',
            thereIsNoPlayersClosest: 'Não tem nenhum player próximo a você :/',
            thereIsNoPlayersSelected: 'Você precisa selecionar um player',
            youAlreadyHaveAWeaponWhitThisBind: 'Você já tem uma arma com esse numero de bind',
            areYouSure: 'Você tem certeza que você quer <b>dropar</b> sua arma? Essa ação não pode ser desfeita'
        }
    }
};

const i18n = new VueI18n({ 
    locale: 'pt-br', // set locale 
    fallbackLocale: 'en',
    messages
});

export default i18n;