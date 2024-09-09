import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define an interface for the parameters

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/v1/" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query<any, any>({
      query: (params) => ({
        url: params.genre ? `blog/genres` : "blog",
        params: params,
      }),
      providesTags: ["Blog"],
    }),
    addBlog: builder.mutation<any, void>({
      query: (body) => ({
        url: "blog",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const { useGetBlogsQuery, useAddBlogMutation } = blogApi;
