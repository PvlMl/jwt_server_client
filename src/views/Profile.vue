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
         this.sendAccesToken();
    }, 
    methods: {
      sendAccesToken() {
       const accesToken = localStorage.getItem('accesToken');
        if(!accesToken) return;
        fetch("http://localhost:3000/auth/user", {
        headers: {
          'Authorization': `Bearer ${accesToken}`,
        },
        method: "GET",
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
          this.username = res.username || '';
          this.id = res.id || null;
          if (res.accesToken) {
            localStorage.setItem("accesToken", res.accesToken);
          }
      })
      }
    }
}
</script>

<style scoped>

</style>