import Header from "../Components/Header/Header";
import ListCard from "../Components/ListCard/ListCard";
import Categories from "../Components/Categories/Categories";
import { useQuery } from "@tanstack/react-query";
import { getAllBlog } from "../api/blog";
import { useDispatch, useSelector } from "react-redux";
import { addGenres } from "../reducers/blog.reducer";
import { RootState } from "../store";
import { useEffect, useMemo } from "react";

export const HomePage = () => {
  const genres = useSelector((state: RootState) => state.blog.genres);

  const dispatch = useDispatch();

  // Fetching blogs
  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlog(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize unique genres
  const uniqueGenres = useMemo(() => {
    if (!blogs) return [];
    return [
      "All",
      ...new Set(blogs.flatMap((blog: { genres: unknown }) => blog.genres)),
    ];
  }, [blogs]);

  // Dispatch genres when unique genres are ready
  useEffect(() => {
    if (uniqueGenres.length > 1 && genres.length === 0) {
      dispatch(addGenres(uniqueGenres));
    }
  }, [uniqueGenres, genres.length, dispatch]);

  return (
    <div>
      <Header />
      <div className="lg:pt-16 lg:px-20 pt-10 px-2">
        <Categories genres={genres} />
        {blogsLoading ? (
          <h3>Loading blogs...</h3>
        ) : blogsError ? (
          <h3>Error loading blogs</h3>
        ) : (
          <ListCard data={blogs} />
        )}
      </div>
    </div>
  );
};
