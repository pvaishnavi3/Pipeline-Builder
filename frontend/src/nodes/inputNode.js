// inputNode.js - Refactored to use BaseNode

import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    type: 'input',
    title: 'Input',
    fields: [
      {
        name: 'inputName',
        type: 'text',
        label: 'Name',
        default: data?.inputName || id.replace('customInput-', 'input_'),
      },
      {
        name: 'inputType',
        type: 'select',
        label: 'Type',
        options: ['Text', 'File'],
        default: data?.inputType || 'Text',
      },
    ],
    handles: [
      {
        type: 'source',
        position: 'Right',
        id: `${id}-value`,
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
