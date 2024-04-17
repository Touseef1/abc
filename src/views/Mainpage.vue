<template>
  <div>
    <!-- Render the navbar component -->
    <navbar />
    <VueLoadingOverlay
      :active="loading"
      :can-cancel="false"
      :color="'#008080'"
      :background-color="'rgba(255, 255, 255, 0.8)'"
    ></VueLoadingOverlay>
    <!-- Your existing code continues here -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          </div>
          <div class="modal-body">Are you sure to Delete Product ?</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              id="clsbtn"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary d-flex"
              @click="deleteItem()"
            >
              Delete
              <svg
                v-if="buttonSpiner"
                width="18"
                viewBox="-2 -2 42 42"
                xmlns="http://www.w3.org/2000/svg"
                stroke="white"
                class="w-50 h-full pt-1 ps-1"
              >
                <g fill="none" fill-rule="evenodd">
                  <g transform="translate(1 1)" stroke-width="4">
                    <circle stroke-opacity=".5" cx="18" cy="18" r="18"></circle>
                    <path d="M36 18c0-9.94-8.06-18-18-18">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 18 18"
                        to="360 18 18"
                        dur="1s"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <section style="background-color: #eee">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-md-12 col-xl-10">
            <div class="row">
              <div class="col-9">
                <router-link
                  class="btn btn-primary btn-sm mt-2 mb-2"
                  type="button"
                  :to="{ name: 'UpdateProduct', params: { id: -1 } }"
                >
                  Add Product
                </router-link>
              </div>
              <div class="col-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  v-model="searchQuery"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="row justify-content-center mb-3"
          v-for="(item, index) in ProductDetail"
          :key="index"
          :class="{ blur: isBlurred }"
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
                      <span> <b> category: &nbsp; </b></span>
                      <span>{{ item.category }}</span>
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
                      <!-- <button class="btn btn-primary btn-sm" type="button">
                        Details
                      </button> -->
                      <router-link
                        class="btn btn-primary btn-sm"
                        type="button"
                        :to="{ name: 'Detail', params: { id: item.id } }"
                      >
                        Details
                      </router-link>
                      <router-link
                        class="btn btn-outline-primary btn-sm mt-2"
                        :to="{ name: 'UpdateProduct', params: { id: item.id } }"
                      >
                        Update
                      </router-link>
                      <button
                        class="btn btn-outline-danger btn-sm mt-2"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        @click="Item(item.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <div v-if="noResult">No Product Found....</div>
        </div>
        <div class="row justify-content-center">
          <div class="col-md-12 col-xl-10">
            <div class="row">
              <div class="col-10">
                <paginate
                  v-model="currentPage"
                  :page-count="totalPages"
                  :click-handler="fetchProducts"
                  :prev-text="'Prev'"
                  :next-text="'Next'"
                  :container-class="'pagination'"
                >
                </paginate>
              </div>
              <div class="col-2">
                <select
                  class="form-select"
                  v-model="productsPerPage"
                  @change="fetchProducts(1)"
                >
                  <option>10</option>
                  <option>15</option>
                  <option>35</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { ref, onMounted, defineComponent, watch } from "vue";
import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import navbar from "@/components/navbar.vue";
import VueLoadingOverlay from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css"; // Import the styles
import Paginate from "vuejs-paginate-next";
export default defineComponent({
  components: {
    navbar,
    VueLoadingOverlay,
    Paginate,
  },
  setup() {
    const isBlurred = ref(false);
    const searchQuery = ref("");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const productsPerPage = ref(10); // Number of products per page
    const buttonSpiner = ref(false);
    const loading = ref(true);
    const paginatedProductDetail = ref([]);
    const ProductDetail = ref([]);
    const noResult = ref(false);
    // Call the sayHello function when the component is mounted
    onMounted(() => {
      fetchProducts(currentPage.value);
    });

    // Fetch products for the given page number
    const fetchProducts = async (pageNumber) => {
      loading.value = true;
      const skip = (pageNumber - 1) * productsPerPage.value;
      try {
        const response = await axios.get(
          `https://dummyjson.com/products?skip=${skip}&limit=${productsPerPage.value}`
        );
        ProductDetail.value = response.data.products;
        const totalCount = response.data.total;
        totalPages.value = Math.ceil(totalCount / productsPerPage.value);
        loading.value = false;
        paginateProducts();
      } catch (error) {
        loading.value = false;
        console.error("Error fetching data:", error);
      }
    };

    // Paginate products based on current page
    const paginateProducts = () => {
      const startIndex = (currentPage.value - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      paginatedProductDetail.value = ProductDetail.value.slice(
        startIndex,
        endIndex
      );
    };
    const delteid = ref();
    const Item = (id) => {
      delteid.value = id;
      // console.log("sadfdsaf", delteid.value);
    };
    const deleteItem = async () => {
      buttonSpiner.value = true;
      try {
        const response = await axios.delete(
          `https://dummyjson.com/products/${delteid.value}`
        );
        // console.log("Response is ", response);
        // console.log("Response is ", response.data.isDeleted);
        if (response.data.isDeleted === true) {
          const deletedProductId = response.data.id;
          ProductDetail.value = ProductDetail.value.filter(
            (item) => item.id !== deletedProductId
          );
          buttonSpiner.value = false;
          const clsbtn = document.getElementById("clsbtn");
          clsbtn.click();
          toastr.success("Deleted Successfully");
        } else {
          toastr.error("Failed to delete");
        }
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };

    // const openModal1 = (id) => {
    //   console.log("delete production id", id);
    //   const modalElement = document.getElementById("delete-modal-preview1");
    //   if (modalElement) {
    //     modalElement.classList.add("show");
    //   }
    // };

    // const closeModal1 = () => {
    //   const modalElement = document.getElementById("delete-modal-preview1");
    //   if (modalElement) {
    //     modalElement.classList.remove("show");
    //   }
    // };

    // Function to fetch products based on search query
    const searchProducts = async () => {
      isBlurred.value = true;
      noResult.value = false;
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${searchQuery.value}`
        );
        ProductDetail.value = response.data.products;
        isBlurred.value = false;
        if (searchQuery.value.length < 1) {
          noResult.value = false;
          fetchProducts(currentPage.value);
        } else if (response.data.products.length < 1) {
          noResult.value = true;
        } else if (searchQuery.value.length < 1) {
          noResult.value = false;
        }
      } catch (error) {
        isBlurred.value = false;
      }
    };

    // Watch for changes in search query and fetch products accordingly
    watch(() => {
      searchProducts();
    });

    // Return anything needed by the template
    return {
      // openModal1,
      // closeModal1,
      deleteItem,
      ProductDetail,
      Item,
      loading,
      buttonSpiner,
      currentPage,
      totalPages,
      fetchProducts,
      productsPerPage,
      paginatedProductDetail,
      searchQuery,
      noResult,
      isBlurred,
    };
  },
});
</script>

<style>
@media (max-width: 767.98px) {
  .border-sm-start-none {
    border-left: none !important;
  }
}
.blur {
  filter: blur(10px); /* Adjust the blur amount as needed */
}
</style>
