import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";

import Header from "../Components/Header/Header";
import ListCard from "../Components/ListCard/ListCard";
import Categories from "../Components/Categories/Categories";
import { getAllBlog } from "../api/blog";
import { addGenres } from "../reducers/blog.reducer";
import { RootState } from "../store";
import override from "../commom/override";

// Types
interface Blog {
  genres: string[];
  // Add other blog properties as needed
}

// Loading component for better reusability
const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="relative top-1/4">
      <BeatLoader
        color="#BA55D3"
        loading={true}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  </div>
);

export const HomePage = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state: RootState) => state.blog.genres);

  // Query blogs with error handling
  const {
    data: blogs = [],
    isLoading,
    error,
  } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getAllBlog,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

  // Memoize unique genres calculation
  const uniqueGenres = useMemo(() => {
    if (!blogs.length) return ["All"];

    const genreSet = new Set<string>(blogs.flatMap((blog) => blog.genres));

    return ["All", ...Array.from(genreSet)];
  }, [blogs]);

  // Update genres in Redux store
  useEffect(() => {
    if (uniqueGenres.length > 1 && !genres.length) {
      dispatch(addGenres(uniqueGenres));
    }
  }, [uniqueGenres, genres.length, dispatch]);

  // Render loading state
  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="lg:pt-16 lg:px-20 pt-10 px-2">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div>
        <Header />
        <div className="lg:pt-16 lg:px-20 pt-10 px-2">
          <div className="text-red-500 text-center">
            Error loading blogs: {(error as Error).message}
          </div>
        </div>
      </div>
    );
  }

  // Render main content
  return (
    <div>
      <Header />
      <div className="lg:pt-16 lg:px-20 pt-10 px-2">
        <Categories genres={genres} />
        <ListCard data={blogs} />
      </div>
    </div>
  );
};
