import {FC, useEffect, useRef, useState} from 'react';

import { WorkflowInputs, WorkflowOutputs } from '@flowgram.ai/runtime-interface';
import { useService } from '@flowgram.ai/free-layout-editor';
import { Button, JsonViewer, SideSheet } from '@douyinfe/semi-ui';
import { IconPlay, IconSpin, IconStop } from '@douyinfe/semi-icons';

import { NodeStatusGroup } from '../node-status-bar/group';
import { WorkflowRuntimeService } from '../../../plugins/runtime-plugin/runtime-service';

interface TestRunSideSheetProps {
  visible: boolean;
  onCancel: () => void;
}

export const TestRunSideSheet: FC<TestRunSideSheetProps> = ({ visible, onCancel }) => {

    const jsonViewerRef = useRef<any>(null);

    const runtimeService = useService(WorkflowRuntimeService);
  const [isRunning, setRunning] = useState(false);
    const initialValue = `{"query":""}`;
    const [error, setError] = useState<string | undefined>();
  const [result, setResult] = useState<
    | {
        inputs: WorkflowInputs;
        outputs: WorkflowOutputs;
      }
    | undefined
  >();

  const onTestRun = async () => {
    if (isRunning) {
      await runtimeService.taskCancel();
      return;
    }
    setResult(undefined);
    setError(undefined);
    setRunning(true);
    try {
        // 通过 ref 获取当前值，而不是通过 state
        const currentValue = jsonViewerRef.current?.getValue() || '{}';
        console.log('测试运行的currentValue', currentValue);
      await runtimeService.taskRun(currentValue);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const onClose = async () => {
    await runtimeService.taskCancel();
    setRunning(false);
    onCancel();
  };

  useEffect(() => {
    const disposer = runtimeService.onTerminated(({ result }) => {
      setRunning(false);
      setResult(result);
    });
    return () => disposer.dispose();
  }, []);

  const renderRunning = (
    <div
      style={{
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <IconSpin spin size="large" />
      <div
        style={{
          fontSize: '18px',
        }}
      >
        Running...
      </div>
    </div>
  );

  const renderForm = (
    <div>
      <div
        style={{
          fontSize: '15px',
          fontWeight: '500',
          marginBottom: '10px',
          color: '#333',
        }}
      >
        Input
      </div>
        <Button onClick={() => jsonViewerRef.current.format()}>格式化</Button>

        <JsonViewer ref={jsonViewerRef} showSearch={false} height={300} value={initialValue}
                  options={{ formatOptions: { tabSize: 4, insertSpaces: true, eol: '\n' } }}
      />
      <div
        style={{
          color: 'red',
          fontSize: '14px',
          marginTop: '30px',
        }}
      >
        {error}
      </div>

      <NodeStatusGroup title="Inputs" data={result?.inputs} optional disableCollapse />
      <NodeStatusGroup title="Outputs" data={result?.outputs} optional disableCollapse />
    </div>
  );

  const renderButton = (
    <Button
      onClick={onTestRun}
      icon={isRunning ? <IconStop size="small" /> : <IconPlay size="small" />}
      style={{
        backgroundColor: isRunning ? 'rgba(87,104,161,0.08)' : 'rgba(0,178,60,1)',
        borderRadius: '8px',
        color: isRunning ? 'rgba(15,21,40,0.82)' : '#fff',
        marginBottom: '16px',
        width: '100%',
        height: '40px',
      }}
    >
      {isRunning ? 'Cancel' : 'Test Run'}
    </Button>
  );

  return (
    <SideSheet
      title="Test Run"
      visible={visible}
      mask={false}
      onCancel={onClose}
      footer={renderButton}
    >
      {isRunning ? renderRunning : renderForm}
    </SideSheet>
  );
};
