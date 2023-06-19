const { contextBridge } = require('electron');
const { processForm } = require('./processForm');
const { isValid } = require('./schemeValidate');

contextBridge.exposeInMainWorld(
  'electron',
  {
    processPayload: async (window, payload, alertStatus) => {
      const encryptedData = await processForm(window, payload, alertStatus);
      return encryptedData;
    },
    validatePayload: (payload) => {
      const validate = isValid(payload);
      return validate;
    },
    appendAlert: (message, type, component) => {
      const visibility = type === 'primary' ? 'visible' : 'hidden';
      component.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        '<div class="d-flex">',
        `<div style="visibility: ${visibility}" class="spinner-border mx-4" role="status"><span class="visually-hidden">Loading...</span></div>`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
        '</div>'
      ].join('')

      component.append(wrapper);
    }
  }
);
