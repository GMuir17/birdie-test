import { useState, useEffect } from "react";
import { Box, Container, CircularProgress, Grid } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import EventCard from "./EventCard";
import FilterBar from "./FilterBar";
import { formatDate, defaultDay } from "./utils";

const apiKey =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_EVENT_API_KEY
    : process.env.REACT_APP_EVENT_API_KEY;

const url =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_LOCAL_API_URL
    : process.env.REACT_APP_PRODUCTION_API_URL;

const config = {
  headers: { "X-API-Key": apiKey },
};

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [startDate, setStartDate] = useState<string>(formatDate(defaultDay));
  const [careGivers, setCareGivers] = useState<string | null>(null);
  const [eventTypes, setEventTypes] = useState<string | null>(null);

  const { data, isLoading } = useQuery(
    ["events", startDate, careGivers, eventTypes],
    async () => {
      let completeUrl = `${url}events?startDate=${startDate}`;
      if (careGivers) {
        completeUrl += `&careGivers=${careGivers}`;
      }
      if (eventTypes) {
        completeUrl += `&eventTypes=${eventTypes}`;
      }
      const res = await axios.get(completeUrl, config);
      return res.data.body;
    }
  );

  const { data: careGiverData } = useQuery(
    ["careGivers", startDate],
    async () => {
      let completeUrl = `${url}careGivers?startDate=${startDate}`;

      const res = await axios.get(completeUrl, config);
      return res.data.body;
    }
  );

  const { data: evenTypeData } = useQuery(
    ["evenTypes", startDate],
    async () => {
      let completeUrl = `${url}eventTypes?startDate=${startDate}`;
      const res = await axios.get(completeUrl, config);
      return res.data.body;
    }
  );

  useEffect(() => {
    // Event Types
    const paramEventTypes = searchParams.get("eventTypes");
    if (paramEventTypes) {
      setEventTypes(paramEventTypes);
    } else setEventTypes(null);

    // Start Date
    const paramStartDate = searchParams.get("startDate");
    if (paramStartDate) {
      setStartDate(paramStartDate);
    } else {
      setSearchParams((oldParams) => {
        oldParams.set("startDate", startDate);
        return oldParams;
      });
    }

    // Care Givers
    const paramCareGivers = searchParams.get("careGivers");
    if (paramCareGivers) {
      setCareGivers(paramCareGivers);
    } else setCareGivers(null);
  }, [searchParams, startDate, setSearchParams]);

  return (
    <Box>
      <FilterBar
        careGivers={careGiverData?.careGivers}
        eventTypes={evenTypeData?.eventTypes}
      />
      {isLoading && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          <CircularProgress />
        </Container>
      )}
      <Grid
        container
        spacing={2}
        sx={{
          py: 2,
          px: 2,
          backgroundColor: "#d3d3d3",
        }}
      >
        {data &&
          data.events.map((event: any) => (
            <Grid item xs={12} sm={4} sx={{ py: 1 }} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Events;
