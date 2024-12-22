import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://real-time-amazon-data.p.rapidapi.com/",
    rateLimit: {
      max: 5, // Maximum number of requests per second
      timeWindow: 1000, // Time window in milliseconds
    },
    headers: {
      "x-rapidapi-key": "fe0ebe37femsh07b53786ff1b0a3p10f9d7jsn257e28458744",
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  }),
  endpoints: (builder) => ({
    productDetail: builder.query({
      query: (search) => `product-details?asin=${search}&country=IN`,
    }),
    deals: builder.query({
      query: () => "deals-v2?country=IN",
    }),
    productSearch: builder.query({
      query: (args) => {
        const { search, page = 1 } = args;
        return {
          url: `search?query=${search}&page=${page}&country=IN`,
        };
      },
    }),
    productCategory: builder.query({
      query: (category) =>
        `best-sellers?category=${category}&type=BEST_SELLERS&page=1&country=IN`,
    }),
  }),
});

export const {
  useDealsQuery,
  useProductDetailQuery,
  useProductSearchQuery,
  useProductCategoryQuery,
} = productsApi;
