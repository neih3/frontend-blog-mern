import { memo } from "react";
import { Card } from "../Card/Card";

import { Link } from "react-router-dom";
import BlogPost from "../../types/blog.type";
import LazyLoad from "react-lazyload";

interface Props {
  data: BlogPost[];
}

const ListCard = ({ data }: Props) => {
  return (
    <div className="container mx-auto lg:px-4 px-2">
      <ul className="grid lg:grid-cols-4 grid-cols-1 lg:gap-10 md:grid-cols-2 gap-4 md:gap-5">
        {data?.map((item: BlogPost) => (
          <LazyLoad key={item._id}>
            <li>
              <Link
                to={`/detail/${item.title}`}
                state={{
                  blogId: item._id,
                }}
              >
                <Card data={item}></Card>
              </Link>
            </li>
          </LazyLoad>
        ))}
      </ul>
    </div>
  );
};

export default memo(ListCard);
