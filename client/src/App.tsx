import { useQuery } from "@tanstack/react-query";
import useRouterElement from "./hooks/useRouterElement";
import { getUser } from "./api/auth";
import { useDispatch } from "react-redux";
import { addUser } from "./reducers/user.reducer";
import { useEffect } from "react";
import { getTest } from "./api/test";

export default function App() {
  const routeElement = useRouterElement();

  const dispatch = useDispatch();

  // const asyncFunc = async () => {
  //   const res = await getTest();
  //   console.log(res);
  // };
  // asyncFunc();
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
