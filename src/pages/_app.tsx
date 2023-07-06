import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FrigadeProvider } from "@frigade/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FrigadeProvider
      publicApiKey="api_public_ur9TPtSwcIQRhE2Bt9w3JiytQUJYU3HLA1C7Tchv1SjBdN8R5LIaMKrc64YMOHHu"
    //   userId="<OPTIONAL_USER_ID>"
      organizationId="Leetcode-V1"
    >
      <RecoilRoot>
        <Head>
          <title>Leetcode Clone</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Web application that contains leetcode problems and video solutions"
          />
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/fontawesome.min.css"  />
        </Head>
        <ToastContainer />
        <Component {...pageProps} />
      </RecoilRoot>
    </FrigadeProvider>
  );
}
