// src/components/AdminDashboard/AnalyticsPage/EarningsBarChart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const EarningsBarChart = ({ data = [120, 200, 150, 80, 270, 310, 220], labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul'] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Earnings ($)', data, backgroundColor: '#3B82F6' }] },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, tooltip: { mode: 'index' } },
        scales: {
          y: { beginAtZero: true },
          x: { grid: { display: false } },
        },
      },
    });
    return () => chart.destroy();
  }, [data, labels]);

  return <canvas ref={canvasRef} className="w-full h-64" />;
};

export default EarningsBarChart;
