(function() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.background = '#0f0c08';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    const mouse = { x: -1000, y: -1000 };
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    // Golden palette
    const golds = ['#FFD700', '#FFC125', '#DAA520', '#F0E68C', '#FFF8DC', '#FFE4B5', '#FFEC8B'];
    
    // Particles
    const particles = [];
    for (let i = 0; i < 400; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: -Math.random() * 1.2 - 0.3,
            size: Math.random() * 2.5 + 1,
            alpha: Math.random() * 0.6 + 0.4,
            color: golds[Math.floor(Math.random() * golds.length)],
            twinkle: Math.random() * Math.PI * 2
        });
    }
    
    // Glow orbs
    const orbs = [];
    for (let i = 0; i < 6; i++) {
        orbs.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 60 + 40,
            alpha: Math.random() * 0.15 + 0.05
        });
    }
    
    // Stars
    const stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.8 + 0.2,
            blink: Math.random() * 0.02 + 0.005,
            offset: Math.random() * Math.PI * 2
        });
    }
    
    // Sparkles
    const sparkles = [];
    function addSparkle(x, y) {
        for (let i = 0; i < 4; i++) {
            sparkles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3,
                life: 1,
                decay: Math.random() * 0.03 + 0.015,
                size: Math.random() * 3 + 1,
                color: golds[Math.floor(Math.random() * golds.length)]
            });
        }
    }
    
    document.addEventListener('click', e => addSparkle(e.clientX, e.clientY));
    
    // Fog layers
    const fogLayers = [];
    for (let i = 0; i < 3; i++) {
        fogLayers.push({
            offset: Math.random() * 1000,
            speed: 0.2 + i * 0.15,
            alpha: 0.03 + i * 0.02,
            y: height * (0.6 + i * 0.15)
        });
    }
    
    let time = 0;
    
    function animate() {
        time++;
        ctx.fillStyle = '#0f0c08';
        ctx.fillRect(0, 0, width, height);
        
        // Background vignette
        const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
        grad.addColorStop(0, 'rgba(45, 35, 15, 0.3)');
        grad.addColorStop(1, 'rgba(5, 3, 1, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
        
        // Fog
        fogLayers.forEach(fog => {
            ctx.save();
            ctx.globalAlpha = fog.alpha;
            for (let x = 0; x < width + 200; x += 100) {
                const wave = Math.sin((x + fog.offset + time * fog.speed) * 0.003) * 40;
                ctx.beginPath();
                ctx.fillStyle = '#5a4a2a';
                ctx.arc(x, fog.y + wave, 120, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        });
        
        // Stars
        stars.forEach(star => {
            const a = star.alpha + Math.sin(time * star.blink + star.offset) * 0.3;
            ctx.save();
            ctx.globalAlpha = Math.max(0, a);
            ctx.fillStyle = '#FFFACD';
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Glow orbs
        orbs.forEach(orb => {
            orb.x += orb.vx;
            orb.y += orb.vy;
            
            if (orb.x < -100) orb.x = width + 100;
            if (orb.x > width + 100) orb.x = -100;
            if (orb.y < -100) orb.y = height + 100;
            if (orb.y > height + 100) orb.y = -100;
            
            const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
            g.addColorStop(0, `rgba(255, 215, 0, ${orb.alpha})`);
            g.addColorStop(0.5, `rgba(255, 180, 0, ${orb.alpha * 0.5})`);
            g.addColorStop(1, 'rgba(255, 140, 0, 0)');
            
            ctx.save();
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Particles
        particles.forEach(p => {
            p.twinkle += 0.05;
            
            // Upward float
            p.y += p.vy;
            p.x += p.vx + Math.sin(time * 0.01 + p.twinkle) * 0.3;
            
            // Mouse repel
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150 && dist > 0) {
                const force = (150 - dist) / 150;
                p.x += (dx / dist) * force * 3;
                p.y += (dy / dist) * force * 3;
            }
            
            // Wrap
            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            
            const twinkleAlpha = p.alpha + Math.sin(p.twinkle) * 0.2;
            
            ctx.save();
            ctx.globalAlpha = Math.max(0.1, Math.min(1, twinkleAlpha));
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow
            ctx.globalAlpha = Math.max(0, Math.min(0.3, twinkleAlpha * 0.3));
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
        
        // Sparkles
        for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];
            s.x += s.vx;
            s.y += s.vy;
            s.life -= s.decay;
            s.vx *= 0.98;
            s.vy *= 0.98;
            
            if (s.life <= 0) {
                sparkles.splice(i, 1);
                continue;
            }
            
            ctx.save();
            ctx.globalAlpha = s.life;
            ctx.fillStyle = s.color;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
            ctx.fill();
            
            // Cross sparkle
            ctx.strokeStyle = s.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(s.x - s.size * 2 * s.life, s.y);
            ctx.lineTo(s.x + s.size * 2 * s.life, s.y);
            ctx.moveTo(s.x, s.y - s.size * 2 * s.life);
            ctx.lineTo(s.x, s.y + s.size * 2 * s.life);
            ctx.stroke();
            ctx.restore();
        }
        
        // Ambient sparkle generation
        if (Math.random() < 0.05) {
            addSparkle(Math.random() * width, Math.random() * height);
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
})();