import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { ColorNode } from '../types';
import { useFlowStore } from '../store';

//@ We are destructuring and getting the data properties from "NodeProps" --> pass in ColorNode --> we get the data properties for colornode
export default function ColorNode({ data, id }: NodeProps<ColorNode>) {
   const updateNodeColor = useFlowStore((state) => state.updateNodeColor);

   return (
      <div
         style={{
            background: `${data.color}`,
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #1a192b',
            fontSize: '12px',
            textAlign: 'center',
         }}
      >
         <Handle type="target" position={Position.Top} />
         <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Node: {data.type}
         </div>
         <div
            style={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               gap: '5px',
            }}
         >
            <input
               type="color"
               defaultValue={data.color}
               style={{ cursor: 'pointer' }}
               onChange={(e) => updateNodeColor(id, { color: e.target.value })}
            />
            <span>{data.color}</span>
         </div>
         <Handle type="source" position={Position.Bottom} />
      </div>
   );
}
