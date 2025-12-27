// outputNode.js - Refactored to use BaseNode

import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    type: 'output',
    title: 'Output',
    fields: [
      {
        name: 'outputName',
        type: 'text',
        label: 'Name',
        default: data?.outputName || id.replace('customOutput-', 'output_'),
      },
      {
        name: 'outputType',
        type: 'select',
        label: 'Type',
        options: ['Text', 'Image'],
        default: data?.outputType || 'Text',
      },
    ],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: `${id}-value`,
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
