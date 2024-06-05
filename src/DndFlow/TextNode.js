import React from 'react';
import { Handle, Position } from 'reactflow';
import Icon from '@mdi/react';
import { mdiMessageTextOutline } from '@mdi/js';

//This is the default textNode which is used for now other types of nodes can be created as well like this but based on other criteria
const TextNode = ({ data }) => {
    console.log(data.label)
  return (
    <div className="text-node">
        <div className="text-header">
        <div><Icon path={mdiMessageTextOutline} size={0.4} /></div>
           <div>Message</div>
        </div>
            
      <Handle type="target" position={Position.Left} />
      <div className="text-message">{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default TextNode;