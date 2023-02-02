import { useState, useEffect, forwardRef, ReactElement, Ref } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  CircularProgress,
  Typography,
  Checkbox,
  Slide,
} from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "react-router-dom";

import { formatDate, defaultDay } from "./utils";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FilterBar = () => {
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
      <Toolbar
        sx={{ height: "100%", display: "flex", justifyContent: "space-around" }}
      >
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

        <Button
          variant="contained"
          size="large"
          endIcon={<TuneIcon />}
          onClick={() => setFilterModalOpen(true)}
        >
          Filter
        </Button>
      </Toolbar>
      <Dialog
        open={filterModalOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setFilterModalOpen(false)}
      >
        <AppBar sx={{ position: "sticky" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setFilterModalOpen(false)}
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Filters
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              px: 3,
              py: 2.5,
            }}
          >
            <DialogContentText sx={{ fontSize: "20px" }}>
              Care giver
            </DialogContentText>
            <FormControl></FormControl>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button size="large" onClick={() => console.log("handleClear")}>
            Clear all
          </Button>
          <Button size="large" onClick={() => console.log("handleFilter")}>
            Show events
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default FilterBar;
