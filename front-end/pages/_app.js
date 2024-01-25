import React from "react";
import { Container } from "@mui/material";
import Header from "../components/header";
import Head from 'next/head';

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
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}