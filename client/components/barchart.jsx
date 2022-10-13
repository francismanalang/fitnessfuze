import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarChart({ chartData }) {
  return (
    <div>
      <Bar
        data={chartData}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false
        }}
      />
    </div>
  );
}

export default BarChart;
