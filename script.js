/**
 * ==========================================================================
 * HAPPY RAKSHA BANDHAN — BHURIYAAA CELEBRATION ENGINE
 * Designed with love by Bittu for Ansh (Bhuriya)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initSurpriseUnboxing();
    initFestiveParticlesCanvas();
    initAudioEngine();
    initVirtualRakhiCeremony();
    initBrotherCoupons();
    initShagunCalculator();
    initTiltPhysics();
    initMobileNav();
});

/* ==========================================================================
   1. SURPRISE UNBOXING REVEAL
   ========================================================================== */
function initSurpriseUnboxing() {
    const surpriseOverlay = document.getElementById('surprise-overlay');
    const openSurpriseBtn = document.getElementById('open-surprise-btn');
    const giftBoxTrigger = document.getElementById('gift-box-trigger');
    const heroCelebrateBtn = document.getElementById('hero-celebrate-btn');

    function triggerCelebration() {
        if (surpriseOverlay) {
            surpriseOverlay.classList.add('hidden');
        }
        playAudioSfx('fanfare');
        fireConfettiBurst();

        // Extra burst after 400ms for grand effect
        setTimeout(() => {
            fireConfettiBurst();
        }, 400);
    }

    if (openSurpriseBtn) openSurpriseBtn.addEventListener('click', triggerCelebration);
    if (giftBoxTrigger) giftBoxTrigger.addEventListener('click', triggerCelebration);
    if (heroCelebrateBtn) heroCelebrateBtn.addEventListener('click', () => {
        playAudioSfx('chime');
        fireConfettiBurst();
    });
}

/* ==========================================================================
   2. FLOATING MARIGOLD PETALS & GOLDEN SPARKLES CANVAS
   ========================================================================== */
function initFestiveParticlesCanvas() {
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
    const petalCount = 45;

    // Petal types: Marigold Yellow, Saffron Orange, Rose Pink, Gold Sparkle
    const colors = [
        'rgba(251, 191, 36, 0.85)',   // Gold
        'rgba(245, 158, 11, 0.85)',   // Saffron
        'rgba(244, 63, 94, 0.8)',     // Rose Red
        'rgba(236, 72, 153, 0.8)'     // Lotus Pink
    ];

    class Petal {
        constructor() {
            this.reset();
            this.y = Math.random() * height; // initial random distribution
        }

        reset() {
            this.x = Math.random() * width;
            this.y = -20;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.5 + 0.8;
            this.speedX = Math.sin(Math.random() * Math.PI) * 0.8;
            this.rotation = Math.random() * 360;
            this.rotSpeed = (Math.random() - 0.5) * 2;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.isSparkle = Math.random() < 0.25;
            this.oscillationSpeed = Math.random() * 0.02 + 0.01;
            this.oscillationOffset = Math.random() * Math.PI * 2;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * this.oscillationSpeed + this.oscillationOffset) * 1.2;
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
                // Draw 4-point star sparkle
                ctx.fillStyle = '#fde047';
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw curved flower petal
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
   3. SYNTHESIZED FESTIVE AUDIO ENGINE (WEB AUDIO API)
   ========================================================================== */
let audioCtx = null;
let isAudioPlaying = false;
let melodyInterval = null;

function initAudioEngine() {
    const audioToggle = document.getElementById('audio-toggle');
    if (!audioToggle) return;

    audioToggle.addEventListener('click', () => {
        if (!isAudioPlaying) {
            startFestiveMelody();
            audioToggle.classList.add('playing');
            isAudioPlaying = true;
        } else {
            stopFestiveMelody();
            audioToggle.classList.remove('playing');
            isAudioPlaying = false;
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
            const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
            freqs.forEach((f, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(f, now + i * 0.07);
                gain.gain.setValueAtTime(0.12, now + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.4);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + i * 0.07);
                osc.stop(now + i * 0.07 + 0.4);
            });
        } else if (type === 'stamp') {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(160, now);
            osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'fanfare') {
            const chords = [523.25, 659.25, 783.99, 1046.50];
            chords.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + idx * 0.1);
                gain.gain.setValueAtTime(0.15, now + idx * 0.1);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.1 + 0.8);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now + idx * 0.1);
                osc.stop(now + idx * 0.1 + 0.8);
            });
        }
    } catch (e) {
        // Audio policy
    }
}

