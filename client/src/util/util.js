import dayjs from "dayjs";

export const formatTime = time => {
    return dayjs(time).format("MMM DD, YYYY, HH : mm : ss");
}