/**
 * SkillSync - Interactive Canvas Radar / Spider Chart
 * Pure vanilla HTML5 canvas implementation with smooth animations, high-DPI scaling, and dark/light theme support.
 */

class CompetencyRadarChart {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.pillars = [
            { label: "Full-Stack Dev", value: 88, max: 100 },
            { label: "AI & GenAI", value: 89, max: 100 },
            { label: "Cloud & DevOps", value: 87, max: 100 },
            { label: "DSA & Theory", value: 90, max: 100 },
            { label: "Team Leadership", value: 85, max: 100 },
            { label: "Databases & SQL", value: 82, max: 100 }
        ];

        this.animationProgress = 0;
        this.hoveredIndex = -1;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
            this.draw();
        });

        // Mouse hover interaction
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => {
            this.hoveredIndex = -1;
            this.draw();
        });

        this.animateIn();
    }

    resize() {
        if (!this.canvas) return;
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const size = Math.min(rect.width, 360);
        
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;
        this.ctx.scale(dpr, dpr);
        this.displaySize = size;
    }

    animateIn() {
        const start = performance.now();
        const duration = 900;

        const frame = (now) => {
            const elapsed = now - start;
            this.animationProgress = Math.min(1, elapsed / duration);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - this.animationProgress, 3);
            this.draw(ease);

            if (this.animationProgress < 1) {
                requestAnimationFrame(frame);
            }
        };
        requestAnimationFrame(frame);
    }

    draw(progress = 1) {
        if (!this.canvas) return;
        const ctx = this.ctx;
        const size = this.displaySize;
        const center = size / 2;
        const radius = (size / 2) - 45;
        const total = this.pillars.length;
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        ctx.clearRect(0, 0, size, size);

        // 1. Draw Concentric Polygon Grids (20%, 40%, 60%, 80%, 100%)
        const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
        levels.forEach(level => {
            ctx.beginPath();
            for (let i = 0; i < total; i++) {
                const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
                const x = center + Math.cos(angle) * (radius * level);
                const y = center + Math.sin(angle) * (radius * level);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // 2. Draw Radial Axis Lines & Labels
        for (let i = 0; i < total; i++) {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const x = center + Math.cos(angle) * radius;
            const y = center + Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(x, y);
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.08)';
            ctx.stroke();

            // Label text
            const labelDist = radius + 22;
            const lx = center + Math.cos(angle) * labelDist;
            const ly = center + Math.sin(angle) * labelDist;

            ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
            ctx.fillStyle = (this.hoveredIndex === i)
                ? (isDark ? '#818cf8' : '#6366f1')
                : (isDark ? '#94a3b8' : '#475569');
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.pillars[i].label, lx, ly);
        }

        // 3. Draw Data Polygon
        ctx.beginPath();
        const points = [];
        for (let i = 0; i < total; i++) {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const scoreRatio = (this.pillars[i].value / this.pillars[i].max) * progress;
            const px = center + Math.cos(angle) * (radius * scoreRatio);
            const py = center + Math.sin(angle) * (radius * scoreRatio);
            points.push({ x: px, y: py, value: this.pillars[i].value, label: this.pillars[i].label });

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();

        // Gradient Fill
        const gradient = ctx.createRadialGradient(center, center, 10, center, center, radius);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.45)');
        gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.25)');
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0.1)');
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0; // reset shadow

        // 4. Draw Vertex Dots
        points.forEach((pt, idx) => {
            const isHovered = this.hoveredIndex === idx;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, isHovered ? 6 : 4, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? '#38bdf8' : '#ffffff';
            ctx.fill();
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 2;
            ctx.stroke();

            if (isHovered) {
                // Tooltip
                ctx.font = '700 12px Outfit, sans-serif';
                ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
                ctx.fillText(`${pt.value}%`, pt.x, pt.y - 12);
            }
        });
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;

        const size = this.displaySize;
        const center = size / 2;
        const radius = (size / 2) - 45;
        const total = this.pillars.length;

        let closestIdx = -1;
        let minDist = 24; // hit threshold

        for (let i = 0; i < total; i++) {
            const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
            const scoreRatio = (this.pillars[i].value / this.pillars[i].max);
            const px = center + Math.cos(angle) * (radius * scoreRatio);
            const py = center + Math.sin(angle) * (radius * scoreRatio);

            const dist = Math.hypot(mx - px, my - py);
            if (dist < minDist) {
                closestIdx = i;
                minDist = dist;
            }
        }

        if (this.hoveredIndex !== closestIdx) {
            this.hoveredIndex = closestIdx;
            this.draw();
        }
    }
}

window.CompetencyRadarChart = CompetencyRadarChart;
