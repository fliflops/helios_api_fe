import FormCheckbox from '@/components/form/FormCheckbox';
import FormInput from '@/components/form/FormInput';
import { Form, FormField } from '@/components/ui/form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import RoleRoutesTable from '../components/table/RoleRoutesTable';
import { useCreateRoleMutation, useGetRoutesQuery } from '@/lib/redux/api/role.api';
import {roleCreateType} from '../types'
import {roleCreateSchema} from '../validations'
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

interface RoleCreateProps {

}




const RoleCreate: React.FC<RoleCreateProps> = () => {
    const {data=[],...routeProps} = useGetRoutesQuery();
    const [createRole, createRoleProps] = useCreateRoleMutation();
    
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
        update(index,{...fields[index],is_authorize:value}); 
    }

    const handleSave = async (values: roleCreateType) => {
        await createRole(values).unwrap().then(() => {
            form.reset({
                role_name: '',
                is_active: true,
                is_admin: false,
                routes:[]
            })
            toast.success('Role Created!')
        })
    }

    React.useEffect(() => {
        form.setValue('routes', data.map((item: typeof routes[number]) => {
            return {
                ...item,
                is_authorize: false
            }
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[routeProps.isSuccess])
    
    return <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSave)}>   
                <div className='grid grid-cols-5 gap-x-10'>
                    <div className='flex flex-col gap-3 col-span-1'>
                        <h3>Information</h3>
                        <div className='flex flex-col gap-3'>
                            <FormField
                                control={form.control}
                                name='role_name'
                                render={({field}) => (
                                    <FormInput {...field} label='Role Name' placeholder='Role Name'/>
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
                        <Button type='submit' isLoading={createRoleProps.isLoading}>Submit</Button>
                    </div>
                </div>
            </form>
        </Form>
    </div>;
}

export default RoleCreate