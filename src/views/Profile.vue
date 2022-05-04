<template>
<div class="alert alert-danger" role="alert" v-if="!logged">
  You are not logged in!
</div>
<div class="container" v-if="logged">
    <header>
      <h3>
        <strong>{{username}}</strong> is logged.
       Your id: <strong>{{id}}</strong>
      </h3>
    </header>
    
  </div>
</template>
<script>
export default {
    data(){
        return {
            username: '',
            id: null
        }
    },
    computed: {
        logged(){
            if(this.username && this.id) return true
            else return false
        }
    },
    mounted(){
        const token = localStorage.getItem('token');
        if(!token) return;
        fetch("http://localhost:3000/auth/user", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {
          this.username = res.username;
          this.id = res.id;
      })
    }
}
</script>

<style scoped>

</style>