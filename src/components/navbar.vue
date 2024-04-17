<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container">
        <a class="navbar-brand" href="#">Brand.</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link
                class="nav-link ps-5 pe-5 mt-4 mt-lg-0 bg-white btn-hover"
                :to="{ name: 'Mainpage' }"
              >
                Product
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="btn-0 nav-link ps-5 pe-5 ms-lg-3 mt-2 mt-lg-0 bg-white btn-hover"
                :to="{ name: 'category' }"
                >Category</router-link
              >
            </li>
          </ul>
          <div class="row">
            <div class="col p-0 pt-2 pt-lg-0">
              <img
                class="profile_image image-fluid"
                :src="image"
                alt=""
                width="40px"
                height="40px"
              />
            </div>
            <div class="col p-0">
              <router-link
                class="nav-link ps-5 pt-2 pb-2 pe-5 ms-lg-3 mt-2 mt-lg-0 bg-white logout"
                :to="{ name: 'Login' }"
                >Logout</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore(); // Access the Vuex store
    const image = ref(null); // Define a reactive reference for the token

    // On component mount, get the token from the store
    onMounted(() => {
      image.value = store.state.image;
      // console.log('this token get from the vuex',token.value)
    });
    return {
      image
    };
  },
};
</script>
<style>
.logout {
  background-color: #0d6efd !important;
  color: white !important;
  border-radius: 5px;
}
.nav-link {
  border-radius: 5px;
}
.active {
  background-color: blue !important;
  color: white !important;
  border-radius: 5px;
}
.btn-hover:hover {
  background-color: #007bff !important;
  color: white !important;
  transition: 0.5s;
}
.logout:hover {
  background-color: white !important;
  color: black !important;
  transition: 0.5s;
}
.profile_image {
  border-radius: 25px !important;
  border: 1px solid yellowgreen;
  cursor: pointer;
}
</style>
