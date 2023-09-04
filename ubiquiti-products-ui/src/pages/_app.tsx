import React from 'react';
import type { AppProps } from 'next/app';
import { DeviceDataProvider } from '@/contexts/deviceData';
import Layout from '@/components/Layout/Layout';
import '../styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { ResultsLayoutProvider } from '@/contexts/display';
import { FiltersProvider } from '@/contexts/filters';
import Head from 'next/head';
import favicon from '../assets/logos/favicon.ico';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ubiquiti Devices</title>
        <link rel="shortcut icon" href={favicon.src} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <DeviceDataProvider>
        <FiltersProvider>
          <ResultsLayoutProvider>
            <Layout>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Layout>
          </ResultsLayoutProvider>
        </FiltersProvider>
      </DeviceDataProvider>
    </>
  );
}
