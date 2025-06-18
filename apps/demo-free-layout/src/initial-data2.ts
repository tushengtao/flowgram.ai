import { FlowDocumentJSON } from './typings';

// @ts-ignore
export const initialData: FlowDocumentJSON ={
  "nodes": [
    {
      "id": "start_0",
      "type": "start",
      "meta": {"position": {"x": 218.4375, "y": 380.75}},
      "data": {
        "title": "Start",
        "outputs": {
          "type": "object",
          "properties": {"query": {"type": "string"}},
          "required": []
        }
      }
    },
    {
      "id": "end_0",
      "type": "end",
      "meta": {"position": {"x": 2063.2396361873552, "y": 397.75}},
      "data": {
        "title": "End",
        "inputs": {
          "type": "object",
          "properties": {"result": {"type": "string"}}
        },
        "inputsValues": {
          "result": {"type": "ref", "content": ["human_DlhFJ", "result"]}
        }
      }
    },
    {
      "id": "human_DlhFJ",
      "type": "human",
      "meta": {"position": {"x": 1106.46875, "y": 363.75}},
      "data": {
        "title": "Human_1",
        "inputsValues": {
          "prompt": {"type": "ref", "content": ["llm_I5IaZ", "result"]}
        },
        "inputs": {
          "type": "object",
          "required": [],
          "properties": {"prompt": {"type": "string"}},
        },
        "outputs": {
          "type": "object",
          "properties": {"result": {"type": "string"}},
        }
      }
    },
    {
      "id": "llm_I5IaZ",
      "type": "llm",
      "meta": {"position": {"x": 658.609375, "y": 309.75}},
      "data": {
        "title": "LLM_1",
        "inputsValues": {
          "modelName": {"type": "constant", "content": "deepseek-v3"},
          "temperature": {"type": "constant", "content": 0.9},
          "systemPrompt": {"type": "constant", "content": ""},
          "prompt": {"type": "ref", "content": ["start_0", "query"]}
        },
        "inputs": {
          "type": "object",
          "required": ["modelName", "temperature", "prompt"],
          "properties": {
            "modelName": {"type": "string"},
            "temperature": {"type": "number"},
            "systemPrompt": {"type": "string"},
            "prompt": {"type": "string"}
          }
        },
        "outputs": {
          "type": "object",
          "properties": {"result": {"type": "string"}}
        }
      }
    },
    {
      "id": "condition_9yxQE",
      "type": "condition",
      "meta": {"position": {"x": 1610.1974184520948, "y": 317.25}},
      "data": {
        "title": "Condition",
        "conditions": [
          {
            "value": {
              "left": {
                "type": "ref",
                "content": ["human_DlhFJ", "result"]
              },
              "operator": "eq",
              "right": {"type": "constant", "content": "/redo"}
            },
            "key": "if_cY73E"
          },
          {
            "value": {
              "left": {
                "type": "ref",
                "content": ["human_DlhFJ", "result"]
              },
              "operator": "neq",
              "right": {"type": "constant", "content": "/redo"}
            },
            "key": "if_KwUAu"
          }
        ]
      }
    }
  ],
  "edges": [
    {"sourceNodeID": "start_0", "targetNodeID": "llm_I5IaZ"},
    {
      "sourceNodeID": "condition_9yxQE",
      "targetNodeID": "end_0",
      "sourcePortID": "if_KwUAu"
    },
    {"sourceNodeID": "llm_I5IaZ", "targetNodeID": "human_DlhFJ"},
    {"sourceNodeID": "human_DlhFJ", "targetNodeID": "condition_9yxQE"},
    {
      "sourceNodeID": "condition_9yxQE",
      "targetNodeID": "llm_I5IaZ",
      "sourcePortID": "if_cY73E"
    }
  ]
}