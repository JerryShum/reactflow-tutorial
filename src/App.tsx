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
