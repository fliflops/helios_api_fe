import React from 'react'
import { ColumnDef } from '@tanstack/react-table';
import APITable from '@/components/table/APITable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RoleTableProps {

}

type roleTableType = {
    role_id:string;
    role_name:string;
    is_active:number;
    is_admin: number;
}

const RoleTable: React.FC<RoleTableProps> = () => {
    const navigate = useNavigate();
    
    const columns: ColumnDef<roleTableType>[] = [
        {
            header:'Role Name',
            accessorKey:'role_name'
        },
        {
            header: 'Status',
            accessorKey:'is_active',
            cell: props => props.getValue() === 1 ? 'Active' : 'Inactive'
        },
        {
            header: 'Is Admin',
            accessorKey: 'is_admin',
            cell: props => props.getValue() === 1 ? 'Yes' : 'No'
        },
        {
            header: 'Action',
            cell: props => {
                return <Button size={'sm'} onClick={()=>navigate(props.row.original.role_id)}>Edit</Button>
            }
        }
    ]

    return <>
        <APITable
            columns={columns}
            route='/role'
        />
    </>;
}

export default RoleTable