<template>
  <div>
    <navbar />
    <section class="pt-8 pt-md-9">
      <div class="container">
        <VueLoadingOverlay
          :active="loading"
          :can-cancel="false"
          :color="'#008080'"
          :background-color="'rgba(255, 255, 255, 0.8)'"
        ></VueLoadingOverlay>
        <!-- Categories -->
        <div class="row mt-6">
          <!-- Category -->
          <div
            class="col-md-3 mb-4"
            v-for="(item, index) in category"
            :key="index"
          >
            <div
              @click="categarProduct(item)"
              class="category card align-items-center text-decoration-none border-0 hover-lift-light py-4"
            >
              <span
                class="icon-circle icon-circle-lg bg-pastel-primary text-primary"
              >
                <img
                  :src="`../src/assets/${item}.svg`"
                  width="30px"
                  height="30px"
                  alt=""
                />
              </span>
              <span class="text-dark mt-3"> {{ item }} </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";
import toastr from "toastr";
import { useRoute } from "vue-router";
import router from "@/router";
import "toastr/build/toastr.min.css";
import navbar from "@/components/navbar.vue";
import VueLoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css"; // Import the styles
export default defineComponent({
  components: {
    navbar,
    VueLoadingOverlay,
  },
  setup() {
    const loading = ref(true);
    const category = ref("");
    const route = useRoute();
    onMounted(() => {
      Allcategory();
    });

    // Define the Single fuction
    const Allcategory = async () => {
      loading.value = true;
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/categories`
        );
        // console.log("Response is ", response);
        // console.log('dsfdsfafds',response.data)
        category.value = response.data;
        loading.value = false;
      } catch (error) {
        loading.value = false;
        // console.error("Error fetching data:", error);
      }
    };
    const categarProduct = async (name) => {
      try {
        //  console.log('categoray is = ',name)
        router.push({ name: "categiryproduct", params: { path: name } });
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    return {
      category,
      categarProduct,
      loading,
    };
  },
});
</script>
<style>
.category:hover {
  background-color: #f6f9fc;
  cursor: pointer;
}
/* .cardd {
  cursor: pointer;
  background-color: rgba(76, 111, 139, 0.192);
}
.cardd:hover {
  cursor: pointer;
  background-color: rgba(76, 111, 139, 0.329);
} */
body {
  /* background: #f6f9fc; */
  background-color: #eee;
}
.hover-lift-light {
  transition: box-shadow 0.25s ease, transform 0.25s ease, color 0.25s ease,
    background-color 0.15s ease-in;
}
.text-decoration-none {
  text-decoration: none !important;
}
.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}
.align-items-center {
  align-items: center !important;
}
.border-0 {
  border: 0 !important;
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(30, 46, 80, 0.09);
  border-radius: 0.25rem;
}

.icon-circle-lg {
  width: 4rem;
  height: 4rem;
}
.icon-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
}
.bg-pastel-primary {
  background-color: #e9f3ff !important;
}

.mt-6 {
  margin-top: 4rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.badge {
  padding: 0.4rem 0.65rem 0.25rem;
}
.text-uppercase-bold-sm {
  text-transform: uppercase !important;
  font-weight: 500 !important;
  letter-spacing: 2px !important;
  font-size: 0.85rem !important;
}
.bg-pastel-primary {
  background-color: #e9f3ff !important;
}

.icon-circle-lg {
  width: 4rem;
  height: 4rem;
}
.icon-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
}
.bg-pastel-primary {
  background-color: #e9f3ff !important;
}

.icon-circle[class*="text-"] [fill]:not([fill="none"]),
.icon-circle[class*="text-"] svg:not([fill="none"]),
.svg-icon[class*="text-"] [fill]:not([fill="none"]),
.svg-icon[class*="text-"] svg:not([fill="none"]) {
  fill: currentColor !important;
}
.icon-circle-lg > svg {
  width: 2rem;
  height: 2rem;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(35, 38, 45, 0.09) !important;
}

.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n + 3),
.input-group:not(.has-validation)
  > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group-lg > .btn,
.input-group-lg > .form-control,
.input-group-lg > .form-select,
.input-group-lg > .input-group-text {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}
.border-0 {
  border: 0 !important;
}
.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #1f2c73;
  text-align: center;
  white-space: nowrap;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
}
</style>
