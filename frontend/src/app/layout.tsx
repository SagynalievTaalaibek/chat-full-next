'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClient } from '@tanstack/query-core';
import { ThemeProvider } from '@mui/system';
import { QueryClientProvider } from '@tanstack/react-query';
import { Container, CssBaseline, Typography } from '@mui/material';
import theme from '@/theme';

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline/>
          <html lang="en">
          <body>
          <header style={{marginBottom: "10px"}}>
            <Typography variant="h3" sx={{pt: 1}}>Chat</Typography>
          </header>
          <main>
            <Container maxWidth="xl">
              {children}
            </Container>
          </main>
          </body>
          </html>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
