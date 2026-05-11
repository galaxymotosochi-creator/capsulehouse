(function() {
    const containerId = 'canvas-container';
    let container = document.getElementById(containerId);
    if (!container) {
        container = document.body;
    }
    
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
    const ctx = canvas.getContext('2d', { alpha: false, willReadFrequently: false });
    
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W, H;
    
    function resize() {
        const rect = container.getBoundingClientRect();
        W = rect.width || window.innerWidth;
        H = rect.height || window.innerHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    resize();
    
    if (container === document.body) {
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';
        canvas.style.position = 'fixed';
    } else {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative';
        }
        container.style.overflow = 'hidden';
    }
    
    container.appendChild(canvas);
    
    window.addEventListener('resize', resize);
    
    const mouse = { x: -9999, y: -9999, active: false };
    
    document.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    });
    
    document.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = -9999;
        mouse.y = -9999;
    });
    
    function lerp(a, b, t) {
        return a + (b - a) * t;
    }
    
    class Particle {
        constructor(isOrb = false) {
            this.reset(isOrb, true);
        }
        
        reset(isOrb = false, initial = false) {
            this.isOrb = isOrb;
            this.x = Math.random() * W;
            this.y = initial ? Math.random() * H : H + Math.random() * 50;
            this.baseVx = (Math.random() - 0.5) * (isOrb ? 0.2 : 0.6);
            this.baseVy = -(Math.random() * (isOrb ? 0.5 : 1.2) + (isOrb ? 0.2 : 0.5));
            this.vx = this.baseVx;
            this.vy = this.baseVy;
            this.radius = isOrb ? Math.random() * 4 + 3 : Math.random() * 2 + 1;
            this.opacity = isOrb ? Math.random() * 0.25 + 0.25 : Math.random() * 0.5 + 0.35;
            this.phase = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.02 + 0.005;
            this.wobbleAmp = Math.random() * (isOrb ? 30 : 15) + 5;
            this.fadeRate = Math.random() * 0.002 + 0.001;
            this.oscillate = Math.random() > 0.5;
            this.isRespawning = false;
            this.respawnTimer = 0;
            this.targetY = this.y;
            this.targetX = this.x;
        }
        
        update() {
            if (this.isRespawning) {
                this.respawnTimer--;
                if (this.respawnTimer <= 0) {
                    this.reset(this.isOrb, false);
                }
                return;
            }
            
            this.phase += this.wobbleSpeed;
            
            let wobble = Math.sin(this.phase) * this.wobbleAmp * 0.02;
            this.x += this.vx + wobble;
            this.y += this.vy;
            
            const drift = Math.sin(this.phase * 0.5) * 0.15;
            this.x += drift;
            
            if (mouse.active) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repelRadius = this.isOrb ? 200 : 150;
                
                if