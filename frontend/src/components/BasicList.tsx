import { useState } from "react";
import {
  Typography,
  Box,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const BasicList = () => {
  const [age, setAge] = useState("10");

  const { data, isLoading } = useQuery(
    `basic-test`,
    async () => {
      const res = await axios.get(`http://localhost:8000/dev/events`);
      console.log("banana data", res.data);
      return res.data;
    },
    { staleTime: 60000 }
  );

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Basic list of events
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={age}
          label="Age"
          onChange={handleChange}
          inputProps={{ "data-testid": "select-input" }}
          SelectDisplayProps={{ "data-testid": "select-button" } as {}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem id="select-button" value={20}>
            Twenty
          </MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      {isLoading && <div>Loading...</div>}
      {data &&
        data.events.map((event: any) => <div key={event.id}>{event.id}</div>)}
    </Box>
  );
};

export default BasicList;
