import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { TextNode } from '../types';

export default function TextNode({ data }: NodeProps<TextNode>) {
   return (
      <div
         style={{
            background: '#fff',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #1a192b',
            fontSize: '12px',
            textAlign: 'center',
            minWidth: '150px',
         }}
      >
         <Handle type="target" position={Position.Top} />
         <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            Text Node
         </div>
         <div style={{ padding: '5px 0' }}>{data.label}</div>
         <Handle type="source" position={Position.Bottom} />
      </div>
   );
}
