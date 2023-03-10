import { Box } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";

import Events from "./components/Events";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={
            <Box sx={{ backgroundColor: "#d3d3d3", height: "100vh" }}>
              <Events />
            </Box>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
}
