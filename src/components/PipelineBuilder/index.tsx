
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { LeadSourceNode } from './nodes/LeadSourceNode';
import { VerificationNode } from './nodes/VerificationNode';
import { ActionNode } from './nodes/ActionNode';
import { Sidebar } from './Sidebar';

const nodeTypes = {
  leadSource: LeadSourceNode,
  verification: VerificationNode,
  action: ActionNode,
};

export const PipelineBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if we have data
      if (!type) {
        return;
      }

      const data = JSON.parse(type);

      // get the position of where we dropped the node
      const reactFlowBounds = document.querySelector('.react-flow')?.getBoundingClientRect();
      
      if (reactFlowBounds) {
        const position = {
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        };

        const newNode = {
          id: `${data.type}-${Math.random()}`,
          type: data.type,
          position,
          data: {
            label: data.label,
            ...data,
          },
        };

        setNodes((nds) => nds.concat(newNode));
      }
    },
    [setNodes]
  );

  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
