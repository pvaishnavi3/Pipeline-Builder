// apiNode.js - New node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
    const config = {
        type: 'api',
        title: 'API',
        description: 'Make HTTP requests',
        fields: [
            {
                name: 'method',
                type: 'select',
                label: 'Method',
                options: ['GET', 'POST', 'PUT', 'DELETE'],
                default: data?.method || 'GET',
            },
            {
                name: 'endpoint',
                type: 'text',
                label: 'Endpoint',
                default: data?.endpoint || 'https://api.example.com',
            },
            {
                name: 'headers',
                type: 'textarea',
                label: 'Headers (JSON)',
                default: data?.headers || '{}',
            },
        ],
        handles: [
            {
                type: 'target',
                position: 'Left',
                id: `${id}-body`,
                style: { top: '40%' },
            },
            {
                type: 'target',
                position: 'Left',
                id: `${id}-params`,
                style: { top: '60%' },
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-response`,
                style: { top: '40%' },
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-error`,
                style: { top: '60%' },
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
};
