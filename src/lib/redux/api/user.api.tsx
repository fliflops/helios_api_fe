import {apiSlice} from '../api';

type createUser = {
    username:string;
    role_id: string;
    app_key: string;
}

type updateUser = {
    id: string;
    role_id?: string;
    app_key?: string;
    user_password?: string;
    is_active?: number;
}

type routes = {
    id:string;
    label: string;
    route:string;
    method: string;
    is_authorize:string;
    fk_role_id: string;
}[]

export const {
    useGenerateAppKeyMutation, 
    useCreateUserMutation, 
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useGetRedisSessionQuery,
    useGetAssignedRoutesQuery,
    useKillSessionMutation
} = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generateAppKey: builder.mutation<any, void>({
            query: () => ({
                url: '/user/app-key',
                method:'POST'
            })
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createUser: builder.mutation<any,createUser>({
            query: (args) => ({
                url: '/user',
                method: 'POST',
                body: args
            }),
            invalidatesTags:['Table']
        }),
        updateUser: builder.mutation<void, updateUser>({
            query: ({id,...args}) => ({
                url: '/user/details/'+id,
                method: 'PUT',
                body: args,
            }),
            invalidatesTags:['Table']
        }),
        updatePassword: builder.mutation<void, {old_password: string; new_password: string; username: string}> ({
            query: ({username, ...args}) => ({
                url: '/user/password/'+username,
                method: 'PUT',
                body:args
            }),
            invalidatesTags:['Table']
        }),
        getRedisSession: builder.query<{
            expiry:string;
            isActiveSession:boolean;
        }, void> ({
            query: () => ({
                url: '/user/session',
                method:'GET',
                
            }),
            providesTags:['Session']
        }),
        killSession: builder.mutation<void, void> ({
            query: () => ({
                url:'/user/session',
                method:'DELETE',
                
            }),
            invalidatesTags:['Session']
        }),
        getAssignedRoutes: builder.query<routes,string>({
            query: (role_id) => ({
                url: '/user/routes',
                method:'GET',
                params: {
                    role_id
                }
            })
        })

    })

})