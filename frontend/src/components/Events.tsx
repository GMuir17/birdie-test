import { useState } from "react";
import { Box, AppBar, Toolbar, Container, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs, { Dayjs } from "dayjs";

import { useQuery } from "react-query";
import axios from "axios";
import EventCard from "./EventCard";

const formatDate = (date: Dayjs | string | null, daysToAdd?: number) => {
  const dateFormat = "YYYY-MM-DDTHH:mm:ssZ[Z]";
  if (daysToAdd) return dayjs(date).add(daysToAdd, "day").format(dateFormat);
  return dayjs(date).format(dateFormat);
};

const BasicList = () => {
  const firstDay = "2019-04-23T00:00:00.000Z";
  const [date, setDate] = useState<Dayjs | null>(dayjs(firstDay));
  const [startDate, setStartDate] = useState<string>(formatDate(firstDay));
  const [endDate, setEndDate] = useState<string>(formatDate(firstDay, 1));
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  console.log("banana here", process.env.NODE_ENV);
  const { data, isLoading } = useQuery(
    ["events", startDate, endDate],
    async () => {
      const url =
        process.env.NODE_ENV === "development"
          ? process.env.REACT_APP_LOCAL_API_URL
          : process.env.REACT_APP_PRODUCTION_API_URL;

      const res = await axios.get(
        `${url}events?startDate=${startDate}&endDate=${endDate}`
      );
      return res.data;
    }
  );

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    setStartDate(formatDate(newValue));
    setEndDate(formatDate(newValue, 1));
    setDatePickerOpen(false);
  };

  return (
    <Box>
      <AppBar
        sx={{ position: "sticky", height: "15vh", backgroundColor: "white" }}
      >
        <Toolbar sx={{ height: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Visit Date"
              inputFormat="ddd DD MMMM YYYY"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              open={datePickerOpen}
              onOpen={() => setDatePickerOpen(true)}
              minDate={dayjs(firstDay)}
              maxDate={dayjs(firstDay).add(1, "week")}
            />
          </LocalizationProvider>
        </Toolbar>
      </AppBar>
      {isLoading && <div>Loading...</div>}
      <Container maxWidth="sm">
        {data &&
          data.events.map((event: any) => (
            <Box sx={{ py: 2 }} key={event.id}>
              <EventCard event={event} />
            </Box>
          ))}
      </Container>
    </Box>
  );
};

export default BasicList;
