import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    //TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import type {roleRouteType} from '../../types';
import {Checkbox} from '@/components/ui/checkbox';

interface RoleRoutesTableProps {
    data: roleRouteType;
    handleAuthChange: (index:number, value: boolean ) => void
}

const RoleRoutesTable: React.FC<RoleRoutesTableProps> = (props) => {
    return <Table className='border'>
        <TableHeader>
            <TableRow>
                <TableHead>Route Label</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Authorized?</TableHead>      
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                props.data.map((item,index) => (
                    <TableRow key={index}>
                        <TableCell>{item.label}</TableCell>
                        <TableCell>{item.route}</TableCell>
                        <TableCell>{item.method}</TableCell>
                        <TableCell>
                            <Checkbox
                                name={`routes.${index}.is_authorize`}
                                checked={item.is_authorize}
                                onCheckedChange={value => {
                                    props.handleAuthChange(index,value as boolean)
                                }}
                            />
                        </TableCell>
                    </TableRow>  
                ))
            }
        </TableBody>
    </Table>;
}

export default RoleRoutesTable