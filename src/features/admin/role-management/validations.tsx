import * as yup from 'yup';

export const roleCreateSchema = yup.object({
    role_name: yup.string().required(),
    is_active: yup.boolean().required(),
    is_admin: yup.boolean().required(),
    routes: yup.array().of(yup.object().shape({
        id: yup.string(),
        label: yup.string(),
        method: yup.string(),
        route: yup.string(),
        is_authorize: yup.bool()
    })).required()
})

