import { FC } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { format } from "date-fns";

interface EventCardProps {
  event: any;
}

const eventTypeToText = (eventType: string) => {
  return eventType.split("_").join(" ");
};

const EventCard: FC<EventCardProps> = ({ event }) => {
  const { event_type, payload } = event;

  return (
    <Card
      sx={{
        backgroundColor:
          event_type === "alert_raised" ? "rgba(240,128,128, 0.5)" : "white",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {event.caregiver_first_name[0]}
          </Avatar>
        }
        title={`${event.caregiver_first_name} and ${event.care_recipient_name}`}
        subheader={format(new Date(event.timestamp), "hh:mm bbb dd MMM yyyy")}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textTransform: "capitalize" }}
        >
          {eventTypeToText(event_type)}
        </Typography>
      </CardContent>
      <CardContent>
        {event_type === "task_completed" && (
          <Typography paragraph>
            {payload.task_definition_description}
          </Typography>
        )}
        {event_type === "fluid_intake_observation" && (
          <>
            <Typography paragraph>Fluid type: {payload.fluid}</Typography>
            <Typography paragraph>
              Volume: {payload.consumed_volume_ml} ml
            </Typography>
            <Typography paragraph>
              Actually observed: {payload.observed.toString()}
            </Typography>
          </>
        )}
        {event_type === "physical_health_observation" && (
          <>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "mood_observation" && (
          <>
            <Typography paragraph>Mood: {payload.mood}</Typography>
          </>
        )}
        {event_type === "regular_medication_taken" && (
          <>
            <Typography paragraph>
              Medication Type: {payload.medication_type}
            </Typography>
          </>
        )}
        {event_type === "no_medication_observation_received" && (
          <>
            <Typography paragraph>
              Medication Type: {payload.medication_type}
            </Typography>
            <Typography paragraph>
              Expected dose time: {payload.expected_dose_timestamp}
            </Typography>
          </>
        )}
        {event_type === "incontinence_pad_observation" && (
          <>
            <Typography paragraph>
              Pad condition: {payload.pad_condition}
            </Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "general_observation" && (
          <>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "regular_medication_not_taken" && (
          <>
            <Typography paragraph>
              Medication Type: {payload.medication_type}
            </Typography>
            <Typography paragraph>
              Reason: {payload.medication_failure_reason}
            </Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "food_intake_observation" && (
          <>
            <Typography paragraph>Meal: {payload.meal}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "task_completion_reverted" && (
          <>
            <Typography paragraph>
              Description: {payload.task_definition_description}
            </Typography>
            <Typography paragraph>
              Note: {payload.task_schedule_note}
            </Typography>
          </>
        )}
        {event_type === "mental_health_observation" && (
          <>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "medication_schedule_updated" && (
          <>
            <Typography paragraph>Type: {payload.type}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
            <Typography paragraph>Instructions: {payload.rrule}</Typography>
            <Typography paragraph>Dose: {payload.dose_size}</Typography>
          </>
        )}
        {event_type === "regular_medication_maybe_taken" && (
          <>
            <Typography paragraph>
              Reason: {payload.medication_failure_reason}
            </Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "medication_schedule_created" && (
          <>
            <Typography paragraph>Type: {payload.type}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
            <Typography paragraph>Instructions: {payload.rrule}</Typography>
            <Typography paragraph>Dose: {payload.dose_size}</Typography>
          </>
        )}
        {event_type === "alert_qualified" && (
          <>
            <Typography paragraph>
              Severity: {payload.alert_severity}
            </Typography>
          </>
        )}
        {event_type === "task_schedule_created" && (
          <>
            <Typography paragraph>Instructions: {payload.rrule}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "concern_raised" && (
          <>
            <Typography paragraph>Severity: {payload.severity}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "regular_medication_partially_taken" && (
          <>
            <Typography paragraph>
              Medication Type: {payload.medication_type}
            </Typography>
            <Typography paragraph>
              Reason: {payload.medication_failure_reason}
            </Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "catheter_observation" && (
          <>
            <Typography paragraph>Volume: {payload.volume_ml} ml</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
          </>
        )}
        {event_type === "toilet_visit_recorded" && (
          <>
            <Typography paragraph>Visit type: {payload.visit_type}</Typography>
            <Typography paragraph>Note: {payload.note}</Typography>
            <Typography paragraph>
              Actually observed: {payload.observed.toString()}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <IconButton aria-label="bookmark">
          <BookmarkIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
