import { FC, useState, useEffect, forwardRef, ReactElement, Ref } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Dialog,
  DialogContentText,
  DialogActions,
  DialogContent,
  Box,
  FormControl,
  Typography,
  Checkbox,
  Slide,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TransitionProps } from "@mui/material/transitions";
import { useSearchParams } from "react-router-dom";

import { CareGiver } from "./../types";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const eventTypeToText = (eventType: string) => {
  return eventType.split("_").join(" ");
};

interface FilterBarProps {
  careGivers: CareGiver[];
  eventTypes: string[];
  open: boolean;
  onClose: () => void;
}

const FilterModal: FC<FilterBarProps> = ({
  careGivers,
  eventTypes,
  open,
  onClose,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCareGivers, setSelectedCareGivers] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);

  useEffect(() => {
    if (!careGivers) return;
    setSelectedCareGivers(careGivers.map((careGiver) => careGiver.id));
  }, [careGivers]);

  useEffect(() => {
    if (!eventTypes) return;
    setSelectedEventTypes(eventTypes);
  }, [eventTypes]);

  useEffect(() => {
    if (!searchParams) return;
    const paramCareGivers = searchParams.get("careGivers");
    if (paramCareGivers) setSelectedCareGivers(paramCareGivers.split(","));
    const paramEventTypes = searchParams.get("eventTypes");
    if (paramEventTypes) setSelectedEventTypes(paramEventTypes.split(","));
  }, [searchParams]);

  const handleCareGiverChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, id } = event.target as HTMLInputElement;
    checked
      ? setSelectedCareGivers([...selectedCareGivers, id])
      : setSelectedCareGivers(
          selectedCareGivers.filter((careGiver) => careGiver !== id)
        );
  };

  const handleEventTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target as HTMLInputElement;
    checked
      ? setSelectedEventTypes([...selectedEventTypes, name])
      : setSelectedEventTypes(
          selectedEventTypes.filter((eventType) => eventType !== name)
        );
  };

  const applyFilters = () => {
    const carersCSV = selectedCareGivers.join(",");
    setSearchParams((oldParams) => {
      !selectedCareGivers.length
        ? oldParams.delete("careGivers")
        : oldParams.set("careGivers", carersCSV);
      !selectedEventTypes.length
        ? oldParams.delete("eventTypes")
        : oldParams.set("eventTypes", selectedEventTypes.join(","));
      return oldParams;
    });
    onClose();
  };

  const clearAll = () => {
    setSelectedCareGivers([]);
    setSelectedEventTypes([]);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      scroll="paper"
      fullWidth
    >
      <AppBar sx={{ position: "sticky" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
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
          <FormControl>
            {careGivers?.length &&
              careGivers.map((careGiver: CareGiver) => (
                <Box
                  key={careGiver.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>{careGiver.name}</Typography>
                  <Checkbox
                    checked={selectedCareGivers.includes(careGiver.id)}
                    onChange={handleCareGiverChange}
                    name={careGiver.name}
                    id={careGiver.id}
                  />
                </Box>
              ))}
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 2.5,
          }}
        >
          <DialogContentText sx={{ fontSize: "20px" }}>
            Events
          </DialogContentText>
          <FormControl>
            {eventTypes?.length &&
              eventTypes.map((eventType: string) => (
                <div key={eventType}>
                  <Box
                    key={eventType}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ textTransform: "capitalize" }}>
                      {eventTypeToText(eventType)}
                    </Typography>
                    <Checkbox
                      checked={selectedEventTypes.includes(eventType)}
                      onChange={handleEventTypeChange}
                      name={eventType}
                    />
                  </Box>
                  <Divider orientation="horizontal" />
                </div>
              ))}
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="large" onClick={clearAll}>
          Clear
        </Button>
        <Button size="large" onClick={applyFilters}>
          Apply filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
