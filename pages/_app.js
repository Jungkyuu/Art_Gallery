import RouteGuard from "@/components/RouteGuard";
import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

import { SWRConfig } from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }
  return res.json();
};
export default function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
      {" "}
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </RouteGuard>
  );
}
