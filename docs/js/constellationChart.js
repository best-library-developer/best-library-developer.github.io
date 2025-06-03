// Chart.js implementation for constellation (IQ) diagram visualization
window.constellationChartInstance = null;

window.initConstellationChart = () => {
    try {
        const ctx = document.getElementById('constellationChart');
        if (!ctx) {
            console.error('Constellation canvas element not found!');
            return false;
        }
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library not loaded!');
            return false;
        }
        if (window.constellationChartInstance) {
            window.constellationChartInstance.destroy();
            window.constellationChartInstance = null;
        }
        window.constellationChartInstance = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Constellation',
                    data: [],
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointRadius: 3,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true, // Make chart square
                aspectRatio: 1, // 1:1 aspect ratio for square chart
                animation: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'In-phase (I)'
                        },
                        min: -1.2,
                        max: 1.2,
                        ticks: {
                            stepSize: 0.2
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Quadrature (Q)'
                        },
                        min: -1.2,
                        max: 1.2,
                        ticks: {
                            stepSize: 0.2
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: true }
                }
            }
        });
        return true;
    } catch (error) {
        console.error('Error initializing constellation chart:', error);
        return false;
    }
};

window.updateConstellationChart = (iData, qData) => {
    try {
        if (!Array.isArray(iData) || !Array.isArray(qData) || iData.length !== qData.length) {
            console.error('Invalid IQ data for constellation chart');
            return false;
        }
        if (!window.constellationChartInstance) {
            const success = window.initConstellationChart();
            if (!success) return false;
        }
        const points = iData.map((i, idx) => ({ x: i, y: qData[idx] }));
        window.constellationChartInstance.data.datasets[0].data = points;
        window.constellationChartInstance.update();
        return true;
    } catch (error) {
        console.error('Error updating constellation chart:', error);
        return false;
    }
};

window.destroyConstellationChart = () => {
    try {
        if (window.constellationChartInstance) {
            window.constellationChartInstance.destroy();
            window.constellationChartInstance = null;
        }
    } catch (error) {
        console.error('Error destroying constellation chart:', error);
    }
};
