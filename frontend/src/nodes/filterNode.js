// filterNode.js - New node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
    const config = {
        type: 'filter',
        title: 'Filter',
        description: 'Filter data based on conditions',
        fields: [
            {
                name: 'filterField',
                type: 'text',
                label: 'Field',
                default: data?.filterField || 'value',
            },
            {
                name: 'operator',
                type: 'select',
                label: 'Operator',
                options: ['equals', 'contains', 'greater than', 'less than'],
                default: data?.operator || 'equals',
            },
            {
                name: 'filterValue',
                type: 'text',
                label: 'Value',
                default: data?.filterValue || '',
            },
        ],
        handles: [
            {
                type: 'target',
                position: 'Left',
                id: `${id}-input`,
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-output`,
                style: { top: '40%' },
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-filtered`,
                style: { top: '60%' },
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
};
