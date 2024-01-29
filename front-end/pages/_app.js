import React from "react";
import { Container } from "@mui/material";
import Header from "../components/header";
import Head from 'next/head';
import { useRouter } from "next/router";
import '../styles/global.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'; // Import your custom theme


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
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}