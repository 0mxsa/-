/**
 * AETHER INTEGRATED CENTRAL STRATEGIC SYSTEM ENGINE
 * Main operational state manager and context graph AI engine
 */

// 1. Unified Strategic Data Model Layer Configuration Matrix
const STRATEGIC_GRAPH_DATA = {
    nodes: [
        { id: 'root', type: 'identity', label: 'Evelyn Devitt', progress: 74, metrics: { focusScore: 94, weeklyCompletion: 88, streak: 12 } },
        
        // Personal Strategic Sphere (Top Hemisphere Array Nodes)
        { id: 'g-ai', type: 'personal', priority: 'critical', label: 'Master AI Engineering', subtitle: 'Deep Learning & Systems Architecture', progress: 62 },
        { id: 'g-prog', type: 'personal', priority: 'high', label: 'Advanced Rust Core', subtitle: 'Systems Programming proficiency', progress: 45 },
        { id: 'g-health', type: 'personal', priority: 'medium', label: 'Biometric Optimization', subtitle: 'Daily functional vo2max scaling', progress: 80 },
        { id: 'g-fin', type: 'personal', priority: 'high', label: 'Capital Expansion', subtitle: 'Quantitative Asset Management Allocation', progress: 55 },
        
        // Personal Granular Subtasks Pipeline branches
        { id: 'st-ai-1', type: 'personal', priority: 'medium', label: 'Transformer Optimization', subtitle: 'Custom Attention Heads Layer tracking', progress: 90 },
        { id: 'st-ai-2', type: 'personal', priority: 'critical', label: 'LLM Fine-Tuning Execution', subtitle: 'Quantization optimization protocols', progress: 30 },

        // Collaborative Ecosystem (Bottom Hemisphere Array Nodes)
        { id: 'c-john', type: 'collaboration', priority: 'critical', label: 'John Vance', role: 'Technical Co-founder', company: 'Neuralis Systems', progress: 68 },
        { id: 'c-inf', type: 'collaboration', priority: 'medium', label: 'Aria Sterling', role: 'Growth Lead / Influencer', company: 'Aether Nexus Syndicate', progress: 40 },
        
        // Shared Goal Matrix Intersect Nodes
        { id: 'sg-brand', type: 'shared-goal', priority: 'high', label: 'Deploy Neuralis Platform', subtitle: 'Production Infrastructure Engineering Launch', progress: 70 },
        { id: 'sg-growth', type: 'shared-goal', priority: 'medium', label: 'Scale Distribution Funnel', subtitle: '100k Active Node Acquisitions pipeline', progress: 35 }
    ],
    edges: [
        // Personal Map Traces
        { source: 'root', target: 'g-ai', priority: 'critical', relation: 'Core Lifeline Target' },
        { source: 'root', target: 'g-prog', priority: 'normal', relation: 'Prerequisite Dependency' },
        { source: 'root', target: 'g-health', priority: 'normal', relation: 'Operational Support Baseline' },
        { source: 'root', target: 'g-fin', priority: 'normal', relation: 'Strategic Foundation' },
        { source: 'g-ai', target: 'st-ai-1', priority: 'normal', relation: 'Milestone Alpha' },
        { source: 'g-ai', target: 'st-ai-2', priority: 'critical', relation: 'Critical Path Anchor' },

        // Collaboration Map Traces
        { source: 'root', target: 'c-john', priority: 'critical', relation: 'Principal Business Alliance' },
        { source: 'root', target: 'c-inf', priority: 'normal', relation: 'Media Syndicate Connection' },
        
        // Shared Output Node Links
        { source: 'c-john', target: 'sg-brand', priority: 'critical', relation: 'Assigned Principal Executive' },
        { source: 'c-inf', target: 'sg-growth', priority: 'normal', relation: 'Campaign Vector Deployment' }
    ],
    tasksToday: [
        { id: 't1', nodeContext: 'st-ai-2', text: 'Execute LoRA fine-tuning hyperparameters array on H100 partition cluster', priority: 'critical', overdue: true },
        { id: 't2', nodeContext: 'sg-brand', text: 'Audit multi-region Kubernetes ingress security gateways config', priority: 'critical', overdue: false },
        { id: 't3', nodeContext: 'g-health', text: 'High-intensity interval cardio session (Target: 175bpm baseline performance)', priority: 'medium', overdue: false }
    ],
    timelineEvents: [
        { date: 'Q2 - 2026', title: 'Neuralis Prototype Launch', complete: true },
        { date: 'JULY 15', title: 'Rust Cluster Deployment Validation', complete: false },
        { date: 'AUG 01', title: 'Aether Distribution Synchronization Run', complete: false }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Spin up high performance visualization architecture
    const engine = new AetherGraphEngine('viewport-wrapper', 'graph-surface', 'edge-plane', 'node-plane');
    engine.setData(STRATEGIC_GRAPH_DATA.nodes, STRATEGIC_GRAPH_DATA.edges);

    // 2. Instantiate Panel Controllers & Event bindings
    initializeSystemDashboards(STRATEGIC_GRAPH_DATA);
    initializeAICognitionCore(STRATEGIC_GRAPH_DATA);
    initializeUIInteractionListeners(engine);
});

