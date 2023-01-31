import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const BasicList = () => {
  const { data, isLoading } = useQuery(
    `basic-test`,
    async () => {
      const res = await axios.get(`http://localhost:8000/events`);
      console.log("banana data", res.data);
      return res.data;
    },
    { staleTime: 60000 }
  );

  useEffect(() => {
    console.log("banana data", { data });
  }, [data]);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Basic list of events
      </Typography>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.events.map((event: any) => <div key={event.id}>{event.id}</div>)}
    </Box>
  );
};

export default BasicList;
