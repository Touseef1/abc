<template>
  <div>
    <navbar />
    <div class="p-5" style="background-color: rgb(238, 238, 238)">
      <VueLoadingOverlay
        :active="loading"
        :can-cancel="false"
        :color="'#008080'"
        :background-color="'rgba(255, 255, 255, 0.8)'"
      ></VueLoadingOverlay>
      <div class="box p-5 bg-white">
        <div
          tabindex="0"
          class="vld-overlay is-active"
          aria-busy="false"
          aria-label="Loading"
          style="display: none"
        >
          <div class="vld-background" style="backdrop-filter: blur(2px)"></div>
          <div class="vld-icon">
            <svg
              viewBox="0 0 38 38"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              stroke="#000"
            >
              <g fill="none" fill-rule="evenodd">
                <g transform="translate(1 1)" stroke-width="2">
                  <circle stroke-opacity=".25" cx="18" cy="18" r="18"></circle>
                  <path d="M36 18c0-9.94-8.06-18-18-18">
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 18 18"
                      to="360 18 18"
                      dur="0.8s"
                      repeatCount="indefinite"
                    ></animateTransform>
                  </path>
                </g>
              </g>
            </svg>
          </div>
        </div>
        <div class="grid grid-cols-12 gap-x-5">
          <!---->
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >Title</label
                ><input
                  v-model="title"
                  id="update-profile-form-3"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >Brand</label
                ><input
                  v-model="brand"
                  id="update-profile-form-3"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >category</label
                ><input
                  v-model="category"
                  required
                  id="update-profile-form-3"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >rating</label
                ><input
                  v-model="rating"
                  id="update-profile-form-3"
                  type="number"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >stock</label
                ><input
                  v-model="stock"
                  id="update-profile-form-3"
                  type="number"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >Discount</label
                ><input
                  v-model="discountPercentage"
                  id="update-profile-form-3"
                  type="number"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <div class="mt-3">
              <div>
                <label for="update-profile-form-1" class="form-label"
                  >Description</label
                ><input
                  v-model="description"
                  id="update-profile-form-3"
                  type="text"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-5 grid grid-cols-12 gap-x-5">
          <div class="col-span-12 ml-auto">
            <button
              type="button"
              class="btn btn-primary cutome_color"
              @click="UpdateProduct"
            >
              Save Change
              <!---->
            </button>
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
import "toastr/build/toastr.min.css";
import { useRoute } from "vue-router";
import router from "@/router";
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
    const route = useRoute();
    const Product = ref("");
    const title = ref("");
    const brand = ref("");
    const description = ref("");
    const discountPercentage = ref("");
    const price = ref("");
    const stock = ref("");
    const rating = ref("");
    const category = ref("");
    onMounted(() => {
      getSingleProduct();
    });
    const getSingleProduct = async () => {
      loading.value = true;
      if (route.params.id == -1) {
        loading.value = false;
        return;
      }
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${route.params.id}`
        );
        // console.log("Response is ", response.data);
        stock.value = response.data.stock;
        rating.value = response.data.rating;
        category.value = response.data.category;
        discountPercentage.value = response.data.discountPercentage;
        price.value = response.data.price;
        description.value = response.data.description;
        brand.value = response.data.brand;
        title.value = response.data.title;
        // console.log("title", rating.value);
        loading.value = false;
      } catch (error) {
        loading.value = false;
        // console.error("Error fetching data:", error);
      }
    };
    const UpdateProduct = async () => {
      if (
        discountPercentage.value.length < 1 ||
        stock.value.length < 1 ||
        rating.value.length < 1 ||
        category.value.length < 1 ||
        description.value.length < 1 ||
        brand.value.length < 1 ||
        title.value.length < 1
      ) {
        toastr.error("No Empty field");
      } else {
        loading.value = true;
        try {
          if (route.params.id == -1) {
            const response = await axios.post(
              `https://dummyjson.com/products/add`,
              {
                stock: stock.value,
                rating: rating.value,
                category: category.value,
                discountPercentage: discountPercentage.value,
                price: price.value,
                description: description.value,
                brand: brand.value,
                title: title.value,
              }
            );
            // console.log("response to add product is = ", response);
            if (response.data.id != null) {
              toastr.success("Add Successfully");
              router.push({ name: "Mainpage" });
              loading.value = false;
            }
          } else {
            const response = await axios.put(
              `https://dummyjson.com/products/${route.params.id}`,
              {
                stock: stock.value,
                rating: rating.value,
                category: category.value,
                discountPercentage: discountPercentage.value,
                price: price.value,
                description: description.value,
                brand: brand.value,
                title: title.value,
              }
            );
            // console.log("response is = ", response);
            loading.value = false;
            toastr.success("Update Successfully");
            router.push({ name: "Mainpage" });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          loading.value = false;
        }
      }
    };
    return {
      getSingleProduct,
      Product,
      stock,
      rating,
      category,
      discountPercentage,
      price,
      description,
      brand,
      title,
      UpdateProduct,
      loading,
    };
  },
});
</script>
<style>
.box {
  margin-left: 100px; /* Adjust the value as needed */
  margin-right: 100px; /* Adjust the value as needed */
  border-radius: 5px;
}
</style>
