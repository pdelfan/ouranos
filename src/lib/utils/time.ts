export const getFormattedDate = (
  date: Date,
  {
    show,
  }: {
    show: { month: boolean; day?: boolean; year?: boolean };
  }
) => {
  const options: Intl.DateTimeFormatOptions = {
    day: show.day ? "numeric" : undefined,
    month: show.month ? "long" : undefined,
    year: show.year ? "numeric" : undefined,
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};
