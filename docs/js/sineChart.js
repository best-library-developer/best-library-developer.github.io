// Chart.js implementation for sine signal visualization
window.sineChartInstance = null;

// Initialize an empty chart
window.initSineChart = () => {
    try {
        console.log('Initializing sine chart...');
        const ctx = document.getElementById('sineChart');
        if (!ctx) {
            console.error('Canvas element not found!');
            return false;
        }
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js library not loaded!');
            return false;
        }
        
        // Clear any previous chart instance
        if (window.sineChartInstance) {
            window.sineChartInstance.destroy();
            window.sineChartInstance = null;
        }
        
        // Create new chart with appropriate configuration
        window.sineChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Sine Signal',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0 // General animation time
                },
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Time (seconds)'
                        },
                        min: 0
                    },
                    y: {
                        title: {
                            display: true, 
                            text: 'Amplitude'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        intersect: false,
                        mode: 'nearest'
                    }
                }
            }
        });
        console.log('Sine chart initialized successfully');
        return true;
    } catch (error) {
        console.error('Error initializing sine chart:', error);
        return false;
    }
};

// Update the chart with new signal data
window.updateSineChart = (timeData, signalData, signalType = 'Sine') => {
    try {
        console.log(`Updating chart with ${signalData.length} data points for signal type: ${signalType}`);
        
        // Validate incoming data
        if (!Array.isArray(timeData) || !Array.isArray(signalData) || timeData.length !== signalData.length) {
            console.error('Invalid data format for chart update');
            return false;
        }
        
        // Initialize chart if not already done
        if (!window.sineChartInstance) {
            const success = window.initSineChart();
            if (!success) {
                console.error('Failed to initialize chart during update');
                return false;
            }
        }
        
        if (!window.sineChartInstance) {
            console.error('Chart instance not available');
            return false;
        }
        
        // Define chart appearance based on signal type
        let label = 'Signal';
        let color = 'rgba(75, 192, 192, 1)';
        let backgroundColor = 'rgba(75, 192, 192, 0.1)';
        
        switch(signalType) {
            case 'Sine':
                label = 'Sine Wave';
                color = 'rgba(75, 192, 192, 1)';
                backgroundColor = 'rgba(75, 192, 192, 0.1)';
                break;
            case 'AM':
                label = 'Amplitude Modulated Signal';
                color = 'rgba(153, 102, 255, 1)';
                backgroundColor = 'rgba(153, 102, 255, 0.1)';
                break;
            case 'FM':
                label = 'Frequency Modulated Signal';
                color = 'rgba(255, 159, 64, 1)';
                backgroundColor = 'rgba(255, 159, 64, 0.1)';
                break;
        }
        
        // Combine the time and signal data into points
        const chartData = timeData.map((t, i) => {
            return { x: t, y: signalData[i] };
        });
        
        // Set new data and update label/color
        window.sineChartInstance.data.datasets[0].data = chartData;
        window.sineChartInstance.data.datasets[0].label = label;
        window.sineChartInstance.data.datasets[0].borderColor = color;
        window.sineChartInstance.data.datasets[0].backgroundColor = backgroundColor;
        
        // Automatically adjust y-axis scale based on the data
        const maxAbs = Math.max(...signalData.map(val => Math.abs(val)));
        window.sineChartInstance.options.scales.y.min = -maxAbs * 1.1;
        window.sineChartInstance.options.scales.y.max = maxAbs * 1.1;
        
        // Set x-axis to cover the full time range
        const maxTime = Math.max(...timeData);
        window.sineChartInstance.options.scales.x.max = maxTime;
        
        // Update the chart
        window.sineChartInstance.update();
        console.log('Chart updated successfully');
        return true;
    } catch (error) {
        console.error('Error updating sine chart:', error);
        return false;
    }
};

// Clean up chart when component is disposed
window.destroySineChart = () => {
    try {
        if (window.sineChartInstance) {
            window.sineChartInstance.destroy();
            window.sineChartInstance = null;
            console.log('Sine chart destroyed');
        }
    } catch (error) {
        console.error('Error destroying sine chart:', error);
    }
};
