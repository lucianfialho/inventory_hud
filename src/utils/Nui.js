import axios from 'axios'

export default {
  async send(event, data = {}) {
    /// #if DEBUG
    return await new Promise(resolve => setTimeout(resolve, 100));
    /// #endif

    /* eslint-disable no-unreachable */
    return await fetch(`http://<resource>/${event}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    });
    /* eslint-enable no-unreachable  */
  },
  sendData (name, data) {
    return axios.post(`http://esx_inventory_hud/${name}`, { data: data })
  },
  emulate(type, data = null) {
    window.dispatchEvent(
      new MessageEvent('message', {
        data: {
          type,
          data,
        },
      }),
    );
  },
};
