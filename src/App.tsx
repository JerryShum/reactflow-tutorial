import {
   Background,
   BackgroundVariant,
   Controls,
   ReactFlow,
   ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useFlowStore } from './store';
import ColorNode from './components/ColorNode';
import TextNode from './components/TextNode';
import { useShallow } from 'zustand/shallow';

const nodeTypes = {
   color: ColorNode,
   text: TextNode,
};

function Flow() {
   const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
      useFlowStore(
         useShallow((state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onEdgesChange: state.onEdgesChange,
            onConnect: state.onConnect,
         })),
      );

   return (
      <ReactFlow
         fitView
         nodes={nodes}
         edges={edges}
         onNodesChange={onNodesChange}
         onEdgesChange={onEdgesChange}
         onConnect={onConnect}
         nodeTypes={nodeTypes}
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
