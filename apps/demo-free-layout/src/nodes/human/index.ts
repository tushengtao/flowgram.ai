import { nanoid } from 'nanoid';

import { WorkflowNodeType } from '../constants';
import { FlowNodeRegistry } from '../../typings';
import iconLLM from '../../assets/icon-llm.jpg';

let index = 0;
export const HumanNodeRegistry: FlowNodeRegistry = {
  type: WorkflowNodeType.Human,
  info: {
    icon: iconLLM,
    description:
      'Interact with a human user to gather information and provide responses.',
  },
  meta: {
    size: {
      width: 360,
      height: 305,
    },
  },
  onAdd() {
    return {
      id: `human_${nanoid(5)}`,
      type: 'human',
      data: {
        title: `Human_${++index}`,
        inputsValues: {
          prompt: {
            type: 'constant',
            content: '',
          },
        },
        inputs: {
          type: 'object',
          required: [],
          properties: {
            prompt: {
              type: 'string',
            },
          },
        },
        outputs: {
          type: 'object',
          properties: {
            result: { type: 'string' },
          },
        },
      },
    };
  },
};
