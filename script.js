/**
 * ==========================================================================
 * HAPPY RAKSHA BANDHAN — SHIZUKA & SPARSHIKA (PARTH & SPARSH)
 * Designed with endless love, laughter & mischief by Sister Bittu
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initSurpriseReveal();
    initDuoCanvas();
    initAudioEngine();
    initVoteCounter();
    initDualCeremony();
    initBrotherCoupons();
    initTiltPhysics();
    initMobileNav();
});

/* ==========================================================================
   1. SURPRISE UNBOXING REVEAL
   ========================================================================== */
function initSurpriseReveal() {
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const openBtn = document.getElementById('open-duo-surprise-btn');
    const gift1 = document.getElementById('gift-1');
    const gift2 = document.getElementById('gift-2');
    const heroCelebrateBtn = document.getElementById('hero-celebrate-btn');

    function triggerCelebration() {
        if (surpriseOverlay) {
            surpriseOverlay.classList.add('hidden');
        }
        playAudioSfx('fanfare');
        fireDuoConfetti();

        setTimeout(() => {
            fireDuoConfetti();
        }, 400);
    }

    if (openBtn) openBtn.addEventListener('click', triggerCelebration);
    if (gift1) gift1.addEventListener('click', triggerCelebration);
    if (gift2) gift2.addEventListener('click', triggerCelebration);

    if (heroCelebrateBtn) {
        heroCelebrateBtn.addEventListener('click', () => {
            playAudioSfx('chime');
            fireDuoConfetti();
        });
    }
}

/* ==========================================================================
   2. FLOATING DUO PARTICLES & PETALS CANVAS
   ========================================================================== */
function initDuoCanvas() {
    const canvas = document.getElementById('duo-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalCount = 45;

    const colors = [
        'rgba(236, 72, 153, 0.85)',   // Shizuka Pink
        'rgba(6, 182, 212, 0.85)',    // Sparshika Cyan
        'rgba(245, 158, 11, 0.85)',   // Saffron Gold
        'rgba(244, 63, 94, 0.8)'      // Coral Red
    ];

    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 1.4 + 0.8;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.isStar = Math.random() < 0.3;
            this.oscSpeed = Math.random() * 0.02 + 0.01;
            this.oscOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * this.oscSpeed + this.oscOffset) * 1.2;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);

            if (this.isStar) {
                ctx.fillStyle = '#fef08a';
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = this.color;
                ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.55, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   3. SYNTHESIZED UPBEAT FESTIVE AUDIO ENGINE
   ========================================================================== */
let audioCtx = null;
let isMelodyActive = false;
let melodyTimer = null;

function initAudioEngine() {
    const audioToggle = document.getElementById('audio-toggle');
    if (!audioToggle) return;

    audioToggle.addEventListener('click', () => {
        if (!isMelodyActive) {
            startUpbeatMelody();
            audioToggle.classList.add('playing');
            isMelodyActive = true;
        } else {
            stopUpbeatMelody();
            audioToggle.classList.remove('playing');
            isMelodyActive = false;
        }
    });
}

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playAudioSfx(type) {
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (type === 'chime') {
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (Happy Major)
            notes.forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now + i * 0.07);
                gain.gain.setValueAtTime(0.12, now + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.07);
                osc.stop(now + i * 0.07 + 0.35);
            });
        } else if (type === 'stamp') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.2);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'fanfare') {
            const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            chords.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.09);
                gain.gain.setValueAtTime(0.14, now + idx * 0.09);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.6);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.09);
                osc.stop(now + idx * 0.09 + 0.6);
            });
        }
    } catch (e) {}
}

function startUpbeatMelody() {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Upbeat pentatonic happy notes
    const scale = [329.63, 392.00, 440.00, 523.25, 659.25, 783.99];

    melodyTimer = setInterval(() => {
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';

            const freq = scale[Math.floor(Math.random() * scale.length)];
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.6);
        } catch (e) {}
    }, 420);
}

function stopUpbeatMelody() {
    if (melodyTimer) {
        clearInterval(melodyTimer);
        melodyTimer = null;
    }
}

/* ==========================================================================
   4. LIVE FUN VOTE COUNTER (SHIZUKA VS SPARSHIKA)
   ========================================================================== */