function initializeSystemDashboards(data) {
    // Populate Daily Dashboard Lists
    const critContainer = document.getElementById('critical-task-list');
    const overdueContainer = document.getElementById('overdue-task-list');
    
    critContainer.innerHTML = '';
    overdueContainer.innerHTML = '';

    data.tasksToday.forEach(task => {
        const item = document.createElement('div');
        item.className = `dash-task-item ${task.priority === 'critical' ? 'priority-crit' : ''}`;
        item.innerHTML = `<span>${task.text}</span><span class="system-badge">${task.priority.toUpperCase()}</span>`;
        
        if (task.overdue) {
            overdueContainer.appendChild(item);
        } else {
            critContainer.appendChild(item);
        }
    });

    // Populate Left Sidebar Timeline Elements
    const timelineList = document.getElementById('timeline-list');
    timelineList.innerHTML = '';
    data.timelineEvents.forEach(evt => {
        const div = document.createElement('div');
        div.className = `timeline-node-event ${evt.complete ? 'active-event' : ''}`;
        div.innerHTML = `<div class="timeline-time">${evt.date}</div><div>${evt.title}</div>`;
        timelineList.appendChild(div);
    });
}

function initializeUIInteractionListeners(engine) {
    // Panel Tab Trigger Controls Logic
    document.querySelectorAll('.tab-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-trigger').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            trigger.classList.add('active');
            document.getElementById(`tab-${trigger.dataset.tab}`).classList.add('active');
        });
    });

    // Floating Map Automation Button Assignments
    document.getElementById('zoom-in').addEventListener('click', () => { engine.zoom *= 1.2; engine.updateTransformMatrix(); });
    document.getElementById('zoom-out').addEventListener('click', () => { engine.zoom /= 1.2; engine.updateTransformMatrix(); });
    document.getElementById('reset-view').addEventListener('click', () => engine.recenter());

    // Context Global Inspector Data Receiver Binding
    window.addEventListener('nodeSelected', (e) => {
        const node = e.detail;
        const drawer = document.getElementById('node-inspector');
        const content = document.getElementById('inspector-content');
        
        content.innerHTML = `
            <div style="font-family:var(--font-header); font-size:1.2rem; font-weight:700; margin-bottom:4px;">${node.label}</div>
            <div style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:16px;">System Entity Type: ${node.type.toUpperCase()}</div>
            
            <div class="strip-item" style="margin-bottom:16px;">
                <span class="num">${node.progress}%</span>
                <span class="lbl">Current Node Workspace Progress</span>
            </div>
            
            <div style="display:flex; flex-direction:column; gap:12px; font-size:0.8rem;">
                <div><strong>System Priority Vector:</strong> <span style="color:var(--color-${node.priority})">${node.priority?.toUpperCase() || 'MEDIUM'}</span></div>
                <div><strong>Operational Details:</strong> ${node.subtitle || node.role || 'No descriptors mapped.'}</div>
                ${node.company ? `<div><strong>Corporate Entity:</strong> ${node.company}</div>` : ''}
            </div>
            
            <div style="margin-top:24px; padding-top:16px; border-top:1px solid var(--border-glow)">
                <h4 style="font-family:var(--font-header); font-size:0.75rem; letter-spacing:1px; margin-bottom:12px;">AETHER STRATEGIC AUTOMATION</h4>
                <button class="filter-chip" style="width:100%; text-align:center; padding:10px;" onclick="alert('AI System Event: Optimization sequence initiated for node tracking metrics.')">Optimize Focus Allocation</button>
            </div>
        `;
        drawer.classList.add('open');
    });

    document.getElementById('close-inspector-btn').addEventListener('click', () => {
        document.getElementById('node-inspector').classList.remove('open');
    });

    // Handle Global Escape Hotkey Bindings
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
            e.preventDefault(); engine.recenter();
        }
        if (e.key === '/') {
            if (document.activeElement.id !== 'global-search') {
                e.preventDefault(); document.getElementById('global-search').focus();
            }
        }
    });
}

