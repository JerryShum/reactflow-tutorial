import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { applyEdgeChanges, applyNodeChanges, addEdge } from '@xyflow/react';

import type { Edge } from '@xyflow/react';

import type { NodeStore, AppNode } from './types';

const initialNodes: AppNode[] = [
   {
      id: 'n1',
      position: { x: 0, y: 0 },
      type: 'text',
      data: { label: 'Node 1', type: 'text' },
   },
   {
      id: 'n2',
      position: { x: 0, y: 100 },
      type: 'color',
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

      //@ defining the updateNodeColor function --> called manually within the ColorNode component
      // takes in an ID --> helps find the node that we want to update
      // takes in data --> overwrites the data property of that node (state)
      // map() --> go over all the nodes in the state --> find the one that matches the ID --> change the data to the color
      // map() returns a new list automatically --> you must return node to "input" that node into the new list
      updateNodeColor: (id, data) => {
         set({
            nodes: get().nodes.map((node) => {
               if (node.id === id) {
                  // We found our node! Create a NEW NODE object.
                  // We spread the old node properties, but overwrite the 'data'
                  return {
                     ...node,
                     data: { ...node.data, ...data },
                  } as AppNode;
               }
               return node;
            }),
         });
      },
   })),
);

//@ The ReactFlow Sequence of Events:
// User Action: You drag a node on the screen.
// Event Trigger: React Flow triggers onNodesChange.
// Store Action: Your store receives the changes and uses applyNodeChanges to calculate the new state.
// Zustand set: The store updates.
// Re-render: React Flow (which is subscribed to the store) "sees" the new nodes and redraws the node at its new x, y position.
