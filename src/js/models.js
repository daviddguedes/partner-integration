class Payload {
  locale = 'en';
  vertical = 'device-protection-insurance';
  transactionId = uuidv4();
  timestamp = new Date().getTime();
  coverageStart = this.setCoverageStartDate();
  agentId = 'QST65444';
  storeId = '307ID';

  setCoverageStartDate() {
    const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const year = new Date(tomorrow).getFullYear();
    const month = `${new Date(tomorrow).getMonth() + 1}`.padStart(2, '0');
    const day = new Date(tomorrow).getDate();
    return `${year}/${month}/${day}`;
  }
}

class Customer {
  firstName = "";
  phoneNumber = "";
  address = "";
  province = "";
  device = new Device();
}

class Device {
  uniqueId = "";
  make = "";
  model = "";
  activationDate = "";
  retailPrice = "";
}