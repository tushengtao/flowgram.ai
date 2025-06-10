import type { IJsonSchema, IBasicJsonSchema, IFlowValue } from '@flowgram.ai/form-materials';

export type BasicType = IBasicJsonSchema;
export type JsonSchema = IJsonSchema & { default?: IFlowValue };
