import {
   Background,
   BackgroundVariant,
   Controls,
   Panel,
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
   const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
      useFlowStore(
         useShallow((state) => ({
            nodes: state.nodes,
            edges: state.edges,
            onNodesChange: state.onNodesChange,
            onEdgesChange: state.onEdgesChange,
            onConnect: state.onConnect,
            addNode: state.addNode,
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
         <Panel
            position="bottom-center"
            style={{
               display: 'flex',
               gap: '10px',
               padding: '10px',
               background: '#fff',
               borderRadius: '12px',
               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
               border: '1px solid #eee',
               marginBottom: '20px',
            }}
         >
            <button
               style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f4f4f5',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'background 0.2s',
               }}
               onClick={() => addNode('text')}
            >
               + Text Node
            </button>
            <button
               style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f4f4f5',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'background 0.2s',
               }}
               onClick={() => addNode('color')}
            >
               + Color Node
            </button>
            <button
               style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#f4f4f5',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'background 0.2s',
               }}
               onClick={() => addNode('123')}
            >
               + 123 Node
            </button>
         </Panel>
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
