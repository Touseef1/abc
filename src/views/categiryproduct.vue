<template>
  <div>
    <navbar />
    <section style="background-color: #eee">
        <VueLoadingOverlay :active="loading" :can-cancel="false" :color="'#008080'" :background-color="'rgba(255, 255, 255, 0.8)'"></VueLoadingOverlay>
      <div class="container py-5">
        <div class="container"></div>
        <div
          class="row justify-content-center mb-3"
        >
          <div class="col-md-12 col-xl-10">
            <div class="">
              <div class="">
                <div class="row">
                  <div class="col-md-12 col-lg-6 col-xl-6 mb-4 mb-lg-0">
                    <h4>category: {{ headingcat }}</h4>
                   
                  </div>
                  <div class="col-md-6 col-lg-3 col-xl-3">
                  </div>
                  <div
                    class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none"
                  >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="row justify-content-center mb-3"
          v-for="(item, index) in ProductDetail"
          :key="index"
        >
          <div class="col-md-12 col-xl-10">
            <div class="card shadow-0 border rounded-3">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div
                      class="bg-image hover-zoom ripple rounded ripple-surface"
                    >
                      <img :src="item.thumbnail" class="w-100" />
                      <a href="#!">
                        <div class="hover-overlay">
                          <div
                            class="mask"
                            style="background-color: rgba(253, 253, 253, 0.15)"
                          ></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="col-md-6 col-lg-6 col-xl-6">
                    <h5>{{ item.title }}</h5>
                    <div class="d-flex flex-row">
                      <!-- <div class="text-danger mb-1 me-2">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                  </div> -->
                      <span> <b>stock: &nbsp; </b></span>
                      <span>{{ item.stock }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span> <b>brand: &nbsp; </b></span>
                      <span>{{ item.brand }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span><b>rating:</b> &nbsp;{{ item.rating }}</span>
                    </div>
                    <p class="text-truncate mb-4 mb-md-0">
                      {{ item.description }}
                    </p>
                  </div>
                  <div
                    class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start"
                  >
                    <div class="d-flex flex-row align-items-center mb-1">
                      <h4 class="mb-1 me-1">{{ item.price }}$ &nbsp;</h4>
                      Discount:
                      <span class="text-success"
                        >{{ item.discountPercentage }}%</span
                      >
                    </div>
                    <div class="d-flex flex-column mt-1">
                        <div class="d-flex flex-row">
                      <span> <b> category: &nbsp; </b></span>
                      <span>{{ item.category }}</span>
                    </div>
                      <router-link
                        class="btn btn-primary btn-sm mt-5"
                        type="button"
                        :to="{ name: 'Detail', params: { id: item.id } }"
                      >
                        Details
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref, onMounted , defineComponent  } from "vue";
import axios from "axios";
import toastr from "toastr";
import { useRoute } from "vue-router";
import router from "@/router";
import "toastr/build/toastr.min.css";
import navbar from "@/components/navbar.vue";
import VueLoadingOverlay from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css'; // Import the styles
export default defineComponent ({
  components: {
    navbar,
    VueLoadingOverlay,
  },
  setup() {
    const loading = ref(true)
    const route = useRoute();
    const ProductDetail = ref("");
    const headingcat = ref('')
    onMounted(() => {
      Allcategory();
    });
    // Define the Single fuction
    const Allcategory = async () => {
        loading.value=true
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/category/${route.params.path}`
        );
        // console.log("Response is ", response);
        ProductDetail.value = response.data.products;
        headingcat.value=response.data.products[0].category
        loading.value=false
      } catch (error) {
        loading.value=false
        // console.error("Error fetching data:", error);
      }
    };
    return {
        ProductDetail,
        headingcat,
        loading
    };
  },
});
</script>
<style></style>
