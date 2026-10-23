/**
 * SkillSync - Student Skill Portal System
 * Main Application Logic & Controller
 */

class SkillSyncApp {
    constructor() {
        this.store = window.skillSyncStore;
        this.currentTab = 'dashboard';
        this.activeCategoryFilter = 'all';
        this.activeProjectCategory = 'all';
        this.searchQuery = '';
        this.activeTimeframe = 'all-time';

        this.init();
    }

    init() {
        this.initTheme();
        this.renderIcons();
        this.bindEvents();
        this.renderAll();
        this.checkHashRoute();
    }

    /* --- Theme Management --- */
    initTheme() {
        const savedTheme = localStorage.getItem('skillsync_theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('skillsync_theme', nextTheme);
        this.updateThemeIcon(nextTheme);
        if (this.radarChart) this.radarChart.draw();
        this.showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    }

    updateThemeIcon(theme) {
        const slot = document.getElementById('themeIconSlot');
        if (slot) {
            slot.innerHTML = renderIcon(theme === 'dark' ? 'sun' : 'moon', '', 18);
        }
    }

    /* --- Icons Injection --- */
    renderIcons() {
        // Render Brand Icon
        const brandSlot = document.getElementById('brandIconSlot');
        if (brandSlot) brandSlot.innerHTML = renderIcon('sparkles', '', 22);

        // Inject all data-icon elements
        document.querySelectorAll('[data-icon]').forEach(el => {
            const iconName = el.getAttribute('data-icon');
            if (iconName && (!el.hasChildNodes() || el.classList.contains('nav-icon'))) {
                el.innerHTML = renderIcon(iconName, '', 18);
            }
        });
    }

    /* --- Navigation & Tabs --- */
    switchTab(tabId) {
        if (!tabId) return;
        this.currentTab = tabId;

        // Update active class on nav buttons
        document.querySelectorAll('.nav-link').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        // Update active class on views
        document.querySelectorAll('.page-view').forEach(view => {
            view.classList.toggle('active', view.id === `view-${tabId}`);
        });

        // Hide mobile drawer if open
        const mobileDrawer = document.getElementById('mobileDrawer');
        if (mobileDrawer) mobileDrawer.style.display = 'none';

        // Update browser URL hash without jump
        window.history.replaceState(null, '', `#${tabId}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (tabId === 'dashboard') {
            setTimeout(() => this.initRadar(), 50);
        }
    }

    checkHashRoute() {
        const hash = window.location.hash.replace('#', '');
        if (['dashboard', 'skills', 'projects', 'certifications', 'leaderboard', 'roadmap'].includes(hash)) {
            this.switchTab(hash);
        }
    }

    /* --- Event Bindings --- */
    bindEvents() {
        // Tab Clicks
        document.querySelectorAll('.nav-link').forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Theme Toggle
        const themeBtn = document.getElementById('themeToggleBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Global Search
        const searchInput = document.getElementById('globalSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                // If on dashboard, navigate to skills to show matches if searching
                if (this.currentTab === 'dashboard' && this.searchQuery.length > 1) {
                    this.switchTab('skills');
                }
                this.renderSkillsGrid();
                this.renderProjectsGrid();
            });

            // Keyboard shortcut '/' to search
            document.addEventListener('keydown', (e) => {
                if (e.key === '/' && document.activeElement !== searchInput) {
                    e.preventDefault();
                    searchInput.focus();
                }
            });
        }

        // Profile Menu Toggle
        const profileBtn = document.getElementById('profileDropdownBtn');
        const profileMenu = document.getElementById('profileMenu');
        if (profileBtn && profileMenu) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                profileMenu.classList.toggle('show');
                const notifMenu = document.getElementById('notificationMenu');
                if (notifMenu) notifMenu.classList.remove('show');
            });
        }

        // Notifications Menu Toggle
        const notifBtn = document.getElementById('notificationBtn');
        const notifMenu = document.getElementById('notificationMenu');
        if (notifBtn && notifMenu) {
            notifBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                notifMenu.classList.toggle('show');
                if (profileMenu) profileMenu.classList.remove('show');
            });
        }

        // Close dropdowns on outside click
        document.addEventListener('click', () => {
            if (profileMenu) profileMenu.classList.remove('show');
            if (notifMenu) notifMenu.classList.remove('show');
        });

        // Mobile Menu Button
        const mobileBtn = document.getElementById('mobileMenuBtn');
        const mobileDrawer = document.getElementById('mobileDrawer');
        if (mobileBtn && mobileDrawer) {
            mobileBtn.addEventListener('click', () => {
                const isShown = mobileDrawer.style.display === 'block';
                mobileDrawer.style.display = isShown ? 'none' : 'block';
            });
        }

        // Skill Filters
        const skillPills = document.querySelectorAll('#skillCategoryPills .filter-pill');
        skillPills.forEach(pill => {
            pill.addEventListener('click', () => {
                skillPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.activeCategoryFilter = pill.getAttribute('data-category');
                this.renderSkillsGrid();
            });
        });

        const profFilter = document.getElementById('skillProficiencyFilter');
        if (profFilter) {
            profFilter.addEventListener('change', () => this.renderSkillsGrid());
        }

        const statusFilter = document.getElementById('skillStatusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.renderSkillsGrid());
        }

        // Project Category Filters
        const projPills = document.querySelectorAll('#projectCategoryPills .filter-pill');
        projPills.forEach(pill => {
            pill.addEventListener('click', () => {
                projPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.activeProjectCategory = pill.getAttribute('data-category');
                this.renderProjectsGrid();
            });
        });

        // Leaderboard Time Filters
        const timePills = document.querySelectorAll('#leaderboardTimePills .filter-pill');
        timePills.forEach(pill => {
            pill.addEventListener('click', () => {
                timePills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                this.activeTimeframe = pill.getAttribute('data-time');
                this.renderLeaderboard();
            });
        });
    }

    /* --- Primary Render Orchestrator --- */
    renderAll() {
        this.renderProfile();
        this.renderStats();
        this.renderDashboardActivities();
        this.renderSkillsGrid();
        this.renderProjectsGrid();
        this.renderCertifications();
        this.renderBadges();
        this.renderLeaderboard();
        this.renderRoadmaps();
        this.renderNotifications();
        this.initRadar();
    }

    initRadar() {
        if (window.CompetencyRadarChart && document.getElementById('competencyRadarCanvas')) {
            if (!this.radarChart) {
                this.radarChart = new CompetencyRadarChart('competencyRadarCanvas');
            } else {
                this.radarChart.resize();
                this.radarChart.draw();
            }
        }
    }

    /* --- Profile & Hero Dashboard --- */
    renderProfile() {
        const p = this.store.profile;
        
        // Avatar
        const avatarImg = document.getElementById('navUserAvatar');
        if (avatarImg) avatarImg.src = p.avatar;

        // Banner Elements
        const heroGreeting = document.getElementById('heroGreeting');
        if (heroGreeting) heroGreeting.textContent = `Welcome back, ${p.name.split(' ')[0]}!`;

        const heroTagline = document.getElementById('heroTagline');
        if (heroTagline) heroTagline.textContent = `${p.title} | ${p.tagline}`;

        const heroUni = document.getElementById('heroUniversity');
        if (heroUni) heroUni.textContent = p.institution;

        const heroStreak = document.getElementById('heroStreak');
        if (heroStreak) heroStreak.textContent = `${p.stats.streakDays}-Day Streak`;

        const heroCohort = document.getElementById('heroCohort');
        if (heroCohort) heroCohort.textContent = p.cohort;

        // Links
        const heroLinkedIn = document.getElementById('heroLinkedInLink');
        if (heroLinkedIn) heroLinkedIn.href = p.links.linkedin;

        const heroGithub = document.getElementById('heroGithubLink');
        if (heroGithub) heroGithub.href = p.links.github;

        // Radial Readiness Score Animation
        const scoreText = document.getElementById('radialScoreText');
        if (scoreText) scoreText.textContent = `${p.readinessScore}%`;

        const circle = document.getElementById('radialProgressCircle');
        if (circle) {
            const radius = 48;
            const circumference = 2 * Math.PI * radius; // ~301.59
            const offset = circumference - (p.readinessScore / 100) * circumference;
            circle.style.strokeDasharray = `${circumference}`;
            circle.style.strokeDashoffset = `${offset}`;
        }

        // Readiness Sub-metrics
        const metricTech = document.getElementById('metricTech');
        if (metricTech) metricTech.textContent = `${p.readinessMetrics.technical}%`;
        const barTech = document.getElementById('barTech');
        if (barTech) barTech.style.width = `${p.readinessMetrics.technical}%`;

        const metricPortfolio = document.getElementById('metricPortfolio');
        if (metricPortfolio) metricPortfolio.textContent = `${p.readinessMetrics.portfolio}%`;
        const barPortfolio = document.getElementById('barPortfolio');
        if (barPortfolio) barPortfolio.style.width = `${p.readinessMetrics.portfolio}%`;

        const metricSoft = document.getElementById('metricSoft');
        if (metricSoft) metricSoft.textContent = `${p.readinessMetrics.softSkills}%`;
        const barSoft = document.getElementById('barSoft');
        if (barSoft) barSoft.style.width = `${p.readinessMetrics.softSkills}%`;
    }

    /* --- Quick Stat Widgets --- */
    renderStats() {
        const stats = this.store.profile.stats;
        
        const elVerified = document.getElementById('statVerifiedSkills');
        if (elVerified) elVerified.textContent = stats.skillsVerified;

        const elCourses = document.getElementById('statActiveCourses');
        if (elCourses) elCourses.textContent = stats.activeCourses;

        const elProjects = document.getElementById('statCapstoneProjects');
        if (elProjects) elProjects.textContent = stats.capstoneProjects;

        const elRank = document.getElementById('statGlobalRank');
        if (elRank) elRank.textContent = `#${stats.globalRank}`;
    }

    /* --- Dashboard Activities --- */
    renderDashboardActivities() {
        const container = document.getElementById('dashboardActivityList');
        if (!container) return;

        const activities = this.store.activities.slice(0, 4);
        container.innerHTML = activities.map(act => `
            <div class="activity-item">
                <div class="activity-icon-wrap">
                    ${renderIcon(act.icon || 'sparkles', '', 18)}
                </div>
                <div class="activity-body">
                    <div class="activity-title">${this.escapeHtml(act.title)}</div>
                    <div class="activity-desc">${this.escapeHtml(act.desc)}</div>
                    <div class="activity-time">${act.time}</div>
                </div>
            </div>
        `).join('');
    }

    /* --- Notifications Dropdown --- */
    renderNotifications() {
        const container = document.getElementById('notificationsList');
        if (!container) return;

        const activities = this.store.activities.slice(0, 5);
        container.innerHTML = activities.map(act => `
            <div class="notification-item">
                <div style="color:var(--primary-light); margin-top:2px;">
                    ${renderIcon(act.icon || 'bell', '', 16)}
                </div>
                <div>
                    <div style="font-size:0.82rem; font-weight:600; color:var(--text-primary);">${this.escapeHtml(act.title)}</div>
                    <div style="font-size:0.75rem; color:var(--text-secondary);">${this.escapeHtml(act.desc)}</div>
                    <div style="font-size:0.68rem; color:var(--text-muted); margin-top:2px;">${act.time}</div>
                </div>
            </div>
        `).join('');
    }

    /* --- Skill Matrix View --- */
    renderSkillsGrid() {
        const container = document.getElementById('skillsGridContainer');
        if (!container) return;

        const profFilter = document.getElementById('skillProficiencyFilter')?.value || 'all';
        const statusFilter = document.getElementById('skillStatusFilter')?.value || 'all';

        let filtered = this.store.skills.filter(skill => {
            // Category Filter
            if (this.activeCategoryFilter !== 'all' && skill.category !== this.activeCategoryFilter) {
                return false;
            }
            // Proficiency Filter
            if (profFilter !== 'all' && skill.proficiency !== profFilter) {
                return false;
            }
            // Status Filter
            if (statusFilter !== 'all' && skill.status !== statusFilter) {
                return false;
            }
            // Global Search Filter
            if (this.searchQuery) {
                const matchName = skill.name.toLowerCase().includes(this.searchQuery);
                const matchDesc = skill.description?.toLowerCase().includes(this.searchQuery);
                const matchCat = skill.category.toLowerCase().includes(this.searchQuery);
                if (!matchName && !matchDesc && !matchCat) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <div style="margin-bottom:0.75rem;">${renderIcon('search', '', 36)}</div>
                    <h3>No skills match your active filters</h3>
                    <p style="font-size:0.85rem; margin-top:0.25rem;">Try resetting your search query or filter options.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(skill => {
            const profClass = skill.proficiency.toLowerCase();
            const statusClass = skill.status === 'verified' ? 'verified' : (skill.status === 'in-progress' ? 'in-progress' : 'pending');
            const statusLabel = skill.status === 'verified' ? 'Verified Credential' : (skill.status === 'in-progress' ? 'In Progress' : 'Pending Verification');
            const statusIcon = skill.status === 'verified' ? 'badge-check' : (skill.status === 'in-progress' ? 'clock' : 'shield-check');

            return `
                <div class="skill-card">
                    <div>
                        <div class="skill-header">
                            <div class="skill-title-area">
                                <div class="skill-icon">
                                    ${renderIcon(skill.icon || 'award', '', 20)}
                                </div>
                                <div>
                                    <h3 class="skill-name">${this.escapeHtml(skill.name)}</h3>
                                    <span class="skill-category-tag">${skill.category}</span>
                                </div>
                            </div>
                            <span class="proficiency-tag ${profClass}">${skill.proficiency}</span>
                        </div>

                        <p class="skill-desc">${this.escapeHtml(skill.description || '')}</p>

                        <div class="skill-progress-container">
                            <div class="skill-progress-header">
                                <span>Proficiency Mastery</span>
                                <strong>${skill.progress}%</strong>
                            </div>
                            <div class="skill-progress-bar">
                                <div class="skill-progress-fill" style="width: ${skill.progress}%;"></div>
                            </div>
                        </div>

                        <div class="verification-badge ${statusClass}">
                            ${renderIcon(statusIcon, '', 16)}
                            <span>${this.escapeHtml(skill.verifiedBy || statusLabel)}</span>
                        </div>
                    </div>

                    <div class="skill-card-footer">
                        <div class="endorse-count" title="Endorsed by peers">
                            ${renderIcon('users', '', 14)}
                            <span>${skill.endorsements || 0} Endorsements</span>
                        </div>

                        <div style="display:flex; gap:0.4rem;">
                            <button class="btn-endorse" onclick="window.app.handleEndorseSkill('${skill.id}')" title="Endorse this skill">
                                ${renderIcon('star', '', 13)}
                                <span>+ Endorse</span>
                            </button>
                            ${skill.status !== 'verified' ? `
                                <button class="btn-endorse" onclick="window.app.openVerificationModal('${skill.id}')" style="color:var(--primary-light);" title="Request official verification">
                                    <span>Verify</span>
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /* --- Project Showcase View --- */
    renderProjectsGrid() {
        const container = document.getElementById('projectsGridContainer');
        if (!container) return;

        let filtered = this.store.projects.filter(proj => {
            if (this.activeProjectCategory !== 'all' && proj.category !== this.activeProjectCategory) {
                return false;
            }
            if (this.searchQuery) {
                const matchTitle = proj.title.toLowerCase().includes(this.searchQuery);
                const matchTag = proj.tags.some(t => t.toLowerCase().includes(this.searchQuery));
                const matchDesc = proj.description.toLowerCase().includes(this.searchQuery);
                if (!matchTitle && !matchTag && !matchDesc) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
                    <div style="margin-bottom:0.75rem;">${renderIcon('folder-git', '', 36)}</div>
                    <h3>No projects match your filter</h3>
                    <p style="font-size:0.85rem; margin-top:0.25rem;">Try selecting 'All Projects' or publishing a new capstone.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(proj => {
            const tagsHtml = proj.tags.map(t => `<span class="skill-micro-badge">${this.escapeHtml(t)}</span>`).join('');
            const skillsHtml = (proj.skillsUtilized || []).map(s => `
                <span class="skill-micro-badge" style="color:var(--primary-light); border-color:rgba(99, 102, 241, 0.3);">
                    ${renderIcon('badge-check', '', 12)} ${this.escapeHtml(s)}
                </span>
            `).join('');

            return `
                <div class="project-card">
                    <div class="project-banner" style="background: ${proj.gradient || 'linear-gradient(135deg, #4f46e5, #06b6d4)'};">
                        <span class="project-category-badge">${this.escapeHtml(proj.category)}</span>
                        <button class="project-star-btn" onclick="window.app.handleUpvoteProject('${proj.id}')" title="Star / Upvote Project">
                            ${renderIcon('star', '', 14)}
                            <span id="star-count-${proj.id}">${proj.stars || 0}</span>
                        </button>
                    </div>

                    <div class="project-body">
                        <div>
                            <h3 class="project-title">${this.escapeHtml(proj.title)}</h3>
                            <div class="project-tagline">${this.escapeHtml(proj.tagline || '')}</div>
                        </div>

                        <p class="project-desc">${this.escapeHtml(proj.description)}</p>

                        <div>
                            <div style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:0.35rem;">
                                Tech Stack
                            </div>
                            <div class="project-skills-used">${tagsHtml}</div>
                        </div>

                        ${skillsHtml ? `
                            <div>
                                <div style="font-size:0.72rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:0.35rem;">
                                    Verified Skills Applied
                                </div>
                                <div class="project-skills-used">${skillsHtml}</div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="project-footer">
                        <div class="project-links">
                            ${proj.githubUrl ? `
                                <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View Source on GitHub">
                                    ${renderIcon('github', '', 15)}
                                    <span>Code Repository</span>
                                </a>
                            ` : ''}
                            ${proj.demoUrl ? `
                                <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" style="color:var(--primary-light);" title="Open Live Deployment">
                                    ${renderIcon('arrow-up-right', '', 15)}
                                    <span>Live Sandbox</span>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    /* --- Certifications & Badges View --- */
    renderCertifications() {
        const container = document.getElementById('certsGridContainer');
        if (!container) return;

        const certs = this.store.certifications;
        container.innerHTML = certs.map(cert => `
            <div class="cert-card">
                <div>
                    <div class="cert-header">
                        <div>
                            <h3 class="cert-title">${this.escapeHtml(cert.title)}</h3>
                            <div class="cert-issuer">${this.escapeHtml(cert.issuer)}</div>
                        </div>
                        <div class="cert-icon-wrapper">
                            ${renderIcon(cert.badgeIcon || 'award', '', 24)}
                        </div>
                    </div>

                    <div class="cert-details">
                        <div class="cert-id-row">
                            <span style="color:var(--text-muted);">Credential ID:</span>
                            <span style="display:flex; align-items:center; gap:0.35rem;">
                                <code>${cert.credentialId}</code>
                                <span class="copy-btn" onclick="window.app.copyTextVal('${cert.credentialId}')" title="Copy ID">
                                    ${renderIcon('copy', '', 13)}
                                </span>
                            </span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:4px;">
                            <span style="color:var(--text-muted);">Issued:</span>
                            <strong>${cert.issueDate}</strong>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:2px;">
                            <span style="color:var(--text-muted);">Status:</span>
                            <strong style="color:var(--success);">${cert.expiryDate}</strong>
                        </div>
                    </div>
                </div>

                <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn btn-secondary btn-sm" onclick="window.app.openCertPreview('${cert.id}')">
                        ${renderIcon('shield-check', '', 14)}
                        <span>Verify Record</span>
                    </button>
                    ${cert.verifyUrl ? `
                        <a href="${cert.verifyUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            ${renderIcon('external-link', '', 14)}
                            <span>Official Issuer</span>
                        </a>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderBadges() {
        const container = document.getElementById('badgesGridContainer');
        if (!container) return;

        const badges = this.store.badges;
        container.innerHTML = badges.map(badge => `
            <div class="badge-card">
                <div class="badge-icon-outer" style="background: radial-gradient(circle, ${badge.color}33 0%, ${badge.color}11 100%); border: 2px solid ${badge.color}; color: ${badge.color};">
                    ${renderIcon(badge.icon || 'award', '', 28)}
                </div>
                <div class="badge-rarity">${this.escapeHtml(badge.rarity)}</div>
                <h3 class="badge-title">${this.escapeHtml(badge.title)}</h3>
                <p class="badge-desc">${this.escapeHtml(badge.description)}</p>
                <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.75rem;">Earned: ${badge.earnedDate}</div>
            </div>
        `).join('');
    }

    /* --- Leaderboard & Peers View --- */
    renderLeaderboard() {
        const podiumContainer = document.getElementById('leaderboardPodium');
        const tableBody = document.getElementById('leaderboardTableBody');
        if (!podiumContainer || !tableBody) return;

        const peers = this.store.leaderboard;

        // Top 3 Podium
        const top3 = peers.slice(0, 3);
        const podiumHtml = `
            <!-- 2nd Place -->
            <div class="podium-card second">
                <span class="podium-rank-badge">2</span>
                <img src="${top3[1].avatar}" alt="${top3[1].name}" class="podium-avatar">
                <div class="podium-name">${this.escapeHtml(top3[1].name)}</div>
                <div class="podium-major">${this.escapeHtml(top3[1].major)}</div>
                <div class="podium-score">${top3[1].score.toLocaleString()} <span style="font-size:0.8rem; color:var(--text-muted);">pts</span></div>
                <button class="btn btn-secondary btn-sm" onclick="window.app.openPeerModal('${top3[1].name}')" style="margin-top:0.75rem;">
                    View Profile
                </button>
            </div>

            <!-- 1st Place (Gold) -->
            <div class="podium-card first">
                <span class="podium-rank-badge">${renderIcon('trophy', '', 16)}</span>
                <img src="${top3[0].avatar}" alt="${top3[0].name}" class="podium-avatar">
                <div class="podium-name" style="font-size:1.3rem;">${this.escapeHtml(top3[0].name)}</div>
                <div class="podium-major">${this.escapeHtml(top3[0].major)}</div>
                <div class="podium-score" style="color:#fbbf24;">${top3[0].score.toLocaleString()} <span style="font-size:0.8rem; color:var(--text-muted);">pts</span></div>
                <button class="btn btn-primary btn-sm" onclick="window.app.openPeerModal('${top3[0].name}')" style="margin-top:0.75rem;">
                    View Profile
                </button>
            </div>

            <!-- 3rd Place -->
            <div class="podium-card third">
                <span class="podium-rank-badge">3</span>
                <img src="${top3[2].avatar}" alt="${top3[2].name}" class="podium-avatar">
                <div class="podium-name">${this.escapeHtml(top3[2].name)}</div>
                <div class="podium-major">${this.escapeHtml(top3[2].major)}</div>
                <div class="podium-score">${top3[2].score.toLocaleString()} <span style="font-size:0.8rem; color:var(--text-muted);">pts</span></div>
                <button class="btn btn-secondary btn-sm" onclick="window.app.openPeerModal('${top3[2].name}')" style="margin-top:0.75rem;">
                    View Profile
                </button>
            </div>
        `;
        podiumContainer.innerHTML = podiumHtml;

        // Table Rows
        tableBody.innerHTML = peers.map(peer => `
            <tr class="${peer.isCurrentUser ? 'current-user' : ''}">
                <td style="font-weight: 700; font-family: var(--font-mono); font-size: 1rem; color:${peer.rank <= 3 ? '#fbbf24' : 'inherit'};">
                    #${peer.rank}
                </td>
                <td>
                    <div class="student-col">
                        <img src="${peer.avatar}" alt="${peer.name}">
                        <div>
                            <div class="student-meta-name">${this.escapeHtml(peer.name)}</div>
                            <div class="student-meta-major">${this.escapeHtml(peer.highlightSkill || peer.major)}</div>
                        </div>
                    </div>
                </td>
                <td>${this.escapeHtml(peer.major)}</td>
                <td>
                    <span class="skill-micro-badge" style="color:var(--success); border-color:var(--success-border);">
                        ${renderIcon('badge-check', '', 12)} ${peer.skillsCount} Verified
                    </span>
                </td>
                <td>
                    <span class="skill-micro-badge" style="color:var(--warning); border-color:var(--warning-border);">
                        ${renderIcon('award', '', 12)} ${peer.badgesCount} Badges
                    </span>
                </td>
                <td style="font-family:var(--font-heading); font-weight:700; color:var(--primary-light);">
                    ${peer.score.toLocaleString()}
                </td>
                <td style="text-align: right;">
                    ${peer.isCurrentUser ? `
                        <span class="readiness-badge" style="display:inline-block;">Your Profile</span>
                    ` : `
                        <button class="btn btn-secondary btn-sm" onclick="window.app.openPeerModal('${peer.name}')">
                            <span>Inspect</span>
                        </button>
                    `}
                </td>
            </tr>
        `).join('');
    }

    /* --- Career Roadmaps View --- */
    renderRoadmaps() {
        const container = document.getElementById('roadmapsContainer');
        if (!container) return;

        const roadmaps = this.store.roadmaps;
        container.innerHTML = roadmaps.map(rm => `
            <div class="roadmap-container" style="margin-bottom: 2rem;">
                <div class="roadmap-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
                    <div>
                        <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:700;">${this.escapeHtml(rm.title)}</h2>
                        <span style="font-size:0.85rem; color:var(--text-secondary);">Target: ${this.escapeHtml(rm.targetRole)}</span>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size:0.85rem; font-weight:700; color:var(--primary-light);">${rm.completion}% Track Completed</span>
                        <div class="skill-progress-bar" style="width:160px; height:8px; margin-top:4px;">
                            <div class="skill-progress-fill" style="width: ${rm.completion}%;"></div>
                        </div>
                    </div>
                </div>

                <div class="timeline">
                    ${rm.milestones.map(m => {
                        const isDone = m.status === 'completed';
                        const isCur = m.status === 'in-progress';
                        return `
                            <div class="timeline-step ${m.status}">
                                <div class="step-marker">
                                    ${isDone ? renderIcon('check', '', 16) : (isCur ? renderIcon('flame', '', 16) : renderIcon('clock', '', 16))}
                                </div>
                                <div class="step-content">
                                    <div class="step-date">${m.date} • ${m.status.toUpperCase()}</div>
                                    <h4 class="step-title">${this.escapeHtml(m.title)}</h4>
                                    <p class="step-desc">${this.escapeHtml(m.desc)}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }

    /* --- Modals Handling --- */
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
    }

    // Modal 1: Add Skill
    openAddSkillModal() {
        this.openModal('modalAddSkill');
    }

    handleAddSkill(e) {
        e.preventDefault();
        const name = document.getElementById('newSkillName')?.value;
        const category = document.getElementById('newSkillCategory')?.value;
        const proficiency = document.getElementById('newSkillProficiency')?.value;
        const progress = parseInt(document.getElementById('newSkillProgress')?.value || 80, 10);
        const description = document.getElementById('newSkillDesc')?.value;

        if (!name) return;

        this.store.addSkill({
            name,
            category,
            proficiency,
            progress,
            status: 'verified',
            verifiedBy: 'Self-Assessed & Submitted for Faculty Review',
            description,
            icon: category === 'technical' ? 'code' : (category === 'soft' ? 'users' : 'sparkles')
        });

        this.closeModal('modalAddSkill');
        document.getElementById('formAddSkill')?.reset();
        this.renderAll();
        this.showToast(`Skill '${name}' successfully added!`);
        this.switchTab('skills');
    }

    // Modal 2: Request Verification
    openVerificationModal(preselectedSkillId = null) {
        const select = document.getElementById('verifySkillSelect');
        if (select) {
            select.innerHTML = this.store.skills.map(s => `
                <option value="${s.id}" ${s.id === preselectedSkillId ? 'selected' : ''}>
                    ${s.name} (${s.proficiency} - ${s.status})
                </option>
            `).join('');
        }
        this.openModal('modalVerification');
    }

    handleRequestVerification(e) {
        e.preventDefault();
        const skillId = document.getElementById('verifySkillSelect')?.value;
        const proof = document.getElementById('verifyProof')?.value;
        const method = document.getElementById('verifyAssessorType')?.value;

        if (!skillId) return;

        this.store.requestVerification(skillId, `${method}: ${proof}`);
        this.closeModal('modalVerification');
        document.getElementById('formVerification')?.reset();
        this.renderAll();
        this.showToast("Verification request submitted to Academic Reviewer!");
    }

    // Modal 3: Add Project
    openAddProjectModal() {
        this.openModal('modalAddProject');
    }

    handleAddProject(e) {
        e.preventDefault();
        const title = document.getElementById('projTitle')?.value;
        const tagline = document.getElementById('projTagline')?.value;
        const category = document.getElementById('projCategory')?.value;
        const tagsRaw = document.getElementById('projTags')?.value;
        const githubUrl = document.getElementById('projGithub')?.value;
        const demoUrl = document.getElementById('projDemo')?.value;
        const description = document.getElementById('projDesc')?.value;

        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

        this.store.addProject({
            title,
            tagline,
            category,
            tags,
            skillsUtilized: tags.slice(0, 3),
            githubUrl,
            demoUrl,
            description
        });

        this.closeModal('modalAddProject');
        document.getElementById('formAddProject')?.reset();
        this.renderAll();
        this.showToast(`Project '${title}' published to portfolio!`);
        this.switchTab('projects');
    }

    // Upvote Project
    handleUpvoteProject(projectId) {
        const proj = this.store.upvoteProject(projectId);
        if (proj) {
            const countEl = document.getElementById(`star-count-${projectId}`);
            if (countEl) countEl.textContent = proj.stars;
            this.showToast(`Starred '${proj.title}'! Total: ${proj.stars}`);
        }
    }

    // Endorse Skill
    handleEndorseSkill(skillId) {
        const skill = this.store.endorseSkill(skillId);
        if (skill) {
            this.renderSkillsGrid();
            this.showToast(`Endorsed '${skill.name}'! (${skill.endorsements} endorsements)`);
        }
    }

    // Modal 4: Certificate Preview
    openCertPreview(certId) {
        const cert = this.store.certifications.find(c => c.id === certId);
        if (!cert) return;

        document.getElementById('certPreviewTitle').textContent = cert.title;
        document.getElementById('certPreviewIssuer').textContent = cert.issuer;
        document.getElementById('certPreviewDate').textContent = cert.issueDate;
        document.getElementById('certPreviewId').textContent = cert.credentialId;
        
        const extLink = document.getElementById('certExternalLink');
        if (extLink) extLink.href = cert.verifyUrl || '#';

        this.activePreviewCert = cert;
        this.openModal('modalCertPreview');
    }

    copyCertLink() {
        if (this.activePreviewCert) {
            const link = this.activePreviewCert.verifyUrl || `https://skillsync.edu/verify/${this.activePreviewCert.credentialId}`;
            navigator.clipboard.writeText(link).then(() => {
                this.showToast("Verification URL copied to clipboard!");
            });
        }
    }

    // Modal 5: Claim Certificate
    openClaimCertModal() {
        this.openModal('modalClaimCert');
    }

    handleClaimCert(e) {
        e.preventDefault();
        const title = document.getElementById('claimCertTitle')?.value;
        const issuer = document.getElementById('claimCertIssuer')?.value;
        const credentialId = document.getElementById('claimCertId')?.value;
        const verifyUrl = document.getElementById('claimCertUrl')?.value;

        this.store.addCertification({
            title,
            issuer,
            credentialId,
            verifyUrl,
            issueDate: "October 2026",
            expiryDate: "Lifetime Credential",
            badgeIcon: "award"
        });

        this.closeModal('modalClaimCert');
        document.getElementById('formClaimCert')?.reset();
        this.renderAll();
        this.showToast(`Credential '${title}' verified and recorded!`);
    }

    // Modal 6: Peer Profile Preview
    openPeerModal(peerName) {
        const peer = this.store.leaderboard.find(p => p.name === peerName);
        if (!peer) return;

        const body = document.getElementById('peerProfileBody');
        body.innerHTML = `
            <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.25rem;">
                <img src="${peer.avatar}" alt="${peer.name}" style="width:72px; height:72px; border-radius:50%; border:2px solid var(--primary);">
                <div>
                    <h3 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800;">${this.escapeHtml(peer.name)}</h3>
                    <div style="font-size:0.85rem; color:var(--primary-light); font-weight:600;">${this.escapeHtml(peer.major)} • ${peer.year}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">Campus Rank: #${peer.rank} • ${peer.score.toLocaleString()} points</div>
                </div>
            </div>

            <div style="background:var(--bg-surface-elevated); border-radius:var(--radius-md); padding:1rem; margin-bottom:1.25rem;">
                <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem;">
                    Key Specialization & Focus Area
                </div>
                <div style="font-weight:700; color:var(--text-primary); font-size:1.05rem;">
                    ${this.escapeHtml(peer.highlightSkill)}
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem; font-size:0.85rem;">
                <div style="background:var(--bg-surface-elevated); padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
                    <span style="color:var(--text-muted); display:block; font-size:0.72rem;">Verified Skills</span>
                    <strong style="color:var(--success); font-size:1.1rem;">${peer.skillsCount} Skills</strong>
                </div>
                <div style="background:var(--bg-surface-elevated); padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
                    <span style="color:var(--text-muted); display:block; font-size:0.72rem;">Peer Endorsements</span>
                    <strong style="color:var(--primary-light); font-size:1.1rem;">${peer.endorsements} Endorsed</strong>
                </div>
            </div>

            <div style="display:flex; gap:0.75rem; margin-top:1rem;">
                ${peer.linkedin ? `
                    <a href="${peer.linkedin}" target="_blank" rel="noopener noreferrer" class="btn-social linkedin" style="flex:1; justify-content:center;">
                        ${renderIcon('linkedin', '', 16)} <span>LinkedIn</span>
                    </a>
                ` : ''}
                ${peer.github ? `
                    <a href="${peer.github}" target="_blank" rel="noopener noreferrer" class="btn-social github" style="flex:1; justify-content:center;">
                        ${renderIcon('github', '', 16)} <span>GitHub</span>
                    </a>
                ` : ''}
            </div>
        `;

        const endorseBtn = document.getElementById('endorsePeerActionBtn');
        endorseBtn.onclick = () => {
            this.store.endorsePeer(peer.name);
            this.renderLeaderboard();
            this.showToast(`Endorsed ${peer.name}! Score boosted by +25.`);
            this.closeModal('modalPeerProfile');
        };

        this.openModal('modalPeerProfile');
    }

    // Modal 7: Export & Share Portfolio
    openExportModal() {
        const p = this.store.profile;
        const topSkills = this.store.skills.slice(0, 4).map(s => s.name).join(', ');

        const postText = `🚀 Excited to share my verified Student Skill Portal on #SkillSync!\n\n` +
            `🎓 ${p.title} at ${p.institution}\n` +
            `⚡ Job Readiness: ${p.readinessScore}% | ${p.stats.skillsVerified} Verified Competencies\n` +
            `🛠 Top Skills: ${topSkills}\n` +
            `💻 Check out my open-source projects & verified credentials:\n` +
            `${p.links.linkedin} | ${p.links.github}\n\n` +
            `#ComputerScience #AI #MachineLearning #WebDevelopment #StudentPortfolio`;

        const readmeSnippet = `[![SkillSync Verified](https://img.shields.io/badge/SkillSync-Verified_${p.readinessScore}%25_Job_Ready-6366f1?style=for-the-badge&logo=shield)](${p.links.linkedin})\n` +
            `[![Top Skills](https://img.shields.io/badge/Verified_Skills-${p.stats.skillsVerified}-10b981?style=for-the-badge)](${p.links.github})`;

        document.getElementById('linkedinShareText').value = postText;
        document.getElementById('githubBadgeSnippet').value = readmeSnippet;

        this.openModal('modalExport');
    }

    copyText(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
            navigator.clipboard.writeText(el.value).then(() => {
                this.showToast("Copied snippet to clipboard!");
            });
        }
    }

    copyTextVal(val) {
        navigator.clipboard.writeText(val).then(() => {
            this.showToast(`Copied: ${val}`);
        });
    }

    resetPortalData() {
        if (confirm("Reset portal to default Alex Morgan mock data?")) {
            this.store.resetToDefaults();
            this.renderAll();
            this.showToast("Portal reset to original default state.");
        }
    }

    /* --- Toast System --- */
    showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <span style="color:var(--success); display:flex; align-items:center;">
                ${renderIcon('check-circle', '', 18)}
            </span>
            <span>${this.escapeHtml(message)}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    }

    /* --- Utilities --- */
    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
}

// Bootstrap Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SkillSyncApp();
});
