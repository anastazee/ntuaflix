import React from "react";
import { Container } from "@mui/material";
import Header from "../components/header";
import Head from 'next/head';
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ntuaflix</title>
      </Head>
      <Header />
      <Container sx={{ pt: 8, pb: 8 }}>{children}</Container>
    </>
  );
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}