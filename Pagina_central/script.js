// --- 1. Lógica do Gráfico (Chart.js) ---
const ctx = document.getElementById('dailySalesChart').getContext('2d');

// Gradiente para as barras
const gradient = ctx.createLinearGradient(0, 0, 0, 300);
gradient.addColorStop(0, 'rgba(0,123,255, 0.6)');
gradient.addColorStop(1, 'rgba(0,123,255, 0.1)');

// DADOS CORRIGIDOS: Certifique-se que esta linha seja copiada corretamente
// São 7 dias, com 7 valores diferentes.
const labels = ['29/10', '30/10', '31/10', '01/11', '02/11', '03/11', '04/11'];
const printData = [150, 220, 180, 300, 250, 400, 310]; // Nº de páginas

const dailySalesChart = new Chart(ctx, {
    type: 'bar', // Tipo: gráfico de barras
    data: {
        labels: labels, // Eixo X
        datasets: [{
            label: 'Páginas Impressas',
            data: printData, // Eixo Y (OS 7 VALORES)
            backgroundColor: gradient, 
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            barThickness: 40 
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Importante: não deixa o gráfico esticar
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Nº de Páginas'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Data'
                }
            }
        },
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y + ' páginas';
                        }
                        return label;
                    }
                }
            }
        }
    }
});

// DEIXE O CÓDIGO DO MENU (menu-toggle) AQUI EMBAIXO, SE ELE ESTIVER AQUI
// const menuToggle = ...