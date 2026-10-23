/**
 * SkillSync - Interactive Skill Assessment & Portfolio Dossier Generator
 * Real-time diagnostic testing, automated academic credentialing, and printable resumes.
 */

const ASSESSMENT_BANKS = {
    'python': {
        skillName: 'Python & Scientific Stack',
        questions: [
            {
                q: "In Python 3.12+, what is the primary architectural advantage of sub-interpreters with per-interpreter GIL?",
                options: [
                    "Eliminates the need for async/await syntax",
                    "Allows true CPU-bound parallelism within a single OS process",
                    "Automatically compiles Python bytecode into machine assembly",
                    "Replaces standard garbage collection with manual malloc"
                ],
                correct: 1,
                explanation: "Per-interpreter GIL enables multi-threaded Python programs to run across multiple CPU cores simultaneously without IPC overhead."
            },
            {
                q: "What does the `yield from` expression do when delegating to a generator?",
                options: [
                    "Blocks the thread until the child generator terminates",
                    "Creates a two-way communication channel passing values and exceptions transparently",
                    "Spawns an asynchronous background thread",
                    "Converts the generator into an immutable tuple"
                ],
                correct: 1,
                explanation: "PEP 380 allows `yield from` to establish a direct pipeline between caller and subgenerator, passing .send() and .throw() calls."
            },
            {
                q: "Which NumPy operation minimizes memory allocation by avoiding array copy?",
                options: [
                    "arr.flatten()",
                    "arr.copy(order='C')",
                    "arr.ravel() or creating an array slice view",
                    "np.append(arr, [1, 2])"
                ],
                correct: 2,
                explanation: "`arr.ravel()` and standard slicing return views into the existing memory buffer whenever possible without allocating new memory."
            }
        ]
    },
    'react': {
        skillName: 'React 19 & Next.js Ecosystem',
        questions: [
            {
                q: "What is the key functional distinction of React Server Components (RSC)?",
                options: [
                    "They execute exclusively on the server and emit zero JavaScript bundle to the browser client",
                    "They replace standard HTML forms with WebSocket streams",
                    "They cannot accept props or render children",
                    "They run in a service worker on client devices"
                ],
                correct: 0,
                explanation: "RSCs execute solely during build or on request on the server, outputting serialized JSX without increasing client JS bundle size."
            },
            {
                q: "In React 19, what does the `use()` hook enable when passed a Promise?",
                options: [
                    "It automatically pauses browser execution with sleep()",
                    "It integrates directly with Suspense, suspending until the Promise resolves",
                    "It transforms the component into a Web Worker",
                    "It replaces standard useEffect for side effects"
                ],
                correct: 1,
                explanation: "`use()` reads the value of a Promise or context directly in render, suspending until the resource becomes available."
            },
            {
                q: "How does `useTransition()` improve perceived UI performance during heavy state updates?",
                options: [
                    "By running state calculations on a remote GPU",
                    "By keeping the interface responsive and non-blocking while rendering in the background",
                    "By disabling all CSS animations",
                    "By automatically memoizing all child component props"
                ],
                correct: 1,
                explanation: "`useTransition()` marks state transitions as non-urgent, allowing user input like typing or clicks to interrupt rendering."
            }
        ]
    },
    'cloud': {
        skillName: 'Cloud Architecture (AWS / GCP)',
        questions: [
            {
                q: "In an AWS VPC, which component is required to allow private subnet instances to reach the public internet for updates without inbound exposure?",
                options: [
                    "Internet Gateway (IGW)",
                    "NAT Gateway configured in a public subnet",
                    "AWS Direct Connect",
                    "Customer Gateway with BGP routing"
                ],
                correct: 1,
                explanation: "A NAT Gateway resides in a public subnet and translates private IP addresses to an Elastic IP for outbound-only traffic."
            },
            {
                q: "What is the primary benefit of multi-stage Docker builds?",
                options: [
                    "Enables containers to run with root privileges safely",
                    "Separates the compilation environment from the final lean runtime container image",
                    "Allows Docker daemon to bypass Linux kernel namespaces",
                    "Automatically scales containers across Kubernetes pods"
                ],
                correct: 1,
                explanation: "Multi-stage builds leave compilers, SDKs, and build cache in intermediate stages, producing minimal production container images."
            },
            {
                q: "Which AWS IAM best practice enforces least privilege for containerized workloads on Amazon ECS/EKS?",
                options: [
                    "Assigning IAM admin credentials directly to EC2 host instances",
                    "Hardcoding AWS secret access keys into container environment variables",
                    "Using IAM Roles for Service Accounts (IRSA) / Task Execution Roles",
                    "Disabling VPC security groups for container ports"
                ],
                correct: 2,
                explanation: "IRSA and ECS Task Roles deliver temporary STS credentials scoped strictly to specific tasks/pods rather than the underlying host."
            }
        ]
    }
};

class SkillAssessmentEngine {
    constructor() {
        this.currentQuiz = null;
        this.currentQuestionIdx = 0;
        this.userAnswers = [];
        this.selectedSkillKey = 'python';
    }

