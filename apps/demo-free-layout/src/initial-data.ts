import { FlowDocumentJSON } from './typings';

// @ts-ignore
export const initialData: FlowDocumentJSON = {
  nodes: [
    {
      id: 'start_0',
      type: 'start',
      meta: {
        position: {
          x: 510.4856241246489,
          y: 345.7787756054804,
        },
      },
      data: {
        title: 'Start',
        outputs: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              default: 'Hello Flow.',
              extra: {
                index: 0,
              },
            },
          },
          required: [],
        },
      },
    },
    {
      id: 'llm_8--A3',
      type: 'llm',
      meta: {
        position: {
          x: 1090.154241920847,
          y: 309.75,
        },
      },
      data: {
        title: '大模型',
        inputsValues: {
          modelName: {
            type: 'constant',
            content: 'deepseek-v3',
          },
          temperature: {
            type: 'constant',
            content: 0.8,
          },
          systemPrompt: {
            type: 'constant',
            content: 'You are an AI assistant. Your name is Jack',
          },
          prompt: {
            type: 'ref',
            content: ['start_0', 'query'],
          },
        },
        inputs: {
          type: 'object',
          required: ['modelName', 'apiKey', 'apiHost', 'temperature', 'prompt'],
          properties: {
            modelName: {
              type: 'string',
            },
            temperature: {
              type: 'number',
            },
            systemPrompt: {
              type: 'string',
            },
            prompt: {
              type: 'string',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
    {
      id: 'end_0',
      type: 'end',
      meta: {
        position: {
          x: 1553.5970938160217,
          y: 380.75,
        },
      },
      data: {
        title: 'End',
        inputs: {
          type: 'object',
          properties: {
            result: {
              type: 'string',
            },
          },
        },
      },
    },
  ],
  edges: [
    {
      sourceNodeID: 'start_0',
      targetNodeID: 'llm_8--A3',
    },
    {
      sourceNodeID: 'llm_8--A3',
      targetNodeID: 'end_0',
    },
  ],
};
