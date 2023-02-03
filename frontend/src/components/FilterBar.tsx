import { FC, useState, useEffect } from "react";
import { AppBar, Toolbar, TextField, Button } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TuneIcon from "@mui/icons-material/Tune";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";

import { formatDate, defaultDay } from "./utils";
import FilterModal from "./FilterModal";
import { CareGiver } from "./../types";

interface FilterBarProps {
  careGivers: CareGiver[];
  eventTypes: string[];
}

const FilterBar: FC<FilterBarProps> = ({ careGivers, eventTypes }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [date, setDate] = useState<Dayjs | null>(dayjs(defaultDay));
  const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [filterModalOpen, setFilterModalOpen] = useState<boolean>(false);

  const handleChange = (newValue: Dayjs | null) => {
    setDate(newValue);
    const newStartDate = formatDate(newValue);
    setDatePickerOpen(false);
    setSearchParams((oldParams) => {
      oldParams.set("startDate", newStartDate);
      oldParams.delete("careGivers");
      oldParams.delete("eventTypes");
      return oldParams;
    });
  };

  useEffect(() => {
    if (!searchParams.get("startDate")) return;
    const paramStartDate = searchParams.get("startDate");
    if (paramStartDate) setDate(dayjs(paramStartDate));
  }, [searchParams]);

  return (
    <AppBar
      sx={{ position: "sticky", height: "15vh", backgroundColor: "white" }}
    >
      <Toolbar
        sx={{ height: "100%", display: "flex", justifyContent: "space-around" }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Date"
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

        <Button
          variant="contained"
          size="large"
          endIcon={<TuneIcon />}
          onClick={() => setFilterModalOpen(true)}
        >
          Filter
        </Button>
      </Toolbar>
      <FilterModal
        careGivers={careGivers}
        eventTypes={eventTypes}
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />
    </AppBar>
  );
};

export default FilterBar;
