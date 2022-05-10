<template>
  <section class="vh-100" style="background-color: #cce">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-8">
          <div class="card text-black" style="border-radius: 25px">
            <div class="card-body p-md-3">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                    Registration
                  </p>

                  <form class="mx-1 mx-md-4">
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="text"
                          id="form3Example1c"
                          class="form-control"
                          v-model="username"
                        />
                        <label class="form-label" for="form3Example1c"
                          >Your Name</label
                        >
                      </div>
                    </div>
                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input
                          type="password"
                          id="form3Example4c"
                          class="form-control"
                          v-model="password"
                        />
                        <label class="form-label" for="form3Example4c"
                          >Password</label
                        >
                      </div>
                    </div>

                    <div
                      class="d-flex justify-content-center mx-4 mb-3 mb-lg-4"
                    >
                      <button
                        type="button"
                        class="btn btn-primary btn-lg"
                        @click="sendCredentials"
                      >
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    sendCredentials() {
      const userData = {
        username: this.username,
        password: this.password,
      };
      fetch("http://localhost:3000/auth/reg", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      })
        .then(res => res.json()
        .then(data => {
          if (data.message){
            alert(data.message);
          } 
          if(res.ok){
            this.$router.push('/login')
          }
        }))
        .catch(e => alert(e));
        this.username = '',
        this.password = ''
    },
  },
};
</script>

<style scoped>
</style>