import React from "react";
import { Card } from "../Card/Card";
import Blog from "../../types/blog.type";
import { Link } from "react-router-dom";

const ListCard = ({ data }: any) => {
  return (
    <div className="container mx-auto px-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((item: Blog) => (
          <li key={item._id}>
            <Link to={`/detail/${item._id}`}>
              <Card data={item}></Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;
