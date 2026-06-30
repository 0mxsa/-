/**
 * AETHER GRAPH INTERACTION & PHYSICS ENGINE (VANILLA CORE)
 * Implements continuous multi-body spring layout physics optimization
 */
class AetherGraphEngine {
    constructor(canvasWrapperId, surfaceId, svgPlaneId, nodePlaneId) {
        this.wrapper = document.getElementById(canvasWrapperId);
        this.surface = document.getElementById(surfaceId);
        this.svg = document.getElementById(svgPlaneId);
        this.nodePlane = document.getElementById(nodePlaneId);
        
        // Transform State Matrices
        this.panX = window.innerWidth / 2 - 150;
        this.panY = window.innerHeight / 2;
        this.zoom = 0.85;
        this.isPanning = false;
        this.startX = 0; this.startY = 0;
        
        // Physics Data Infrastructure Maps
        this.nodes = [];
        this.edges = [];
        this.nodeElements = new Map();
        this.edgeElements = new Map();
        
        // Interaction Tracking Registry
        this.draggedNode = null;
        this.selectedNodeId = null;
        
        // Physics Parameters
        this.kRepulsion = 140000;
        this.kAttraction = 0.06;
        this.damping = 0.82;
        this.idealLength = 180;
        
        this.initViewportInteractions();
        this.startPhysicsLoop();
    }

    setData(nodes, edges) {
        this.nodes = nodes.map(n => ({
            ...n,
            x: n.id === 'root' ? 0 : (Math.random() - 0.5) * 600,
            y: n.id === 'root' ? 0 : (n.type === 'personal' ? -200 : 200) + (Math.random() - 0.5) * 300,
            vx: 0, vy: 0
        }));
        this.edges = edges;
        this.renderGraphShell();
    }

    initViewportInteractions() {
        // Drag-to-Pan Event Bindings
        this.wrapper.addEventListener('mousedown', (e) => {
            if (e.target.closest('.life-node')) return;
            this.isPanning = true;
            this.wrapper.classList.add('grabbing');
            this.startX = e.clientX - this.panX;
            this.startY = e.clientY - this.panY;
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isPanning) {
                this.panX = e.clientX - this.startX;
                this.panY = e.clientY - this.startY;
                this.updateTransformMatrix();
            } else if (this.draggedNode) {
                const rect = this.wrapper.getBoundingClientRect();
                // Project pointer coordinates through inversion of current transformation matrix
                this.draggedNode.x = (e.clientX - rect.left - this.panX) / this.zoom;
                this.draggedNode.y = (e.clientY - rect.top - this.panY) / this.zoom;
            }
        });

        window.addEventListener('mouseup', () => {
            this.isPanning = false;
            this.draggedNode = null;
            this.wrapper.classList.remove('grabbing');
        });

        // Wheel Zoom Intercept Layer
        this.wrapper.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomFactor = 1.1;
            const rect = this.wrapper.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Normalize coordinate workspace anchor points before scale update
            const graphMouseX = (mouseX - this.panX) / this.zoom;
            const graphMouseY = (mouseY - this.panY) / this.zoom;

            if (e.deltaY < 0) this.zoom *= zoomFactor;
            else this.zoom /= zoomFactor;

