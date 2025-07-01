const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const width = 800;
const height = 600;

const generateChart = async ({ labels, data, colors, title }) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

  const config = {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: title,
        data,
        backgroundColor: colors
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: title
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(config);
  return buffer;
};

module.exports = { generateChart };

