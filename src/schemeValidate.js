const Joi = require('joi');

const schema = Joi.object().keys({
  firstName: Joi.string().required(),
  phoneNumber: Joi.string().regex(/^\d{9,12}$/).required(),
  postcode: Joi.optional(),
  address: Joi.string().required(),
  address2: Joi.optional(),
  province: Joi.string().required(),
  district: Joi.optional(),
  subDistrict: Joi.optional(),
  idType: Joi.optional(),
  idNumber: Joi.optional(),
  lastName: Joi.optional(),
  device: Joi.object().keys({
    uniqueId: Joi.string().required(),
    make: Joi.string().required(),
    model: Joi.string().required(),
    activationDate: Joi.string().required(),
    retailPrice: Joi.string().required()
  })
});

const isValid = (data) => {
  const validate = schema.validate(data.userData);

  if (validate.error) {
    return validate.error;
  }

  return validate;
}

exports.isValid = isValid;