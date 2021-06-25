<template>
  <div class="frame"> 
    <div id='new'>
      <button onclick='location.href="/new"' id='new-btn'>- Nouvel achat -</button>
    </div>
    <div>
      <apexchart width='780' type='bar' :options='chartOptions' :series='series'></apexchart>
    </div>
    <div>
      <table cellspacing='0'>
        <thead>
          <tr>
            <th>- Nom du produit -</th>
            <th>- Prix à l'unité -</th>
            <th>- Quantité -</th>
            <th>- Total -</th>
            <th>- Opérations -</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(good) in goods" :key="good.id">
            <td class='name'>{{good.name}}</td>
            <td>{{good.price}}</td>
            <td>{{good.quantity}}</td>
            <td>{{good.total}}</td>
            <td>
              <button :data-id="good.id" @click='edit' class='btn'>Modifier</button>
              <button :data-id="good.id" @click='del' class='btn'>Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router/index'

export default {
  name: 'Home',
  data () {
    return {
      goods: [],
      chartOptions:{
        chart: {
          id: 'statistic'
        },
        xaxis: {
          categories: ['1-50', '51-100', '101-150', '151-200', '201-250', '251-300', '300+']
        },
        title: {
          text: "Statistiques sur tous les achats",
          align: 'center',
          style: {
            fontSize: '15px',
            color: '#727272'
          }
        },
        colors: ['#41ffff']
      },
      series:[{
        name: "Nombre d'achat",
        data: []
      }]
    }
  },
  mounted() {
    axios({
      method:'post',
      url:'http://localhost:3001/list'
    }).then((response) => { this.goods = response.data })
    .catch((error) => {
      console.log(error);
    }),
    axios({
      method:'post',
      url:'http://localhost:3001/count'
    }).then((response) => { this.series = [{ name: "Nombre d'achat", data: response.data }]})
    .catch((error) => {
      console.log(error);
    })
  },
  methods: {
    edit: function(e){
      this.$router.push({
        name:'Edit',
        params: {
          id: e.srcElement.dataset.id
        }
      })
    },
    del: function(e){
      axios({
        method:'post',
        url:'http://localhost:3001/delete',
        data: {
          id: e.srcElement.dataset.id
        }
      }).then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.frame {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  background-color: white;
  justify-content: center;
  box-shadow: 10px -30px 20px rgba(0, 53, 54, 0.171);
  height:100%;
}

div {
  display: flex;
  width: 800px;
  justify-content: left;
}

table {
  width: 100%;
  margin: 30px;
  border: thick double rgb(235, 235, 235);
}

th, td {
  padding:10px;
  border: 1px solid rgb(219, 219, 219);
  color: rgb(114, 114, 114);
}

.name {
  text-transform: capitalize;
}

.btn {
  color: rgb(114, 114, 114);
}
#new {
  margin: 20px;
}

#new-btn {
  width: 200px;
  height: 30px;
  font-size: 15px;
  color: rgb(114, 114, 114);
}
</style> 
