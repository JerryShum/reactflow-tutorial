import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';

import type { Edge } from '@xyflow/react';

import type { NodeStore, AppNode } from './types';

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

export const useFlowStore = create<NodeStore>()(
   devtools((set, get) => ({
      nodes: initialNodes,
      edges: initialEdges,

      //! onNodesChange --> this is triggered via any movement or change to a node
      // We know that these MUST be appnodes
      // set --> we are setting a NEW state when any node changes --> we are setting a new "nodes" state and overwriting the old one
      // applyNodeChanges automatically retrieves the changes that happened and APPLIES them to the existing nodes state --> get() retrieves the current state
      onNodesChange: (changes) => {
         set({
            nodes: applyNodeChanges(changes, get().nodes),
         });
      },
      onEdgesChange: (changes) => {
         set({
            edges: applyEdgeChanges(changes, get().edges),
         });
      },
      onConnect: (connection) => {
         set({
            edges: addEdge(connection, get().edges),
         });
      },
      setNodes: (nodes) => {
         set({ nodes });
      },
      setEdges: (edges) => {
         set({ edges });
      },
   })),
);

//@ The ReactFlow Sequence of Events:
// User Action: You drag a node on the screen.
// Event Trigger: React Flow triggers onNodesChange.
// Store Action: Your store receives the changes and uses applyNodeChanges to calculate the new state.
// Zustand set: The store updates.
// Re-render: React Flow (which is subscribed to the store) "sees" the new nodes and redraws the node at its new x, y position.