    startAssessment(skillKey = 'python') {
        this.selectedSkillKey = skillKey;
        this.currentQuiz = ASSESSMENT_BANKS[skillKey] || ASSESSMENT_BANKS['python'];
        this.currentQuestionIdx = 0;
        this.userAnswers = [];

        this.renderQuestion();
        window.app.openModal('modalAssessmentQuiz');
    }

    renderQuestion() {
        const quiz = this.currentQuiz;
        const q = quiz.questions[this.currentQuestionIdx];
        const container = document.getElementById('assessmentQuestionBody');
        if (!container) return;

        const totalQ = quiz.questions.length;
        const progressPct = ((this.currentQuestionIdx) / totalQ) * 100;

        container.innerHTML = `
            <div style="margin-bottom:1.25rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; color:var(--text-muted); margin-bottom:0.4rem;">
                    <span>${this.escapeHtml(quiz.skillName)} Assessment</span>
                    <span>Question ${this.currentQuestionIdx + 1} of ${totalQ}</span>
                </div>
                <div class="skill-progress-bar" style="height:6px;">
                    <div class="skill-progress-fill" style="width: ${progressPct}%;"></div>
                </div>
            </div>

            <h3 style="font-family:var(--font-heading); font-size:1.15rem; font-weight:700; margin-bottom:1.25rem; line-height:1.4;">
                ${this.escapeHtml(q.q)}
            </h3>

            <div style="display:flex; flex-direction:column; gap:0.75rem;" id="quizOptionsList">
                ${q.options.map((opt, idx) => `
                    <button class="btn-action" style="text-align:left; justify-content:flex-start; gap:0.75rem; padding:0.9rem 1rem;" 
                            onclick="window.assessmentEngine.selectAnswer(${idx})" id="opt-btn-${idx}">
                        <span style="width:24px; height:24px; border-radius:50%; background:var(--bg-surface-elevated); border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:center; font-size:0.75rem; font-weight:700; flex-shrink:0;">
                            ${String.fromCharCode(65 + idx)}
                        </span>
                        <span style="font-size:0.85rem; line-height:1.4;">${this.escapeHtml(opt)}</span>
                    </button>
                `).join('')}
            </div>
        `;
    }

    selectAnswer(optionIdx) {
        this.userAnswers.push(optionIdx);
        const quiz = this.currentQuiz;

        if (this.currentQuestionIdx + 1 < quiz.questions.length) {
            this.currentQuestionIdx += 1;
            this.renderQuestion();
        } else {
            this.evaluateResults();
        }
    }

    evaluateResults() {
        const quiz = this.currentQuiz;
        let score = 0;
        quiz.questions.forEach((q, idx) => {
            if (this.userAnswers[idx] === q.correct) score++;
        });

        const total = quiz.questions.length;
        const pct = Math.round((score / total) * 100);
        const passed = pct >= 66;

        const container = document.getElementById('assessmentQuestionBody');
        if (!container) return;

        container.innerHTML = `
            <div style="text-align:center; padding:1.5rem 0;">
                <div style="width:72px; height:72px; border-radius:50%; margin:0 auto 1rem; display:flex; align-items:center; justify-content:center; background:${passed ? 'var(--success-bg)' : 'var(--danger-bg)'}; color:${passed ? 'var(--success)' : 'var(--danger)'}; border:2px solid ${passed ? 'var(--success-border)' : 'var(--danger)'};">
                    ${renderIcon(passed ? 'badge-check' : 'shield-check', '', 36)}
                </div>

                <div style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--text-muted); font-weight:700;">
                    Assessment Completed
                </div>
                <h2 style="font-family:var(--font-heading); font-size:1.85rem; font-weight:800; margin:0.35rem 0 0.5rem;">
                    Score: ${score} / ${total} (${pct}%)
                </h2>

                <p style="font-size:0.9rem; color:var(--text-secondary); max-width:440px; margin:0 auto 1.5rem;">
                    ${passed 
                        ? `Congratulations! You satisfied all competency benchmarks for ${quiz.skillName}. Your skill verification status has been elevated on the registry.`
                        : `You scored ${pct}%. Review the recommended documentation and retake the diagnostic assessment at any time.`
                    }
                </p>

                ${passed ? `
                    <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(16, 185, 129, 0.15); border:1px solid rgba(16, 185, 129, 0.35); padding:0.5rem 1rem; border-radius:var(--radius-full); color:var(--success); font-weight:700; font-size:0.85rem;">
                        ${renderIcon('award', '', 18)}
                        <span>Verified Competency Credential Awarded</span>
                    </div>
                ` : ''}
            </div>
        `;

        if (passed) {
            // Find target skill and verify
            const store = window.skillSyncStore;
            const skill = store.skills.find(s => s.name.toLowerCase().includes(this.selectedSkillKey));
            if (skill) {
                skill.status = 'verified';
                skill.verifiedBy = `Standardized Assessment (Score: ${pct}%)`;
                skill.progress = Math.max(skill.progress, pct);
                store.save('skillsync_skills', store.skills);
                store.recalculateStats();
                window.app.renderAll();
                window.app.showToast(`Skill '${skill.name}' verified with score of ${pct}%!`);
            }
        }
    }

    escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
}

window.assessmentEngine = new SkillAssessmentEngine();
