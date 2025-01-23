import { useGetRoleQuery, useUpdateRoleMutation } from '@/lib/redux/api/role.api';
import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form';
import { Navigate, useParams } from 'react-router-dom';
import {roleCreateType} from '../types'
import {roleCreateSchema} from '../validations'
import FormCheckbox from '@/components/form/FormCheckbox';
import { Form, FormField } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import RoleRoutesTable from '../components/table/RoleRoutesTable';
import FormAppLabel from '@/components/form/FormLabel';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface RoleUpdateProps {

}

const RoleUpdate: React.FC<RoleUpdateProps> = () => {
    const {id} = useParams();
    const {data, ...roleQueryProps} = useGetRoleQuery(id as string);
    const [updateRole, updateRoleProps] = useUpdateRoleMutation();
    const form = useForm<roleCreateType>({
        resolver: yupResolver(roleCreateSchema),
        defaultValues:{
            role_name: '',
            is_active: true,
            is_admin: false,
            routes:[]
        }
    })
        
    const {fields,update} = useFieldArray({
        control: form.control,
        name:'routes'
    })

    const routes = form.watch('routes');
    
    const handleAuthChange = (index:number,value:boolean) => {
        update(index,{
            ...fields[index],
            id: routes[index].id,
            is_authorize:value
        }); 
    }

    React.useEffect(() => {
        form.reset(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[roleQueryProps.isSuccess])

    const handleSave = async (values: roleCreateType) => {
        await updateRole({
            role_id: id as string,
            ...values
        })
        .unwrap()
        .then(() => {
            toast.success('Update Success!');
        })
    }

    if(roleQueryProps.isLoading) return <>...Loading</>
    if(roleQueryProps.isError) return <Navigate to={'/role'} replace/>

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSave)}>
                <div className='grid grid-cols-5 gap-x-10 gap-y-2'>
                    <div className='flex flex-col gap-3 col-span-1'>
                        <h3>Information</h3>
                        <div className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name='role_name'
                                render={({field}) => (
                                    <FormAppLabel label={'Role Name'} value={field.value} />
                                )}
                            />
                            <FormField
                                control = {form.control}
                                name='is_active'
                                render={({field}) => (
                                    <FormCheckbox label='Is Active?' checked={field.value} onCheckedChange={field.onChange}/>
                                )}
                            />

                            <FormField
                                control = {form.control}
                                name='is_admin'
                                render={({field}) => (
                                    <FormCheckbox label='Is Admin?' checked={field.value} onCheckedChange={field.onChange}/>
                                )}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 col-span-4'>
                        <h3>Routes</h3>
                        <RoleRoutesTable data={routes} handleAuthChange={handleAuthChange}/>
                    </div>
                    <div className='flex justify-end col-span-5'>
                        <Button type='submit' isLoading={updateRoleProps.isLoading}>Submit</Button>
                    </div>
                </div>
                </form>
            </Form>
        </div>
    );
}

export default RoleUpdate