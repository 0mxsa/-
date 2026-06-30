// src/components/Map/LifeMap.tsx
import { useCallback, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from 'reactflow';
import { useStore } from '../../store';
import { CenterNode, PersonalGoalNode, PersonNode, SharedGoalNode } from './CustomNodes';

const nodeTypes = {
  center: CenterNode,
  personalGoal: PersonalGoalNode,
  person: PersonNode,
  sharedGoal: SharedGoalNode,
};

export default function LifeMap() {
  const data = useStore(state => state.data);

  const initialNodes = useMemo(() => {
    const nodes: any[] = [];
    
    // Center
    nodes.push({
      id: 'me',
      type: 'center',
      position: { x: 0, y: 0 },
      data: { label: 'أنا' },
    });

    // Top: Personal Goals
    data.personalGoals.forEach((goal, i) => {
      const xOffset = (i - (data.personalGoals.length - 1) / 2) * 300;
      nodes.push({
        id: goal.id,
        type: 'personalGoal',
        position: { x: xOffset, y: -350 },
        data: goal,
      });
    });

    // Bottom: Persons
    data.people.forEach((person, i) => {
      const xOffset = (i - (data.people.length - 1) / 2) * 400;
      nodes.push({
        id: person.id,
        type: 'person',
        position: { x: xOffset, y: 350 },
        data: person,
      });

      // Bottom-Bottom: Shared Goals
      person.sharedGoals.forEach((sg, j) => {
        nodes.push({
          id: sg.id,
          type: 'sharedGoal',
          position: { x: xOffset, y: 550 + (j * 150) },
          data: sg,
        });
      });
    });

    return nodes;
  }, [data]);

  const initialEdges = useMemo(() => {
    const edges: any[] = [];

    // Edges to Personal Goals
    data.personalGoals.forEach(goal => {
      edges.push({
        id: `e-me-${goal.id}`,
        source: 'me',
        target: goal.id,
        sourceHandle: 'top',
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2, opacity: 0.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
      });
    });

    // Edges to Persons
    data.people.forEach(person => {
      edges.push({
        id: `e-me-${person.id}`,
        source: 'me',
        target: person.id,
        sourceHandle: 'bottom',
        animated: true,
        style: { stroke: '#ffffff', strokeWidth: 2, opacity: 0.3 },
      });

      // Edges from Person to Shared Goals
      person.sharedGoals.forEach(sg => {
        edges.push({
          id: `e-${person.id}-${sg.id}`,
          source: person.id,
          target: sg.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#9ca3af', strokeWidth: 1.5, strokeDasharray: '5,5' },
        });
      });
    });

    return edges;
  }, [data]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-full bg-dark-900 absolute inset-0">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        className="react-flow-custom"
      >
        <Background color="#ffffff" gap={30} size={1} opacity={0.05} />
        <Controls showInteractive={false} className="mb-4 mr-4" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'center') return '#6366f1';
            if (n.type === 'personalGoal') return '#8b5cf6';
            if (n.type === 'person') return '#3b82f6';
            return '#4b5563';
          }}
          maskColor="rgba(10, 10, 15, 0.7)"
        />
      </ReactFlow>
    </div>
  );
}
