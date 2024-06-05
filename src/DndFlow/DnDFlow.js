import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './TextNode';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Sidebar from './Sidebar';

import './index.css';

const initialNodes = [
  {
    id: '1',
    type: 'textNode',
    data: { label: 'textNode' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = { textNode: TextNode };
let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [variant, setVariant] = useState('dots')
  const [node, setNode] = useState()
  const [editting, setEditting] = useState(false)


  //setEditting true changes the Nodes Panel to Settings Panel
  const onNodeClick = (e, val) => {
    setNode(val)
    setEditting(true)
  }

  //dynamic text message can be seen while tyoing in text area of settings panel. 
  //It gets the value from NodSettingsPanelePanel component and updates the target node using setNodes and updated nodes id
  const handleChange = (evt) => {
    evt.preventDefault()
    const text = evt.target.value
    setNodes(nodes.map(item => {
      return item.id === node.id ? {...item, data: { ...item.data, label:  text}} : item
    }))
  }

  //resets editting to false. We can see the Node panel again
  const removeEditting = () => {
    setEditting(false)
  }

  //checks if there is already an existing source edge of node
  //if it exists then the connection does not happen and edge is not created
  const onConnect = useCallback(
    (params) => {
      const existingEdge = edges.find(edge => edge.source === params.source);
      if (existingEdge) {
        return;
      }
      setEdges((eds) => addEdge({ ...params }, eds));
    },
    [edges]
  );

  //the onDragOver event of reactflow dnd sets the dragged item to move
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //the onDragOver event of reactflow dnd sets the dragged item to move
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      //add new node of type 'textNode'
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      //it adds the newly added node to existing nodes
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  //it checks of there are any nodes with empty target handles
  const saveFlow = () => {
    const invalidNodes = nodes.filter(
      (node) =>
        edges.filter((edge) => edge.source === node.id).length === 0 &&
        edges.filter((edge) => edge.target === node.id).length === 0
    );

    if (invalidNodes.length > 0) {
      toast.error("Cannot Save Flow");
    } else {
      toast.success("Everything is fine");
    }
  };
  

  return (
    <div className="dndflow">
      <ToastContainer />
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={(evt, val) => onNodeClick(evt, val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Background variant={variant}/>
            <Controls />
          </ReactFlow>
        </div>
        {
          //Custom Side bar for 'nodes panel' and 'settings panel
        }
        <Sidebar editting={editting} removeEditting={removeEditting} handleChange={handleChange} saveFlow={saveFlow}/>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
