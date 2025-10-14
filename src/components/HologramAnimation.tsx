import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HologramAnimationProps {
  backgroundImage?: string;
  className?: string;
}

// Classe que define uma partícula (ponto no globo)
class Particle {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  opacity: number;
  x: number = 0;
  y: number = 0;

  constructor(maxRadius: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * maxRadius;
    this.speed = (Math.random() - 0.5) * 0.02;
    this.size = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  
  update() {
    this.angle += this.speed;
    this.x = Math.cos(this.angle) * this.radius;
    this.y = Math.sin(this.angle) * this.radius * 0.5; // Efeito de perspectiva achatada
  }
}

const HologramAnimation: React.FC<HologramAnimationProps> = ({ 
  backgroundImage = './tech-warehouse.png',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const isMobile = useIsMobile();
  
  // Configurações de cores para o holograma
  const hologramColor = '#00eaff';
  const glowColor = 'rgba(0, 234, 255, 0.7)';
  
  // Variáveis de estado da animação
  const stateRef = useRef({
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0,
    radius: 0,
    angle: 0,
    barValues: [20, 15, 83],
    circlePercentages: [55, 75],
    particles: [] as Particle[]
  });

  // Função para configurar ou reconfigurar o canvas
  const setup = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduzir DPR em dispositivos móveis para melhor performance
    const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 2) : window.devicePixelRatio || 1;
    
    // Define o tamanho do canvas com base no contêiner
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    
    // Calcula o centro e o raio principal do holograma
    const centerX = width / 2;
    const centerY = height / 2;
    // Ajustado para funcionar melhor com alturas reduzidas
    const radius = Math.min(width, height) * 0.22;

    stateRef.current = {
      ...stateRef.current,
      width,
      height,
      centerX,
      centerY,
      radius
    };

    // Recria as partículas se o tamanho da tela mudar
    createParticles();
  };

  const createParticles = () => {
    const { radius } = stateRef.current;
    stateRef.current.particles = [];
    // Reduzir número de partículas em dispositivos móveis para melhor performance
    const numParticles = Math.floor(radius * (isMobile ? 1 : 2));
    for (let i = 0; i < numParticles; i++) {
      stateRef.current.particles.push(new Particle(radius));
    }
  };

  // Desenha o globo central com pontos de dados simulados
  const drawGlobe = (ctx: CanvasRenderingContext2D) => {
    const { centerX, centerY, radius, particles } = stateRef.current;
    
    ctx.strokeStyle = hologramColor;
    ctx.lineWidth = 1;
    // Reduzir efeitos de sombra em dispositivos móveis
    if (!isMobile) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 25;
    }

    // Esfera principal
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
    
