import type {
   Edge,
   Node,
   OnConnect,
   OnEdgesChange,
   OnNodesChange,
} from '@xyflow/react';

//! Defining out custom types for each custom node --> we are defining each Node's data points
// - The colornode "data" field will only have a "color"
// - The TextNode "data" field will only have a "label"
export type ColorNodeData = {
   color: string;
   type: 'color';
};

//@ defining the actual node type:
// overwriting the data generaic --> also the "type"
export type ColorNode = Node<ColorNodeData, 'color'>;

export type TextNodeData = {
   label: string;
   type: 'text';
};

export type TextNode = Node<TextNodeData, 'text'>;

// ----------------------------------------------------

//! We are creating the Union Type "AppNodeData" --> we pass into the ReactFlow's Node type as a generic
type AppNodeData = ColorNodeData | TextNodeData;

//! Reactflow provides this BASE node type --> contains generic properties like id, position, type
//@ Has a generic (placeholder) for the data property (since it can contain many different forms)
// Using the NODE type as a base --> we can build upon it by passing in APPNODEDATA to fill in the generic --> creating a special node that only uses our specific AppNodeData
export type AppNode = Node<AppNodeData>;

//---------------------------

//# Interface for the zustand store
// creating an interface for our zustand store --> these are the properties / states that it MUST contain
// nodes --> array of app nodes
// edges --> array of edges
export interface NodeStore {
   nodes: AppNode[];
   edges: Edge[];
   // On onNodesChange --> event fired by reactflow --> what we are defining here is that the nodes that change MUST BE AppNodes
   onNodesChange: OnNodesChange<AppNode>;
   onEdgesChange: OnEdgesChange;
   onConnect: OnConnect;
   setNodes: (nodes: AppNode[]) => void;
   setEdges: (edges: Edge[]) => void;
   //@ Adding new function --> this is going to be called manually when we try to update the color
   updateNodeColor: (id: string, data: Partial<AppNodeData>) => void;
}