            this.zoom = Math.max(0.2, Math.min(this.zoom, 3.0));
            this.panX = mouseX - graphMouseX * this.zoom;
            this.panY = mouseY - graphMouseY * this.zoom;
            this.updateTransformMatrix();
        }, { passive: false });
    }

    updateTransformMatrix() {
        this.surface.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
        this.syncMinimapViewport();
    }

    renderGraphShell() {
        this.nodePlane.innerHTML = '';
        // Clear all except defs
        const defs = this.svg.querySelector('defs');
        this.svg.innerHTML = '';
        if (defs) this.svg.appendChild(defs);
        
        this.nodeElements.clear();
        this.edgeElements.clear();

        // Edge Construction Pipeline
        this.edges.forEach((edge, idx) => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const isCrit = edge.priority === 'critical';
            path.setAttribute('class', `graph-edge-line ${isCrit ? 'edge-critical' : 'edge-normal'}`);
            path.setAttribute('marker-end', 'url(#arrow)');
            this.svg.appendChild(path);
            this.edgeElements.set(idx, path);
        });

        // Node Fabrication Pipeline
        this.nodes.forEach(node => {
            const div = document.createElement('div');
            let priorityClass = `priority-${node.priority || 'medium'}`;
            div.className = `life-node ${priorityClass} ${node.id === 'root' ? 'node-central-sovereign' : ''}`;
            
            // Render specific internal layouts based on structural types
            if (node.id === 'root') {
                div.innerHTML = `
                    <div class="central-core-layout">
                        <div class="central-avatar-wrapper">
                            <svg class="central-progress-ring"><circle cx="36" cy="36" r="34" stroke="#6366f1" stroke-width="3" fill="transparent" stroke-dasharray="213" stroke-dashoffset="${213 - (213 * node.progress) / 100}" /></svg>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" class="avatar-img" alt="Identity Master Profile">
                        </div>
                        <div>
                            <div class="node-title">${node.label}</div>
                            <div class="node-meta-subtitle">SYSTEM COORDINATOR</div>
                            <div style="font-size:10px; margin-top:4px; color:#10b981;">Focus Efficiency: ${node.metrics.focusScore}%</div>
                        </div>
                    </div>`;
            } else {
                div.innerHTML = `
                    <div class="node-header-group">
                        <span class="node-title">${node.label}</span>
                        <span class="system-badge" style="background:rgba(255,255,255,0.05); color:var(--text-secondary);">${node.progress}%</span>
                    </div>
                    <div class="node-meta-subtitle">${node.role || node.subtitle || ''}</div>
                    <div style="margin-top:8px; height:2px; background:rgba(255,255,255,0.05); border-radius:1px;">
                        <div style="width: ${node.progress}%; height:100%; background:var(--color-${node.priority});"></div>
                    </div>`;
            }

            // Node Interaction Wireframes
            div.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                if(e.button === 0) { // Left click drag deployment
                    this.draggedNode = node;
                }
            });

            div.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectNode(node.id);
            });

            this.nodePlane.appendChild(div);
            this.nodeElements.set(node.id, div);
        });

        this.updateTransformMatrix();
    }

    selectNode(nodeId) {
        if (this.selectedNodeId) {
            const prev = this.nodeElements.get(this.selectedNodeId);
            if (prev) prev.classList.remove('selected-anchor');
        }
        this.selectedNodeId = nodeId;
        const current = this.nodeElements.get(nodeId);
        if (current) current.classList.add('selected-anchor');

        // Dispatch selection message to the master application instance
        window.dispatchEvent(new CustomEvent('nodeSelected', { detail: this.nodes.find(n => n.id === nodeId) }));
    }

    startPhysicsLoop() {
        const loop = () => {
            this.computePhysicsTick();
            this.renderPhysicsPositions();
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    computePhysicsTick() {
        // 1. Repulsion Calculations (All-to-All Matrix)
        for (let i = 0; i < this.nodes.length; i++) {
            let n1 = this.nodes[i];
            for (let j = i + 1; j < this.nodes.length; j++) {
                let n2 = this.nodes[j];
                let dx = n2.x - n1.x;
                let dy = n2.y - n1.y;
                if (dx === 0) dx = 0.1; // Escape division zero singularity
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 450) {
                    let force = this.kRepulsion / (dist * dist);
                    let fx = (dx / dist) * force;
                    let fy = (dy / dist) * force;
                    
                    if (n1.id !== 'root') { n1.vx -= fx; n1.vy -= fy; }
                    if (n2.id !== 'root') { n2.vx += fx; n2.vy += fy; }
                }
            }
        }

        // 2. Attraction Forces across connected topological pathways
        this.edges.forEach(edge => {
            let sourceNode = this.nodes.find(n => n.id === edge.source);
            let targetNode = this.nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return;

            let dx = targetNode.x - sourceNode.x;
            let dy = targetNode.y - sourceNode.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist === 0) dist = 0.1;

            let force = this.kAttraction * (dist - this.idealLength);
            let fx = (dx / dist) * force;
            let fy = (dy / dist) * force;

            if (sourceNode.id !== 'root') { sourceNode.vx += fx; sourceNode.vy += fy; }
            if (targetNode.id !== 'root') { targetNode.vx -= fx; targetNode.vy -= fy; }
        });

        // 3. Directional Gravity and Force Vector Integration
        this.nodes.forEach(node => {
            if (node.id === 'root') return; // Fixed Sovereign Anchor Point

            // Hemisphere Constraints
            if (node.type === 'personal') {
                node.vy += (node.y > -80) ? -0.4 : 0.05; // Soft upward pull
            } else if (node.type === 'collaboration' || node.type === 'shared-goal') {
                node.vy += (node.y < 80) ? 0.4 : -0.05; // Soft downward pull
            }

            // Integration Step
            if (node !== this.draggedNode) {
                node.x += node.vx;
                node.y += node.vy;
                node.vx *= this.damping;
                node.vy *= this.damping;
            } else {
                node.vx = 0; node.vy = 0;
            }
        });
    }

    renderPhysicsPositions() {
        // Position DOM elements using CSS transforms
        this.nodes.forEach(node => {
            const el = this.nodeElements.get(node.id);
            if (el) {
                const width = el.offsetWidth || 200;
                const height = el.offsetHeight || 80;
                // Offset coordinates by half elements box to target actual spatial centers
                el.style.transform = `translate3d(${node.x - width/2}px, ${node.y - height/2}px, 0)`;
            }
        });

        // Recompute SVG curved path trajectories
        this.edges.forEach((edge, idx) => {
            const path = this.edgeElements.get(idx);
            const sNode = this.nodes.find(n => n.id === edge.source);
            const tNode = this.nodes.find(n => n.id === edge.target);
            
            if (path && sNode && tNode) {
                // Generate sleek cubic bezier curves for a premium visual flow
                const midY = (sNode.y + tNode.y) / 2;
                const dStr = `M ${sNode.x} ${sNode.y} C ${sNode.x} ${midY}, ${tNode.x} ${midY}, ${tNode.x} ${tNode.y}`;
                path.setAttribute('d', dStr);
            }
        });
    }

    syncMinimapViewport() {
        const box = document.getElementById('minimap-box');
        if (!box) return;
        // Map window boundaries inversely into the coordinate spaces scaling factor
        const wWidth = window.innerWidth;
        const wHeight = window.innerHeight;
        
        box.style.width = `${Math.max(20, 140 / this.zoom)}px`;
        box.style.height = `${Math.max(20, 110 / this.zoom)}px`;
        box.style.left = `${Math.min(100, Math.max(0, (-this.panX / 25) + 50))}px`;
        box.style.top = `${Math.min(80, Math.max(0, (-this.panY / 25) + 40))}px`;
    }

    recenter() {
        this.panX = window.innerWidth / 2 - 150;
        this.panY = window.innerHeight / 2;
        this.zoom = 0.85;
        this.updateTransformMatrix();
    }
}
