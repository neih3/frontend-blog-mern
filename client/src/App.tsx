import { useQuery } from "@tanstack/react-query";
import useRouterElement from "./hooks/useRouterElement";
import { getUser } from "./api/auth";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/user.reducer";
import { useEffect } from "react";

export default function App() {
  const routeElement = useRouterElement();

  const dispatch = useDispatch();

  console.log("render");

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  return <>{routeElement}</>;
}
