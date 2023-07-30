import { StoreProvider } from "@/common/StoreProvider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider {...pageProps}>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </StoreProvider>
  );
}