function startFestiveMelody() {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Raga/Indian festive scale notes (Sa Re Ga Pa Dha Sa: C, D, E, G, A, C)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    let noteIndex = 0;

    melodyInterval = setInterval(() => {
        try {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';

            const freq = scale[Math.floor(Math.random() * scale.length)];
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 0.7);

            noteIndex++;
        } catch (e) {}
    }, 450);
}

function stopFestiveMelody() {
    if (melodyInterval) {
        clearInterval(melodyInterval);
        melodyInterval = null;
    }
}

/* ==========================================================================
   4. INTERACTIVE 4-STEP VIRTUAL RAKHI CEREMONY
   ========================================================================== */
function initVirtualRakhiCeremony() {
    let currentStep = 1;

    const ritualBtn = document.getElementById('ritual-step-btn');
    const ritualBtnText = document.getElementById('ritual-btn-text');
    const statusMsg = document.getElementById('ritual-status-msg');

    // Thali items
    const diyaFlame = document.getElementById('diya-flame');
    const aartiCircle = document.getElementById('aarti-circle');
    const tilakMark = document.getElementById('tilak-mark');
    const tiedRakhi = document.getElementById('tied-rakhi');
    const sweetEffect = document.getElementById('sweet-eating-effect');

    // Step indicators
    const step1 = document.getElementById('step-ind-1');
    const step2 = document.getElementById('step-ind-2');
    const step3 = document.getElementById('step-ind-3');
    const step4 = document.getElementById('step-ind-4');

    const conn1 = document.getElementById('conn-1');
    const conn2 = document.getElementById('conn-2');
    const conn3 = document.getElementById('conn-3');

    // Thali Clickable item triggers
    const diyaItem = document.getElementById('diya-item');
    const roliItem = document.getElementById('roli-item');
    const rakhiItem = document.getElementById('rakhi-item');
    const sweetItem = document.getElementById('sweet-item');

    if (diyaItem) diyaItem.addEventListener('click', () => { if (currentStep === 1) advanceRitual(); });
    if (roliItem) roliItem.addEventListener('click', () => { if (currentStep === 2) advanceRitual(); });
    if (rakhiItem) rakhiItem.addEventListener('click', () => { if (currentStep === 3) advanceRitual(); });
    if (sweetItem) sweetItem.addEventListener('click', () => { if (currentStep === 4) advanceRitual(); });

    if (ritualBtn) {
        ritualBtn.addEventListener('click', advanceRitual);
    }

    function advanceRitual() {
        if (currentStep === 1) {
            // Step 1: Light Diya
            diyaFlame.classList.add('lit');
            aartiCircle.classList.add('active');
            step1.classList.remove('active');
            step1.classList.add('completed');
            step2.classList.add('active');
            conn1.classList.add('completed');

            statusMsg.textContent = '✨ Aarti Diya is glowing! Step 2: Apply the sacred Roli-Chawal Tilak on Bhuriya\'s forehead.';
            ritualBtnText.innerHTML = 'Apply Roli-Chawal Tilak 🔴';
            currentStep = 2;
            playAudioSfx('chime');

        } else if (currentStep === 2) {
            // Step 2: Tilak
            tilakMark.classList.add('applied');
            step2.classList.remove('active');
            step2.classList.add('completed');
            step3.classList.add('active');
            conn2.classList.add('completed');

            statusMsg.textContent = '🌸 Auspicious Tilak applied! Step 3: Tie the sacred golden Rakhi thread on Bhuriya\'s wrist.';
            ritualBtnText.innerHTML = 'Tie Sacred Rakhi 🪢';
            currentStep = 3;
            playAudioSfx('chime');

        } else if (currentStep === 3) {
            // Step 3: Tie Rakhi
            tiedRakhi.classList.add('tied');
            step3.classList.remove('active');
            step3.classList.add('completed');
            step4.classList.add('active');
            conn3.classList.add('completed');

            statusMsg.textContent = '💖 Rakhi successfully tied with love! Step 4: Feed Bhuriya delicious Kaju Katli sweet.';
            ritualBtnText.innerHTML = 'Feed Kaju Sweet 🍬';
            currentStep = 4;
            playAudioSfx('fanfare');
            fireConfettiBurst();

        } else if (currentStep === 4) {
            // Step 4: Feed Sweet
            sweetEffect.classList.add('show');
            step4.classList.remove('active');
            step4.classList.add('completed');

            statusMsg.innerHTML = '🎉 <strong>Raksha Bandhan Ritual Completed!</strong> May God bless Bhuriya with lifelong joy & success! 🌸';
            ritualBtnText.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Restart Ritual Ceremony';
            currentStep = 5;
            playAudioSfx('fanfare');
            fireConfettiBurst();

        } else {
            // Reset ceremony
            diyaFlame.classList.remove('lit');
            aartiCircle.classList.remove('active');
            tilakMark.classList.remove('applied');
            tiedRakhi.classList.remove('tied');
            sweetEffect.classList.remove('show');

            [step1, step2, step3, step4].forEach(s => {
                s.classList.remove('active', 'completed');
            });
            [conn1, conn2, conn3].forEach(c => c.classList.remove('completed'));

            step1.classList.add('active');
            statusMsg.textContent = 'Step 1: Tap below to light the Aarti Diya and begin the sacred blessing!';
            ritualBtnText.innerHTML = 'Light The Aarti Diya 🪔';
            currentStep = 1;
            playAudioSfx('chime');
        }
    }
}

