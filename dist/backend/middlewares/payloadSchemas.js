import Joi from 'joi';
export const userPayload = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).required(),
});
export const tagPayload = Joi.object({
    user: Joi.any().required(),
    label: Joi.string().alphanum().required(),
    applications: Joi.array().items(Joi.any()),
});
export const appPayload = Joi.object({
    user: Joi.any().required(),
    jobTitle: Joi.string().alphanum().required(),
    companyName: Joi.string().alphanum().required(),
    contractType: Joi.string().alphanum().required(),
    jobLink: Joi.string().alphanum().required(),
    companyLink: Joi.string().alphanum(),
    appType: Joi.string().alphanum().required(),
    location: Joi.string().alphanum().required(),
    contactName: Joi.string().alphanum(),
    coverLetter: Joi.boolean().required,
    status: Joi.number().integer(),
    steps: {
        apply: {
            date: Joi.string(),
            type: Joi.string().alphanum(),
        },
        followUp: {
            date: Joi.string().alphanum(),
            type: Joi.string().alphanum(),
        },
        interview: {
            date: Joi.string().alphanum(),
            type: Joi.string().alphanum(),
        },
        answer: {
            date: Joi.string().alphanum(),
            outcome: Joi.string().alphanum(),
        },
    },
    tags: Joi.array().items(Joi.any()),
});
//# sourceMappingURL=payloadSchemas.js.map