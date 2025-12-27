// validatorNode.js - New node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const ValidatorNode = ({ id, data }) => {
    const config = {
        type: 'validator',
        title: 'Validator',
        description: 'Validate data against rules',
        fields: [
            {
                name: 'validationType',
                type: 'select',
                label: 'Type',
                options: ['email', 'url', 'number', 'regex', 'custom'],
                default: data?.validationType || 'email',
            },
            {
                name: 'pattern',
                type: 'text',
                label: 'Pattern/Rule',
                default: data?.pattern || '',
            },
            {
                name: 'errorMessage',
                type: 'text',
                label: 'Error Message',
                default: data?.errorMessage || 'Validation failed',
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
                id: `${id}-valid`,
                style: { top: '40%' },
            },
            {
                type: 'source',
                position: 'Right',
                id: `${id}-invalid`,
                style: { top: '60%' },
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
};
