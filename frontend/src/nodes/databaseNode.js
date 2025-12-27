// databaseNode.js - New node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const DatabaseNode = ({ id, data }) => {
    const config = {
        type: 'database',
        title: 'Database',
        description: 'Database operations',
        fields: [
            {
                name: 'operation',
                type: 'select',
                label: 'Operation',
                options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
                default: data?.operation || 'SELECT',
            },
            {
                name: 'table',
                type: 'text',
                label: 'Table',
                default: data?.table || 'users',
            },
            {
                name: 'query',
                type: 'textarea',
                label: 'Query',
                default: data?.query || 'SELECT * FROM table',
            },
        ],
        handles: [
            {
                type: 'target',
                position: 'Left',
                id: `${id}-params`,
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-result`,
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
};
