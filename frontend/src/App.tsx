import { Container, Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

import BasicList from "./components/BasicList";
import Events from "./components/Events";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Box>
        <Events />
      </Box>
    </QueryClientProvider>
  );
}