function initVoteCounter() {
    const voteShizukaBtn = document.getElementById('vote-shizuka');
    const voteSparshikaBtn = document.getElementById('vote-sparshika');
    const countShizukaElem = document.getElementById('count-shizuka');
    const countSparshikaElem = document.getElementById('count-sparshika');
    const verdictElem = document.getElementById('vote-verdict');

    let countShizuka = 14;
    let countSparshika = 16;

    const verdicts = [
        "Verdict: Shizuka (Parth) wins the Drama Queen award! 👑🎀",
        "Verdict: Sparshika (Sparsh) caught stealing the TV remote again! 📺🌸",
        "Verdict: Both are equally naughty, but Bittu loves them both the most! 🥰",
        "Verdict: Whoever gives Bittu the bigger Rakhi gift wins today! 🛍️💵",
        "Verdict: Double Trouble detected! Mummy called in for emergency arbitration! 🏃‍♂️"
    ];

    if (voteShizukaBtn && countShizukaElem) {
        voteShizukaBtn.addEventListener('click', () => {
            countShizuka++;
            countShizukaElem.textContent = countShizuka;
            playAudioSfx('chime');
            fireDuoConfetti();
            verdictElem.textContent = verdicts[Math.floor(Math.random() * verdicts.length)];
        });
    }

    if (voteSparshikaBtn && countSparshikaElem) {
        voteSparshikaBtn.addEventListener('click', () => {
            countSparshika++;
            countSparshikaElem.textContent = countSparshika;
            playAudioSfx('chime');
            fireDuoConfetti();
            verdictElem.textContent = verdicts[Math.floor(Math.random() * verdicts.length)];
        });
    }
}

/* ==========================================================================
   5. DUAL VIRTUAL RAKHI CEREMONY
   ========================================================================== */
