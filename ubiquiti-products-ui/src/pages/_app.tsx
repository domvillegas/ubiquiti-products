import React from 'react';
import type { AppProps } from 'next/app';
import { DeviceDataProvider } from '@/contexts/deviceData';
import Layout from '@/components/Layout/Layout';
import '../styles/globals.css';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import { ResultsLayoutProvider } from '@/contexts/display';
import { FiltersProvider } from '@/contexts/filters';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}
