import dayjs, { Dayjs } from "dayjs";

const defaultDay = "2019-04-23T00:00:00.000Z";

const formatDate = (date: Dayjs | string | null, daysToAdd?: number) => {
  const dateFormat = "YYYY-MM-DD";
  if (daysToAdd) return dayjs(date).add(daysToAdd, "day").format(dateFormat);
  return dayjs(date).format(dateFormat);
};

export { defaultDay, formatDate };
