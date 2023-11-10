import Joi from 'joi';
export const userPayload = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
});
export const userEditPayload = Joi.object({
    _id: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8).optional(),
});
export const tagPayload = Joi.array().items({
    label: Joi.string().required(),
    applications: Joi.array().items(Joi.any()),
});
export const appPayload = Joi.object({
    _id: Joi.string().optional(),
    user: Joi.any(),
    jobTitle: Joi.string().required(),
    companyName: Joi.string().required(),
    contractType: Joi.string().required(),
    jobLink: Joi.string().optional().allow(''),
    companyLink: Joi.string().optional().allow(''),
    appType: Joi.string().required(),
    location: Joi.string().required(),
    contactName: Joi.string().optional().allow(''),
    coverLetter: Joi.boolean().required(),
    status: Joi.number().integer(),
    steps: {
        apply: Joi.object({
            date: Joi.string(),
            type: Joi.string(),
        }),
        followUp: Joi.array().items(Joi.object({
            date: Joi.string(),
            type: Joi.string(),
        })),
        interview: Joi.array().items(Joi.object({
            date: Joi.string(),
            type: Joi.string(),
        })),
        answer: Joi.object({
            date: Joi.string(),
            outcome: Joi.string(),
        }),
    },
    tags: Joi.array().items(Joi.any()),
    createdAt: Joi.string().optional(),
    updatedAt: Joi.string().optional(),
    __v: Joi.any().optional(),
});
//# sourceMappingURL=payloadSchemas.js.map