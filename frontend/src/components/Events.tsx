import { useState, useEffect } from "react";
import { Box, Container, CircularProgress } from "@mui/material";
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
  const [searchParams] = useSearchParams();

  const [startDate, setStartDate] = useState<string>(formatDate(defaultDay));
  const [careGivers, setCareGivers] = useState<string>("");

  const { data, isLoading } = useQuery(
    ["events", startDate, careGivers],
    async () => {
      let completeUrl = `${url}events?startDate=${startDate}`;
      if (careGivers) {
        completeUrl += `&careGivers=${careGivers}`;
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

  useEffect(() => {
    if (!searchParams) return;
    const paramStartDate = searchParams.get("startDate");
    if (paramStartDate) setStartDate(paramStartDate);
    const paramCareGivers = searchParams.get("careGivers");
    if (paramCareGivers) setCareGivers(paramCareGivers);
  }, [searchParams]);

  return (
    <Box>
      <FilterBar
        eventTypes={data?.eventTypes}
        careGivers={careGiverData?.careGivers}
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

export default Events;
