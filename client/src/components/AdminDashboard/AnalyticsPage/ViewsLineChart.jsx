import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ViewsLineChart = ({
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  data = [820, 932, 901, 934, 1290, 1330, 1520]
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    // Create gradient for area under line
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Views',
            data,
            fill: true,
            backgroundColor: gradient,
            borderColor: '#3B82F6',
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: '#3B82F6',
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: {
            grid: { display: false }
          },
          y: {
            beginAtZero: true,
            grid: { drawBorder: false }
          }
        }
      }
    });

    // Resize handling
    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      chart.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [labels, data]);

  return <canvas ref={canvasRef} className="w-full h-64" />;
};

export default ViewsLineChart;
