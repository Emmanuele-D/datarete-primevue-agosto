<template>
  <div class="wrapper">
    <h1>Dashboard</h1>

    <div class="surface-ground px-4 py-5 md:px-6 lg:px-8">
      <div class="grid mb-2">
        <div class="sm:col-12 md:col-6 lg:col-3">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Orders</span>
                <div class="text-900 font-medium text-xl">152</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
              </div>
            </div>
            <span class="text-green-500 font-medium">24 new </span>
            <span class="text-500">since last visit</span>
          </div>
        </div>
        <div class="sm:col-12 md:col-6 lg:col-3">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Revenue</span>
                <div class="text-900 font-medium text-xl">$2.100</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-map-marker text-orange-500 text-xl"></i>
              </div>
            </div>
            <span class="text-green-500 font-medium">%52+ </span>
            <span class="text-500">since last week</span>
          </div>
        </div>
        <div class="sm:col-12 md:col-6 lg:col-3">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Customers</span>
                <div class="text-900 font-medium text-xl">28441</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-inbox text-cyan-500 text-xl"></i>
              </div>
            </div>
            <span class="text-green-500 font-medium">520 </span>
            <span class="text-500">newly registered</span>
          </div>
        </div>
        <div class="sm:col-12 md:col-6 lg:col-3">
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <span class="block text-500 font-medium mb-3">Comments</span>
                <div class="text-900 font-medium text-xl">152 Unread</div>
              </div>
              <div class="flex align-items-center justify-content-center bg-purple-100 border-round"
                style="width:2.5rem;height:2.5rem">
                <i class="pi pi-comment text-purple-500 text-xl"></i>
              </div>
            </div>
            <span class="text-green-500 font-medium">85 </span>
            <span class="text-500">responded</span>
          </div>
        </div>
      </div>
      <div class="grid mb-2">
        <div class="sm:col-12 md:col-5">
          <div class="card">
            <h5 class="align-self-center mt-3">Grafico</h5>
            <Chart type="bar" :data="stackedData" :options="stackedOptions" />
          </div>
        </div>
        <div class="sm:col-12 md:col-7">
          <div class="card p-2">
            <h5 class="align-self-center mt-3">Grafico</h5>
            <Chart type="line" :data="lineStylesData" :options="basicOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

console.log('getter livelli login', store.getters["getLivelliLogin"])
console.log('getter logget user', store.getters["loggedUser"])

const stackedOptions = ref(
  {
    indexAxis: 'y',
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        stacked: true,
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }
);

const stackedData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    type: 'bar',
    label: 'Dataset 1',
    backgroundColor: '#42A5F5',
    data: [50, 25, 12, 48, 90, 76, 42]
  }, {
    type: 'bar',
    label: 'Dataset 2',
    backgroundColor: '#66BB6A',
    data: [21, 84, 24, 75, 37, 65, 34]
  }, {
    type: 'bar',
    label: 'Dataset 3',
    backgroundColor: '#FFA726',
    data: [41, 52, 24, 74, 23, 21, 32]
  }]
});


const lineStylesData = ref(
  {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: .4,
        borderColor: '#42A5F5'
      },
      {
        label: 'Second Dataset',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        borderDash: [5, 5],
        tension: .4,
        borderColor: '#66BB6A'
      },
      {
        label: 'Third Dataset',
        data: [12, 51, 62, 33, 21, 62, 45],
        fill: true,
        borderColor: '#FFA726',
        tension: .4,
        backgroundColor: 'rgba(255,167,38,0.2)'
      }
    ]
  }
)


const basicOptions = ref(
  {
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  }
)
</script>

<style lang="scss" scoped>

</style>