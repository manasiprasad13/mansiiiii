/**
 * ==========================================================================
 * HAPPY RAKSHA BANDHAN — RESPECTED BADE BHAI (TARACHAND BHAI)
 * Crafted with reverence, gratitude & love by Bittu
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initWelcomeModal();
    initFestivePetalsCanvas();
    initAudioEngine();
    initSacredCeremony();
    initBlessingsCards();
    initTiltPhysics();
    initMobileNav();
});

/* ==========================================================================
   1. RESPECTFUL WELCOME MODAL
   ========================================================================== */
function initWelcomeModal() {
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-celebration-btn');
    const heroBlessingBtn = document.getElementById('hero-blessing-btn');

    function revealCelebration() {
        if (welcomeOverlay) {
            welcomeOverlay.classList.add('hidden');
        }
        playAudioSfx('conch');
        fireGoldenConfetti();

        setTimeout(() => {
            fireGoldenConfetti();
        }, 400);
    }

    if (enterBtn) enterBtn.addEventListener('click', revealCelebration);
    if (heroBlessingBtn) heroBlessingBtn.addEventListener('click', () => {
        playAudioSfx('chime');
        fireGoldenConfetti();
    });
}

/* ==========================================================================
   2. FLOATING MARIGOLD PETALS & GOLDEN PARTICLES CANVAS
   ========================================================================== */
function initFestivePetalsCanvas() {
    const canvas = document.getElementById('festive-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalCount = 42;

    const colors = [
        'rgba(251, 191, 36, 0.85)',   // Saffron Gold
        'rgba(217, 119, 6, 0.85)',    // Marigold
        'rgba(185, 28, 28, 0.8)',     // Sacred Red
        'rgba(254, 240, 138, 0.9)'    // Yellow
    ];

    class Petal {
        constructor() {
            this.reset();
            this.y = Math.random() * height;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 1.3 + 0.7;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.isSparkle = Math.random() < 0.25;
            this.oscSpeed = Math.random() * 0.02 + 0.01;
            this.oscOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * this.oscSpeed + this.oscOffset) * 1.1;
            this.rotation += this.rotSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);

            if (this.isSparkle) {
                ctx.fillStyle = '#fef08a';
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillStyle = this.color;
                ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 0.55, Math.PI / 4, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
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
   3. SYNTHESIZED TRADITIONAL MELODY ENGINE
   ========================================================================== */
let audioCtx = null;
let isMelodyActive = false;
let ragaInterval = null;

function initAudioEngine() {
    const audioToggle = document.getElementById('audio-toggle');
    if (!audioToggle) return;

    audioToggle.addEventListener('click', () => {
        if (!isMelodyActive) {
            startVedicMelody();
            audioToggle.classList.add('playing');
            isMelodyActive = true;
        } else {
            stopVedicMelody();
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
            const freqs = [440.00, 554.37, 659.25, 880.00]; // A Major auspicious chord
            freqs.forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now + i * 0.08);
                gain.gain.setValueAtTime(0.12, now + i * 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.45);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.08);
                osc.stop(now + i * 0.08 + 0.45);
            });
        } else if (type === 'conch') {
            // Auspicious conch / shankh chord simulation
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(261.63, now); // Middle C
            osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.6);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.9);
        }
    } catch (e) {}
}

function startVedicMelody() {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Raga Yaman / Bhupali traditional notes (C, D, E, G, A, C)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25];

    ragaInterval = setInterval(() => {
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';

            const freq = scale[Math.floor(Math.random() * scale.length)];
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.07, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.85);
        } catch (e) {}
    }, 480);
}

function stopVedicMelody() {
    if (ragaInterval) {
        clearInterval(ragaInterval);
        ragaInterval = null;
    }
}

/* ==========================================================================
   4. SACRED VIRTUAL RAKHI RITUAL
   ========================================================================== */
