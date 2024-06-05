import './settingsStyle.css'
import Icon from '@mdi/react';
import { mdiMessageTextOutline } from '@mdi/js';

//Nodes Panel has a custom node.
// for now textNode is added with two handles. This can be extended and other types of nodes can be added
// for UI a message icon is added 
export default function NodesPanel() {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    return (
        <>
            <div
              className="dndnode"
              onDragStart={(event) => onDragStart(event, 'textNode')}
              draggable
            >
              <div><Icon path={mdiMessageTextOutline} size={1} /></div>
              <div>Message</div>
          </div>
          </>
      )
}