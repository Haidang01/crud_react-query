import Joi from 'joi'

export const productSchema = Joi.object({
    name: Joi.string().min(3).required(),
    quantity: Joi.number().min(1).required(),
    price: Joi.number().min(1).required(),
    description: Joi.string().required(),
    image: Joi.string().required()
})
