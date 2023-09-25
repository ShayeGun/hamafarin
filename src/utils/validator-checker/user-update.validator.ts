import Joi from "joi";

// {
//     "national_code": "0453612385",
//     "cellphone": "09125466570",
//     "birthday": "1364-06-01",
//     "postal_code": "1465889852",
//     "address": "اختیاریه",
//     "sheba": "950120020000008955409190",
//     "dossier_id": 1
// }

const stringyNumberRegex = /^[0-9]+$/;
const phoneRegex = /^09[0-9]{9}$/;
const dateRegex = /^\d{4}\-\d{2}\-\d{2}$/;

const updateUserSchema = Joi.object({

    national_code: Joi.string()
        .pattern(new RegExp(stringyNumberRegex)).length(10).required(),
    cellphone: Joi.string()
        .pattern(new RegExp(phoneRegex)).required(),
    birthday: Joi.string()
        .pattern(new RegExp(dateRegex)).length(10).required(),
    postal_code: Joi.string()
        .pattern(new RegExp(stringyNumberRegex)).length(10).required(),
    sheba: Joi.string().pattern(new RegExp(stringyNumberRegex)).required(),
    address: Joi.string().optional(),

});

export { updateUserSchema };