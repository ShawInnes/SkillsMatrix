import {QueryClient} from "react-query";

export default new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Number(process.env.REACT_APP_QUERY_CACHE_TIME),
    }
  }
});

