
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
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { LeadSourceNode } from './nodes/LeadSourceNode';
import { VerificationNode } from './nodes/VerificationNode';
import { ActionNode } from './nodes/ActionNode';
import { ExportNode } from './nodes/ExportNode';
import { Sidebar } from './Sidebar';

const nodeTypes = {
  leadSource: LeadSourceNode,
  verification: VerificationNode,
  action: ActionNode,
  export: ExportNode,
};

const defaultEdgeOptions = {
  markerEnd: {
    type: MarkerType.Arrow,
    width: 20,
    height: 20,
  },
};

const MAX_CONNECTIONS = 4;

export const PipelineBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const sourceConnections = edges.filter(
        edge => edge.source === params.source
      ).length;
      const targetConnections = edges.filter(
        edge => edge.target === params.target
      ).length;

      if (sourceConnections >= MAX_CONNECTIONS || targetConnections >= MAX_CONNECTIONS) {
        console.log('Maximum connections reached for this node');
        return;
      }

      setEdges(eds => addEdge({ ...params, markerEnd: { type: MarkerType.Arrow } }, eds));
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const data = JSON.parse(type);
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
          defaultEdgeOptions={defaultEdgeOptions}
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
