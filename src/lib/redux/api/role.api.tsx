import {apiSlice} from '../api';
import type {roleCreateType} from '@/features/admin/role-management/types'

export const {useGetRoutesQuery, useCreateRoleMutation, useGetRoleQuery, useUpdateRoleMutation} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRoutes : builder.query<void,void>({
            query: () => ({
                url:'/role/routes',
                method: 'GET'
            })
        }),
        createRole: builder.mutation<void, roleCreateType>({
            query: (args) => ({
                url: '/role',
                method:'POST',
                body: args
            })
        }),
        getRole: builder.query<roleCreateType, string>({
            query: (role_id) => ({
                url:'/role/routes/'+role_id,
                method: 'GET'
            }),
            transformResponse: (result:roleCreateType ) => result
            
        }),
        updateRole: builder.mutation<void,{role_id:string} & roleCreateType>({
            query: (args) => ({
                url:'/role/routes/'+args.role_id,
                method:'PUT',
                body: args
            }) 
        })
    })
})