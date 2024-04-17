<template>
  <section class="vh-100">
    <!-- <div v-if="loading" class="abc"><span class="loader"></span></div> -->
    <VueLoadingOverlay :active="loading" :can-cancel="false" :color="'#008080'" :background-color="'rgba(255, 255, 255, 0.8)'"></VueLoadingOverlay>
    <div class="container py-5 h-100">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="/src/assets/login.jpg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <div class="col-md-7 bg-white col-lg-5 col-xl-5 offset-xl-1 p-4" style="border-radius: 10px;">
          <form>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example13">User Name</label>
              <input
                v-model="email"
                type="text"
                id="form1Example13"
                class="form-control form-control-lg"
                autocomplete="username"
              />
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
              <label class="form-label" for="form1Example23">Password</label>
              <input
                v-model="password"
                type="password"
                id="form1Example23"
                class="form-control form-control-lg"
                autocomplete="current-password"
              />
            </div>

            <div class="d-flex justify-content-between mb-4">
              <!-- Checkbox -->
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                  checked
                />
                <label class="form-check-label" for="form1Example3">
                  Remember me
                </label>
              </div>
              <a href="#!">Forgot password?</a>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              class="btn custom-btn-color btn-lg btn-block w-100"
              @click.prevent="login"
            >
              Sign in
            </button>

            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
            </div>
            <button
              type="submit"
              class="btn btn-lg btn-block w-100 custom-btn-color"
            >
              <i class="fab fa-facebook-f me-2"></i>Continue with Facebook
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { ref, defineComponent } from "vue";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import router from "@/router";
import VueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css'; // Import the styles
import { useStore } from 'vuex';
export default defineComponent ({
  components:{
    VueLoadingOverlay
  },
  setup() {
    const store = useStore();
    const loading = ref(false)
    const email = ref("kminchelle");
    const password = ref("0lelplR");
    const checkfields = ref(false)
    const login = async () => {
      if(email.value.length<1)
      {
        checkfields.value=true
        toastr.error('Enter Email First');
      }
      if(password .value.length<1)
      {
        checkfields.value=true
        toastr.error('Enter password First');
      }
      if(checkfields.value == true)
      {
        checkfields.value=false
        return
      }
      loading.value=true
      try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username: email.value,
          password: password.value,
        });
        if (response.data.token.length > 1) {
          const image = response.data.image;
          store.commit('profileimage', image);
          toastr.success("Login successfully");
          loading.value=false
          router.push({ name: "Mainpage" });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toastr.error(error.response.data.message);
        loading.value=false
      }
    };
    return {
      login,
      email,
      password,
      loading,
    };
  },
});
</script>
<style>

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
.custom-btn-color{
  background-color: #3f3d56 !important;
  color:white !important;
}
</style>
