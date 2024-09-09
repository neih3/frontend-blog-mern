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

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getAllBlog(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const uniqueGenres = useMemo(() => {
    if (!data) return [];
    return [
      "All",
      ...new Set(data.flatMap((blog: { genres: unknown }) => blog.genres)),
    ];
  }, [data]);

  useEffect(() => {
    if (uniqueGenres.length > 1 && genres.length === 0) {
      dispatch(addGenres(uniqueGenres));
    }
  }, [uniqueGenres, genres.length, dispatch]);

  return (
    <div>
      <Header></Header>
      <div className="pt-16 px-48">
        <Categories genres={genres}></Categories>
        {isLoading ? <h3>Loading ...</h3> : <ListCard data={data}></ListCard>}
      </div>
    </div>
  );
};
