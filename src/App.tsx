import {
   Background,
   BackgroundVariant,
   Controls,
   ReactFlow,
   ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from './store';

function Flow() {
   const nodes = useFlowStore((state) => state.nodes);
   const edges = useFlowStore((state) => state.edges);
   const onNodesChange = useFlowStore((state) => state.onNodesChange);
   const onEdgesChange = useFlowStore((state) => state.onEdgesChange);
   const onConnect = useFlowStore((state) => state.onConnect);
   return (
      <ReactFlow
         fitView
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
      >
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
