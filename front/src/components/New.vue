<template>
  <div class="frame"> 
    <div>
      <h1>NOUVEL ACHAT</h1>
    </div>
    <div id='form'>
      <table>
        <thead>
          <tr>
            <th>- Nom du produit -</th>
            <th>- Prix -</th>
            <th>- Quantité -</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type='text' name='goods-name' ref='goodsName' required/></td>
            <td><input type='number' name='goods-price' ref='goodsPrice' @keyup='calculation' required/></td>
            <td><input type='number' name='goods-quantity' ref='goodsQuantity' @keyup='calculation' required/></td>
          </tr>
        </tbody>
      </table>
      <div id='total'>TOTAL: {{v}}</div>
    </div>
    <div id='btn'>
      <button onclick='location.href="/"' class='btn'>RETOURNER</button>
      <button @click='request' class='btn'>ENREGISTRER</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import router from '@/router/index'

export default {
  name: 'New',
  data () {
    return {
      v : '0'
    }
  },
  methods: {
    calculation: function(){
      var quantity = this.$refs.goodsQuantity.value
      var price = this.$refs.goodsPrice.value
      this.v = price * quantity
    },
    request: function(){
      if(this.$refs.goodsName.value != '' && this.$refs.goodsQuantity.value > 0 && this.$refs.goodsPrice.value > 0 && this.v > 0){
        axios({
          method:'post',
          url:'http://localhost:3001/new', 
          data:{
            name: this.$refs.goodsName.value,
            price: this.$refs.goodsPrice.value,
            quantity: this.$refs.goodsQuantity.value,
            total: this.v
          }
        }).then(() => {
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: left;
  color: rgb(114, 114, 114);
}

input {
  border-radius: 6px;
  border: 0;
  background-color: rgb(134, 218, 224);
  appearance: textfield;
  text-align: center;
  height: 20px;
}

th, td {
  padding-right: 20px;
}

.frame {
  display: table;
  margin: auto;
  min-width: 800px;
  padding:0 20px 20px 20px;
  border: 1px solid rgb(94, 94, 94);
  border-radius: 15px;
  background-color: white;
}

#form{
  display: flex;
  justify-content: left;
  align-items: center;
  color:rgb(114, 114, 114);
}

table {
  display: inline-block;
}

#total {
  display: inline-block;
  font-weight: 700;
}

.btn {
  color: rgb(114, 114, 114);
}

#btn {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
