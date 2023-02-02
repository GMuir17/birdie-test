import { useState, useEffect } from "react";
import { AppBar, Toolbar, TextField } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";

import { formatDate, defaultDay } from "./utils";

const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState<Dayjs | null>(dayjs(defaultDay));
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    const newStartDate = formatDate(newValue);
    setDatePickerOpen(false);
    setSearchParams((oldParams) => {
      oldParams.set("startDate", newStartDate);
      return oldParams;
    });
  };

  useEffect(() => {
    if (!searchParams) return;
    const paramStartDate = searchParams.get("startDate");
    if (paramStartDate) setDate(dayjs(paramStartDate));
  }, [searchParams]);

  return (
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
            minDate={dayjs(defaultDay)}
            maxDate={dayjs(defaultDay).add(1, "week")}
          />
        </LocalizationProvider>
      </Toolbar>
    </AppBar>
  );
};

export default FilterBar;