    // Desenha pontos que se movem para simular um mapa de dados
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(centerX + p.x, centerY + p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 234, 255, ${p.opacity})`;
      ctx.fill();
      p.update();
    });

    if (!isMobile) {
      ctx.shadowBlur = 0;
    }
  };

  // Desenha os anéis que rotacionam ao redor do globo
  const drawRings = (ctx: CanvasRenderingContext2D) => {
    const { centerX, centerY, radius, angle } = stateRef.current;
    
    ctx.strokeStyle = hologramColor;
    ctx.lineWidth = 2;
    // Reduzir efeitos de sombra em dispositivos móveis
    if (!isMobile) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 15;
    }

    // Anel 1 (rotação horária)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.25, angle, angle + Math.PI * 1.6);
    ctx.stroke();
    
    // Anel 2 (rotação anti-horária)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.4, -angle * 0.8, -angle * 0.8 + Math.PI * 1.2);
    ctx.stroke();
    
    if (!isMobile) {
      ctx.shadowBlur = 0;
    }
  };

  // Função auxiliar para desenhar um círculo de porcentagem
  const drawPercentageCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, percentage: number) => {
    const { angle } = stateRef.current;
    const animatedPercentage = percentage * (0.98 + Math.sin(angle * 3 + x) * 0.02);
    const endAngle = (Math.PI * 2 / 100) * animatedPercentage - Math.PI / 2;

    // Círculo de fundo
    ctx.strokeStyle = 'rgba(0, 234, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();

    // Arco de preenchimento
    ctx.strokeStyle = hologramColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, endAngle);
    ctx.stroke();
    
    // Texto da porcentagem
    ctx.fillStyle = hologramColor;
    ctx.font = `${r * 0.5}px 'Orbitron', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(animatedPercentage)}%`, x, y);
  };

  // Desenha os elementos de interface (gráficos e círculos)
  const drawHUD = (ctx: CanvasRenderingContext2D) => {
    const { centerX, centerY, radius, angle, barValues, circlePercentages, width, height } = stateRef.current;
    
    // Reduzir efeitos de sombra em dispositivos móveis
    if (!isMobile) {
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 10;
    }
    
    // Escala responsiva otimizada para alturas reduzidas
    const scale = Math.min(width, height) / 600; // Reduzido de 800 para 600
    const scaledRadius = radius;
    
    // Gráfico de barras à esquerda (apenas se houver espaço suficiente)
    if (width > (isMobile ? 400 : 500)) { // Ajustado limite para mobile
      const barChartX = centerX - radius * 2.5; // Ajustado para usar radius diretamente
      const barChartY = centerY;
      const barWidth = Math.max(12, 18 * scale);
      const barSpacing = Math.max(6, 8 * scale);

      barValues.forEach((value, index) => {
        const animatedValue = value * (0.95 + Math.sin(angle * 2 + index) * 0.05);
        const barHeight = (animatedValue / 100) * scaledRadius * 1.5;
        const x = barChartX + index * (barWidth + barSpacing);
        const y = barChartY + scaledRadius * 0.75 - barHeight;

        ctx.fillStyle = hologramColor;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Valor no topo da barra
        ctx.fillStyle = hologramColor;
        const fontSize = Math.max(8, 10 * scale);
        ctx.font = `${fontSize}px "Orbitron", monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.round(animatedValue)}`, x + barWidth / 2, y - 5);
      });
    }

    // Círculos de porcentagem à direita (apenas se houver espaço suficiente)
    if (width > (isMobile ? 400 : 500)) { // Ajustado limite para mobile
      const circle1X = centerX + radius * 2.0; // Ajustado para usar radius diretamente
      const circle1Y = centerY + radius * 0.7;
      const circle2X = centerX + radius * 2.5;
      const circle2Y = centerY - radius * 0.3;
      
      const circleRadius1 = Math.max(20, 30 * scale);
      const circleRadius2 = Math.max(28, 40 * scale);
      
      drawPercentageCircle(ctx, circle1X, circle1Y, circleRadius1, circlePercentages[0]);
      drawPercentageCircle(ctx, circle2X, circle2Y, circleRadius2, circlePercentages[1]);
    }

    // Texto dinâmico na parte inferior (responsivo)
    ctx.fillStyle = hologramColor;
    const fontSize = Math.max(10, Math.min(14, 14 * scale));
    ctx.font = `${fontSize}px "Orbitron", monospace`;
    ctx.textAlign = 'center';
    
    // Texto mais curto em telas pequenas
    const dynamicCode = width > (isMobile ? 350 : 500)
      ? `ZA132616624631524111 | SYS_STATUS: OK | ${Math.floor(Date.now() / 1000)}`
      : `SYS_STATUS: OK | ${Math.floor(Date.now() / 1000)}`;
    
    ctx.fillText(dynamicCode, centerX, centerY + radius * 1.5); // Ajustado para altura reduzida

    if (!isMobile) {
      ctx.shadowBlur = 0;
    }
  };

  // Loop principal de animação
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = stateRef.current;

    // Limpa o canvas
    ctx.clearRect(0, 0, width, height);

    // Atualiza o ângulo de rotação (mais lento em mobile para economizar bateria)
    stateRef.current.angle += isMobile ? 0.005 : 0.01;

    // Desenha todos os elementos
    drawGlobe(ctx);
    drawRings(ctx);
    drawHUD(ctx);

    // Continua a animação
    animationRef.current = requestAnimationFrame(animate);
  };

  // Efeito para configurar e iniciar a animação
  useEffect(() => {
    setup();
    animate();

    // Listener para redimensionamento da janela
    const handleResize = () => {
      setup();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]); // Adicionar isMobile como dependência

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay escuro para melhor contraste */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Canvas da animação */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        style={{ 
          mixBlendMode: 'screen',
          // Reduzir opacidade em mobile para economizar recursos
          opacity: isMobile ? 0.8 : 1
        }}
      />
    </div>
  );
};

export default HologramAnimation;