function initSacredCeremony() {
    let currentStep = 1;

    const actionBtn = document.getElementById('ceremony-action-btn');
    const btnText = document.getElementById('ceremony-btn-text');
    const statusMsg = document.getElementById('ceremony-status-msg');

    // Thali items
    const sacredFlame = document.getElementById('sacred-flame');
    const aartiHalo = document.getElementById('aarti-halo');
    const tilakMark = document.getElementById('tilak-mark');
    const tiedSutra = document.getElementById('tied-sutra');
    const pranaamBubble = document.getElementById('pranaam-bubble');

    // Step trackers
    const pStep1 = document.getElementById('p-step-1');
    const pStep2 = document.getElementById('p-step-2');
    const pStep3 = document.getElementById('p-step-3');
    const pStep4 = document.getElementById('p-step-4');

    const pLine1 = document.getElementById('p-line-1');
    const pLine2 = document.getElementById('p-line-2');
    const pLine3 = document.getElementById('p-line-3');

    // Clickable thali triggers
    const diyaTrigger = document.getElementById('diya-trigger');
    const tilakTrigger = document.getElementById('tilak-trigger');
    const rakhiTrigger = document.getElementById('rakhi-trigger');
    const sweetsTrigger = document.getElementById('sweets-trigger');

    if (diyaTrigger) diyaTrigger.addEventListener('click', () => { if (currentStep === 1) advanceRitual(); });
    if (tilakTrigger) tilakTrigger.addEventListener('click', () => { if (currentStep === 2) advanceRitual(); });
    if (rakhiTrigger) rakhiTrigger.addEventListener('click', () => { if (currentStep === 3) advanceRitual(); });
    if (sweetsTrigger) sweetsTrigger.addEventListener('click', () => { if (currentStep === 4) advanceRitual(); });

    if (actionBtn) {
        actionBtn.addEventListener('click', advanceRitual);
    }

    function advanceRitual() {
        if (currentStep === 1) {
            // Step 1: Light Diya
            sacredFlame.classList.add('lit');
            aartiHalo.classList.add('active');
            pStep1.classList.remove('active');
            pStep1.classList.add('completed');
            pStep2.classList.add('active');
            pLine1.classList.add('completed');

            statusMsg.textContent = 'चरण 2: आदरणीय बड़े भाई के मस्तक पर शुभ रोली-चंदन एवं अक्षत का तिलक लगाएं।';
            btnText.innerHTML = 'Apply Chandan-Roli Tilak 🔴';
            currentStep = 2;
            playAudioSfx('chime');

        } else if (currentStep === 2) {
            // Step 2: Apply Tilak
            tilakMark.classList.add('applied');
            pStep2.classList.remove('active');
            pStep2.classList.add('completed');
            pStep3.classList.add('active');
            pLine2.classList.add('completed');

            statusMsg.textContent = 'चरण 3: वैदिक मंत्रों के साथ आदरणीय बड़े भाई की कलाई पर पवित्र रक्षा सूत्र (राखी) बांधें।';
            btnText.innerHTML = 'Tie Sacred Raksha Sutra 🪢';
            currentStep = 3;
            playAudioSfx('chime');

        } else if (currentStep === 3) {
            // Step 3: Tie Rakhi
            tiedSutra.classList.add('tied');
            pStep3.classList.remove('active');
            pStep3.classList.add('completed');
            pStep4.classList.add('active');
            pLine3.classList.add('completed');

            statusMsg.textContent = 'चरण 4: बड़े भाई को काजू कतली मिष्ठान खिलाएं एवं सादर चरण स्पर्श कर आशीर्वाद लें।';
            btnText.innerHTML = 'Offer Sweets & Take Blessings 🍬';
            currentStep = 4;
            playAudioSfx('conch');
            fireGoldenConfetti();

        } else if (currentStep === 4) {
            // Step 4: Sweets & Pranaam
            pranaamBubble.classList.add('show');
            pStep4.classList.remove('active');
            pStep4.classList.add('completed');

            statusMsg.innerHTML = '🎉 <strong>रक्षाबंधन का पावन अनुष्ठान पूर्ण हुआ!</strong> ईश्वर बड़े भाई पर सदा कृपा बनाए रखे! 🙏✨';
            btnText.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart Sacred Ceremony';
            currentStep = 5;
            playAudioSfx('conch');
            fireGoldenConfetti();

        } else {
            // Reset
            sacredFlame.classList.remove('lit');
            aartiHalo.classList.remove('active');
            tilakMark.classList.remove('applied');
            tiedSutra.classList.remove('tied');
            pranaamBubble.classList.remove('show');

            [pStep1, pStep2, pStep3, pStep4].forEach(s => s.classList.remove('active', 'completed'));
            [pLine1, pLine2, pLine3].forEach(l => l.classList.remove('completed'));

            pStep1.classList.add('active');
            statusMsg.textContent = 'चरण 1: दीप प्रज्ज्वलित करके आदरणीय बड़े भाई की आरती शुरू करें।';
            btnText.innerHTML = 'Light The Aarti Diya 🪔';
            currentStep = 1;
            playAudioSfx('chime');
        }
    }
}

/* ==========================================================================
   5. AUSPICIOUS BLESSINGS CARDS
   ========================================================================== */
function initBlessingsCards() {
    const cards = document.querySelectorAll('.blessing-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            playAudioSfx('chime');
            fireGoldenConfetti();

            const title = card.querySelector('h3').textContent;
            const status = card.querySelector('.blessing-status');
            if (status) {
                status.textContent = 'Recited with Reverence 🙏';
            }
        });
    });
}

/* ==========================================================================
   6. 3D TILT PHYSICS
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
   7. MOBILE NAVIGATION
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
   8. GOLDEN CONFETTI BURST ENGINE
   ========================================================================== */
function fireGoldenConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#b91c1c', '#1e3a8a', '#ffffff', '#ffd700'];

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
