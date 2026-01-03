<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';

  export let type: 'line' | 'bar' = 'line';
  export let data: any;
  export let options: any = {};

  let canvas: HTMLCanvasElement;
  let chart: Chart;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      chart = new Chart(ctx, {
        type,
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              grid: {
                display: true,
                color: '#f1f5f9' // slate-100
              },
              ticks: {
                font: {
                  family: "'Inter', sans-serif",
                  size: 11
                },
                color: '#64748b' // slate-500
              },
              border: {
                display: false
              }
            },
            x: {
               grid: {
                display: false
              },
              ticks: {
                font: {
                  family: "'Inter', sans-serif",
                  size: 11
                },
                color: '#64748b'
              },
              border: {
                display: false
              }
            }
          },
          ...options
        }
      });
    }

    return () => {
      if (chart) chart.destroy();
    };
  });
</script>

<div class="w-full h-full">
  <canvas bind:this={canvas}></canvas>
</div>
