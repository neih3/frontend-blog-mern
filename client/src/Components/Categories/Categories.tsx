import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { getAllBlog, getBlogbyGenre } from "../../api/blog";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genres: any[];
}

const Categories = ({ genres }: Props) => {
  const queryClient = useQueryClient();

  const getBlogsByGenreMutation = useMutation({
    mutationFn: async (genre: string) => {
      if (genre === "All") {
        return await getAllBlog();
      } else {
        return await getBlogbyGenre(genre);
      }
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["blogs"], data);
    },
  });

  return (
    <div className="text-slate-300  flex items-center gap-2 mb-6">
      <h3 className="font-inter">Guides</h3>
      <ul className="flex gap-3 font-jet text-base">
        {genres.map((item: string) => (
          <li key={item}>
            <Link to={`/${item}`}>
              <Button
                onClick={() => getBlogsByGenreMutation.mutate(item)}
                style={{
                  border: "1px solid rgb(58, 80, 252)",
                  borderRadius: "8px",
                  boxShadow:
                    "rgba(58, 80, 252, 0.404) 0px 0px 0px 0px, rgba(58, 80, 252, 0.365) 0px 0px 0px 0px, rgba(58, 80, 252, 0.18) 0px 0px 0px 0px", // Không có dấu chấm phẩy ở cuối
                }}
              >
                {item}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
