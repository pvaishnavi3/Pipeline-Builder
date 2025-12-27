// llmNode.js - Refactored to use BaseNode

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    type: 'llm',
    title: 'LLM',
    description: 'Large Language Model',
    fields: [],
    handles: [
      {
        type: 'target',
        position: 'Left',
        id: `${id}-system`,
        style: { top: '33%' },
      },
      {
        type: 'target',
        position: 'Left',
        id: `${id}-prompt`,
        style: { top: '67%' },
      },
      {
        type: 'source',
        position: 'Right',
        id: `${id}-response`,
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};
