(() => {
  'use strict'

  $('.datepicker').datepicker({
    format: 'yyyy/mm/dd',
    startDate: '-3d'
  });

  const form = window.document.querySelector("#formData");
  const alertStatus = document.getElementById('alertStatus');
  const payload = new Payload();
  const customer = new Customer();

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
      form.classList.add('was-validated');
      window.electron.appendAlert('Ops... There was something wrong.', 'danger', alertStatus);
      return;
    }

    const data = new FormData(event.target);
    const formEntries = [...data.entries()];
    formEntries.forEach(([key, value]) => {
      if (value && value !== '') {
        customer[key] = value;
      }
    });

    customer.device = {
      uniqueId: customer?.uniqueId,
      make: customer?.make,
      model: customer?.model,
      activationDate: customer?.activationDate,
      retailPrice: customer?.retailPrice
    }

    delete customer.uniqueId;
    delete customer.make;
    delete customer.model;
    delete customer.activationDate;
    delete customer.retailPrice;

    payload.userData = customer;

    if (!window.electron.validatePayload(payload)) {
      return;
    }

    window.electron.processPayload(window, payload, alertStatus);
  });
})();

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}