/* ==========================================================================
   5. BROTHER COUPONS REDEEM SYSTEM
   ========================================================================== */
function initBrotherCoupons() {
    const redeemButtons = document.querySelectorAll('.coupon-redeem-btn');

    redeemButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const couponId = btn.getAttribute('data-coupon');
            const stamp = document.getElementById(`stamp-${couponId}`);

            if (stamp) {
                stamp.classList.add('active');
                btn.disabled = true;
                btn.textContent = 'Claimed!';
                playAudioSfx('stamp');
                fireConfettiBurst();
            }
        });
    });
}

/* ==========================================================================
   6. SHAGUN / GIFT CALCULATOR
   ========================================================================== */
function initShagunCalculator() {
    const slider = document.getElementById('gift-slider');
    const icon = document.getElementById('feedback-icon');
    const title = document.getElementById('feedback-title');
    const desc = document.getElementById('feedback-desc');
    const confirmBtn = document.getElementById('confirm-gift-btn');

    const giftLevels = {
        '1': {
            icon: '🍫',
            title: '1 Dairy Milk Silk Chocolate',
            desc: 'Sister\'s Verdict: "Hmm, sweet choice Bhuriya! But you can definitely do better than just one chocolate!" 😉'
        },
        '2': {
            icon: '🍕',
            title: 'Pizza Party + Ice Cream Feast',
            desc: 'Sister\'s Verdict: "Now we\'re talking! Garlic bread and double cheese burst is mandatory!" 😋🍕'
        },
        '3': {
            icon: '💵',
            title: '₹1001 Cash Shagun Envelope',
            desc: 'Sister\'s Verdict: "Auspicious & generous! Sister will save this for shopping!" 🛍️💖'
        },
        '4': {
            icon: '📱',
            title: 'Brand New Tech Gadget / Watch',
            desc: 'Sister\'s Verdict: "Bhuriyaaa is the BEST brother on planet Earth! You are an absolute legend!" 🌟👑'
        },
        '5': {
            icon: '👑',
            title: 'Infinite Love + All Pocket Money!',
            desc: 'Sister\'s Verdict: "Awww! Nothing beats your unconditional brotherly love (and your bank balance)! Happy Rakhi Bhuriyaaa!" 💖✨'
        }
    };

    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            const data = giftLevels[val];
            if (!data) return;

            icon.textContent = data.icon;
            title.textContent = data.title;
            desc.textContent = data.desc;
            playAudioSfx('chime');
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            playAudioSfx('fanfare');
            fireConfettiBurst();
            alert('🎉 Gift Confirmed! Bittu has registered this Rakhi treat from Bhuriya! 💖');
        });
    }
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

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   8. MOBILE NAVIGATION & SCROLL
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
   9. CANVASES CONFETTI EXPLOSION ENGINE
   ========================================================================== */
function fireConfettiBurst() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ['#f59e0b', '#fbbf24', '#e11d48', '#ec4899', '#10b981', '#ffffff', '#ffd700'];

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
