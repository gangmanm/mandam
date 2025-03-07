
export const srtTimeToSeconds = (timeStr: string): number => {
    const [time, ms] = timeStr.split(",");
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds + parseInt(ms) / 1000;
  };
  