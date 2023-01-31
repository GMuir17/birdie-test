import { Container, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import BasicList from "./components/BasicList";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <BasicList />
        </Box>
      </Container>
    </QueryClientProvider>
  );
}