function initDualCeremony() {
    let currentStep = 1;

    const ceremonyBtn = document.getElementById('ceremony-btn');
    const btnLabel = document.getElementById('ceremony-btn-label');
    const statusMsg = document.getElementById('ceremony-status');

    // Thali items
    const flame = document.getElementById('diya-flame');
    const aartiRing = document.getElementById('aarti-ring');
    const tilak1 = document.getElementById('tilak-1');
    const tilak2 = document.getElementById('tilak-2');
    const tag1 = document.getElementById('tag-1');
    const tag2 = document.getElementById('tag-2');
    const bubble1 = document.getElementById('bubble-1');
    const bubble2 = document.getElementById('bubble-2');

    // Step badges
    const step1 = document.getElementById('c-step-1');
    const step2 = document.getElementById('c-step-2');
    const step3 = document.getElementById('c-step-3');
    const step4 = document.getElementById('c-step-4');

    const line1 = document.getElementById('c-line-1');
    const line2 = document.getElementById('c-line-2');
    const line3 = document.getElementById('c-line-3');

    // Clickable nodes
    const diyaNode = document.getElementById('diya-node');
    const roliNode = document.getElementById('roli-node');
    const rakhi1Node = document.getElementById('rakhi-1-node');
    const rakhi2Node = document.getElementById('rakhi-2-node');
    const sweetsNode = document.getElementById('sweets-node');

    if (diyaNode) diyaNode.addEventListener('click', () => { if (currentStep === 1) advanceStep(); });
    if (roliNode) roliNode.addEventListener('click', () => { if (currentStep === 2) advanceStep(); });
    if (rakhi1Node || rakhi2Node) {
        if (rakhi1Node) rakhi1Node.addEventListener('click', () => { if (currentStep === 3) advanceStep(); });
        if (rakhi2Node) rakhi2Node.addEventListener('click', () => { if (currentStep === 3) advanceStep(); });
    }
    if (sweetsNode) sweetsNode.addEventListener('click', () => { if (currentStep === 4) advanceStep(); });

    if (ceremonyBtn) {
        ceremonyBtn.addEventListener('click', advanceStep);
    }

    function advanceStep() {
        if (currentStep === 1) {
            // Step 1: Light Diya
            flame.classList.add('lit');
            aartiRing.classList.add('active');
            step1.classList.remove('active');
            step1.classList.add('completed');
            step2.classList.add('active');
            line1.classList.add('completed');

            statusMsg.textContent = '✨ Aarti Diya is glowing! Step 2: Apply the auspicious double Roli Tilak on Shizuka & Sparshika!';
            btnLabel.innerHTML = 'Apply Double Roli Tilak 🔴🔴';
            currentStep = 2;
            playAudioSfx('chime');

        } else if (currentStep === 2) {
            // Step 2: Double Tilak
            tilak1.classList.add('applied');
            tilak2.classList.add('applied');
            step2.classList.remove('active');
            step2.classList.add('completed');
            step3.classList.add('active');
            line2.classList.add('completed');

            statusMsg.textContent = '🌸 Auspicious Tilaks applied! Step 3: Tie the Pink Rakhi to Shizuka and Cyan Rakhi to Sparshika!';
            btnLabel.innerHTML = 'Tie Two Sacred Rakhis 🎀🌸';
            currentStep = 3;
            playAudioSfx('chime');

        } else if (currentStep === 3) {
            // Step 3: Tie Two Rakhis
            tag1.classList.add('tied');
            tag2.classList.add('tied');
            step3.classList.remove('active');
            step3.classList.add('completed');
            step4.classList.add('active');
            line3.classList.add('completed');

            statusMsg.textContent = '💖 Both Rakhis successfully tied! Step 4: Feed Kaju Katli sweet to both boys!';
            btnLabel.innerHTML = 'Feed Kaju Katli Sweets 🍬🍬';
            currentStep = 4;
            playAudioSfx('fanfare');
            fireDuoConfetti();

        } else if (currentStep === 4) {
            // Step 4: Feed Sweets
            bubble1.classList.add('show');
            bubble2.classList.add('show');
            step4.classList.remove('active');
            step4.classList.add('completed');

            statusMsg.innerHTML = '🎉 <strong>Double Raksha Bandhan Ceremony Completed!</strong> God bless Shizuka & Sparshika with endless happiness! 🌸✨';
            btnLabel.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart Dual Ceremony';
            currentStep = 5;
            playAudioSfx('fanfare');
            fireDuoConfetti();

        } else {
            // Reset
            flame.classList.remove('lit');
            aartiRing.classList.remove('active');
            tilak1.classList.remove('applied');
            tilak2.classList.remove('applied');
            tag1.classList.remove('tied');
            tag2.classList.remove('tied');
            bubble1.classList.remove('show');
            bubble2.classList.remove('show');

            [step1, step2, step3, step4].forEach(s => s.classList.remove('active', 'completed'));
            [line1, line2, line3].forEach(l => l.classList.remove('completed'));

            step1.classList.add('active');
            statusMsg.textContent = 'Step 1: Tap below to light the festive Aarti Diya!';
            btnLabel.innerHTML = 'Light The Aarti Diya 🪔';
            currentStep = 1;
            playAudioSfx('chime');
        }
    }
}

/* ==========================================================================
   6. BROTHER COUPON REDEEM SYSTEM
   ========================================================================== */
function initBrotherCoupons() {
    const couponBtns = document.querySelectorAll('.coupon-btn');

    couponBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = btn.getAttribute('data-id');
            const stamp = document.getElementById(`stamp-badge-${id}`);

            if (stamp) {
                stamp.classList.add('active');
                btn.disabled = true;
                btn.textContent = 'Claimed!';
                playAudioSfx('stamp');
                fireDuoConfetti();
            }
        });
    });
}

/* ==========================================================================
   7. 3D TILT PHYSICS
   ========================================================================== */
function initTiltPhysics() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   8. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('open');
            playAudioSfx('chime');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }
}

/* ==========================================================================
   9. DUAL CONFETTI BURST ENGINE
   ========================================================================== */
function fireDuoConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#ec4899', '#f472b6', '#06b6d4', '#67e8f9', '#f59e0b', '#fbbf24', '#ffffff'];

    for (let i = 0; i < 110; i++) {
        confettiPieces.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 9 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.5) * 18 - 5,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 12,
            opacity: 1
        });
    }

    function renderConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let activeCount = 0;

        confettiPieces.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.32; // gravity
            p.vx *= 0.98;
            p.rotation += p.rotSpeed;
            p.opacity -= 0.012;

            if (p.opacity > 0) {
                activeCount++;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        });

        if (activeCount > 0) {
            requestAnimationFrame(renderConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    renderConfetti();
}
