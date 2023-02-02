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

interface FilterBarProps {
  careGivers: CareGiver[];
  open: boolean;
  onClose: () => void;
}

const FilterModal: FC<FilterBarProps> = ({ careGivers, open, onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCareGivers, setSelectedCareGivers] = useState<string[]>([]);

  useEffect(() => {
    if (!careGivers) return;
    setSelectedCareGivers(careGivers.map((careGiver) => careGiver.id));
  }, [careGivers]);

  useEffect(() => {
    if (!searchParams) return;
    const paramCareGivers = searchParams.get("careGivers");
    if (paramCareGivers) setSelectedCareGivers(paramCareGivers.split(","));
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

  const applyFilters = () => {
    const carersCSV = selectedCareGivers.join(",");
    setSearchParams((oldParams) => {
      !selectedCareGivers.length
        ? oldParams.delete("careGivers")
        : oldParams.set("careGivers", carersCSV);
      return oldParams;
    });
    onClose();
  };

  const selectAll = () => {
    setSearchParams((oldParams) => {
      oldParams.set(
        "careGivers",
        careGivers.map((careGiver) => careGiver.id).join(",")
      );
      return oldParams;
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
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
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button size="large" onClick={selectAll}>
          Select all
        </Button>
        <Button size="large" onClick={applyFilters}>
          Apply filters
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
