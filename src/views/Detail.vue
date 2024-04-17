<template>
  <div class="pb-5" style="background-color: rgb(238, 238, 238)">
    <navbar />
    <div class="container mt-5 bg-white p-3 custom_radius">
      <VueLoadingOverlay :active="loading" :can-cancel="false" :color="'#008080'" :background-color="'rgba(255, 255, 255, 0.8)'"></VueLoadingOverlay>
      <div class="row">
        <div class="col-md-5">
          <div class="main-img">
            <img class="img-fluid" :src="thumbnail" alt="ProductS" style="border-radius:5px;" />
            <div class="row my-3 previews">
              <div
                class="col-md-3 mt-1"
                v-for="(item, index) in images"
                :key="index"
              >
                <img
                @click="changeimage(item)"
                  class="img-fluid sub_images"
                  :src="item"
                  alt="Sale"
                  style="width: 100%"
                />
              </div>
              <!-- <div class="col-md-3">
              <img
                class="w-100"
                src="https://cdn.pixabay.com/photo/2015/07/24/18/38/model-858749_960_720.jpg"
                alt="Sale"
              />
            </div>
            <div class="col-md-3">
              <img
                class="w-100"
                src="https://cdn.pixabay.com/photo/2015/07/24/18/39/model-858751_960_720.jpg"
                alt="Sale"
              />
            </div>
            <div class="col-md-3">
              <img
                class="w-100"
                src="https://cdn.pixabay.com/photo/2015/07/24/18/37/model-858748_960_720.jpg"
                alt="Sale"
              />
            </div> -->
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="main-description px-2">
            <div class="category text-bold">
              Category: {{ productdata.category }}
            </div>
            <div class="product-title text-bold my-3">
              {{ productdata.title }}
            </div>

            <div class="price-area my-4">
              <p class="old-price mb-1">
                <span class="old-price-discount text-danger"
                  >({{ productdata.discountPercentage }}% off)</span
                >
              </p>
              <p class="new-price text-bold mb-1">${{ productdata.price }}</p>
              <p class="text-secondary mb-1">
                (Additional tax may apply on checkout)
              </p>
            </div>
          </div>

          <div class="product-details my-4">
            <p class="details-title text-color mb-1">Product Details</p>
            <p class="description">
              {{ productdata.description }}
            </p>
          </div>

          <div class="row questions bg-light p-3">
            <div class="col-md-1 icon">
              <svg
                class="svg-inline--fa fa-rocketchat questions-icon"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="rocketchat"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M284.046,224.8a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,284.046,224.8Zm-110.45,0a34.114,34.114,0,1,0,34.317,34.113A34.217,34.217,0,0,0,173.6,224.8Zm220.923,0a34.114,34.114,0,1,0,34.317,34.113A34.215,34.215,0,0,0,394.519,224.8Zm153.807-55.319c-15.535-24.172-37.31-45.57-64.681-63.618-52.886-34.817-122.374-54-195.666-54a405.975,405.975,0,0,0-72.032,6.357,238.524,238.524,0,0,0-49.51-36.588C99.684-11.7,40.859.711,11.135,11.421A14.291,14.291,0,0,0,5.58,34.782C26.542,56.458,61.222,99.3,52.7,138.252c-33.142,33.9-51.112,74.776-51.112,117.337,0,43.372,17.97,84.248,51.112,118.148,8.526,38.956-26.154,81.816-47.116,103.491a14.284,14.284,0,0,0,5.555,23.34c29.724,10.709,88.549,23.147,155.324-10.2a238.679,238.679,0,0,0,49.51-36.589A405.972,405.972,0,0,0,288,460.14c73.313,0,142.8-19.159,195.667-53.975,27.371-18.049,49.145-39.426,64.679-63.619,17.309-26.923,26.07-55.916,26.07-86.125C574.394,225.4,565.634,196.43,548.326,169.485ZM284.987,409.9a345.65,345.65,0,0,1-89.446-11.5l-20.129,19.393a184.366,184.366,0,0,1-37.138,27.585,145.767,145.767,0,0,1-52.522,14.87c.983-1.771,1.881-3.563,2.842-5.356q30.258-55.68,16.325-100.078c-32.992-25.962-52.778-59.2-52.778-95.4,0-83.1,104.254-150.469,232.846-150.469s232.867,67.373,232.867,150.469C517.854,342.525,413.6,409.9,284.987,409.9Z"
                ></path>
              </svg>
            </div>
            <div class="col-md-11 text">
              Have a question about our products at E-Store? Feel free to
              contact our representatives via live chat or email.
            </div>
          </div>

          <div class="delivery my-4">
            <p class="font-weight-bold mb-0">
              <span><i class="fa-solid fa-truck"></i></span>
              <b>Rating</b>
            </p>
            <p class="text-secondary">{{ productdata.rating }}</p>
          </div>
          <div class="delivery-options my-4">
            <p class="font-weight-bold mb-0">
              <span><i class="fa-solid fa-filter"></i></span>
              <b>Stock</b>
            </p>
            <p class="text-secondary">{{ productdata.stock }}</p>
          </div>
          <div class="buttons d-flex my-5">
            <div class="block">
              <a href="#" class="shadow btn custom-btn">Wishlist</a>
            </div>
            <div class="block">
              <!-- <button class="shadow btn custom-btn">Go Back</button> -->
              <router-link
                class="shadow btn custom-btn"
                :to="{ name: 'Mainpage' }"
              >
                Go Back
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, defineComponent } from "vue";
import axios from "axios";
import toastr from "toastr";
import { useRoute } from "vue-router";
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
    const productdata = ref("");
    const thumbnail = ref("");
    const route = useRoute();
    const images = ref("");
    onMounted(() => {
      SingleProduct();
    });

    // Define the Single fuction
    const SingleProduct = async () => {
      loading.value=true
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${route.params.id}`
        );
        // console.log("Response is ", response.data);
        productdata.value = response.data;
        images.value = response.data.images;
        thumbnail.value=response.data.thumbnail
        // console.log("imGWS", images.value);
        loading.value=false
      } catch (error) {
        // console.error("Error fetching data:", error);
        loading.value=false
      }
    };

    const changeimage =  (image) => {
      // console.log('image url is = ',image)
      thumbnail.value=image
    }
    return {
      changeimage,
      productdata,
      images,
      thumbnail,
      loading
    };
  },
});
</script>
<style>
.sub_images{
  cursor: pointer !important;
}
.custom_radius{
    border-radius: 5px;
}
.text-bold {
  font-weight: 800;
}

text-color {
  color: #0093c4;
}

/* Main image - left */
.main-img img {
  width: 100%;
}

/* Preview images */
.previews img {
  width: 100%;
  height: 80px;
  border-radius: 5px !important;
}

.main-description .category {
  text-transform: uppercase;
  color: #0093c4;
}

.main-description .product-title {
  font-size: 2.5rem;
}

.old-price-discount {
  font-weight: 600;
}

.new-price {
  font-size: 2rem;
}

.details-title {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.2rem;
  color: #757575;
}

.buttons .block {
  margin-right: 5px;
}

.quantity input {
  border-radius: 0;
  height: 40px;
}

.custom-btn {
  text-transform: capitalize;
  background-color: #0093c4;
  color: white;
  width: 150px;
  height: 40px;
  border-radius: 0;
}

.custom-btn:hover {
  background-color: #0093c4 !important;
  font-size: 18px;
  color: white !important;
}

.similar-product img {
  height: 400px;
}

.similar-product {
  text-align: left;
}

.similar-product .title {
  margin: 17px 0px 4px 0px;
}

.similar-product .price {
  font-weight: bold;
}

.questions .icon i {
  font-size: 2rem;
}

.questions-icon {
  font-size: 2rem;
  color: #0093c4;
}

/* Small devices (landscape phones, less than 768px) */
@media (max-width: 767.98px) {
  /* Make preview images responsive  */
  .previews img {
    width: 100%;
    height: auto;
  }
}
</style>
