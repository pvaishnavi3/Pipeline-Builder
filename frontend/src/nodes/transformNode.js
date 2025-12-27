// transformNode.js - New node using BaseNode abstraction

import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
    const config = {
        type: 'transform',
        title: 'Transform',
        description: 'Transform/map data',
        fields: [
            {
                name: 'operation',
                type: 'select',
                label: 'Operation',
                options: ['uppercase', 'lowercase', 'trim', 'reverse', 'custom'],
                default: data?.operation || 'uppercase',
            },
            {
                name: 'customCode',
                type: 'textarea',
                label: 'Custom Code',
                default: data?.customCode || '// return transformed value',
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
            },
        ],
    };

    return <BaseNode id={id} data={data} config={config} />;
};
