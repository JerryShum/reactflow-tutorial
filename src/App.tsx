import {
   Background,
   BackgroundVariant,
   Controls,
   ReactFlow,
   ReactFlowProvider,
} from '@xyflow/react';
import type { Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import type { AppNode } from './types';

const initialNodes: AppNode[] = [
   {
      id: 'n1',
      position: { x: 0, y: 0 },
      data: { label: 'Node 1', type: 'text' },
   },
   {
      id: 'n2',
      position: { x: 0, y: 100 },
      data: { color: 'blue', type: 'color' },
   },
];

const initialEdges: Edge[] = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

function Flow() {
   return (
      <ReactFlow fitView nodes={initialNodes} edges={initialEdges}>
         <Background variant={BackgroundVariant.Dots} />
         <Controls />
      </ReactFlow>
   );
}

function App() {
   return (
      <>
         <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
               <Flow />
            </div>
         </ReactFlowProvider>
      </>
   );
}

export default App;