function initializeAICognitionCore(data) {
    const chatLog = document.getElementById('ai-conversation-log');
    const inputField = document.getElementById('ai-raw-input');
    const sendBtn = document.getElementById('send-ai-btn');

    const executeAISimulatedQuery = (queryType) => {
        let responseText = "";
        
        // Evaluate systemic rules across the data graph schema parameters
        switch(queryType) {
            case 'priority':
                const critTask = data.tasksToday.find(t => t.priority === 'critical');
                responseText = `Highest impact objective path points to **${critTask.text}**. This directly supports your personal growth track node [Master AI Engineering], currently trailing scale expectation thresholds by 8%.`;
                break;
            case 'blocks':
                responseText = `The node **[LLM Fine-Tuning Execution]** is showing velocity degradation. Obstacle signature: dependency constraint on pending parameter quantization arrays validation. Recommend allocating 90 mins blocks off-axis immediately.`;
                break;
            case 'alliances':
                responseText = `Strategic partner **John Vance** is tied to shared milestone **[Deploy Neuralis Platform]** which has an active critical vulnerability flag. Initiate communications check-in to secure infrastructure deployment goals.`;
                break;
            case 'falling-behind':
                const lowNodes = data.nodes.filter(n => n.progress < 50 && n.priority === 'high');
                responseText = `System warning: You have ${lowNodes.length} high-priority targets tracking sub-nominal velocities. Most endangered vector: **[${lowNodes[0]?.label || 'Advanced Rust Core'}]** at ${lowNodes[0]?.progress || 45}% completeness.`;
                break;
            default:
                responseText = "Custom analysis query registered. Graph traversal shows optimal continuity matches across your primary strategic metrics arrays.";
        }

        // Render response block to user interface viewport elements
        const responseDiv = document.createElement('div');
        responseDiv.className = 'ai-msg response';
        responseDiv.innerHTML = responseText;
        chatLog.appendChild(responseDiv);
        chatLog.scrollTop = chatLog.scrollHeight;
    };

    // Attach interactive click tracking to floating query suggestion chips
    document.getElementById('ai-quick-chips').addEventListener('click', (e) => {
        const chip = e.target.closest('.ai-query-chip');
        if (!chip) return;
        
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-msg user';
        userDiv.innerText = chip.innerText;
        chatLog.appendChild(userDiv);
        
        setTimeout(() => executeAISimulatedQuery(chip.dataset.query), 400);
    });

    const triggerManualMessage = () => {
        const text = inputField.value.trim();
        if(!text) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'ai-msg user';
        userDiv.innerText = text;
        chatLog.appendChild(userDiv);
        inputField.value = '';

        setTimeout(() => executeAISimulatedQuery('custom'), 600);
    };

    sendBtn.addEventListener('click', triggerManualMessage);
    inputField.addEventListener('keydown', (e) => { if(e.key === 'Enter') triggerManualMessage(); });
}
