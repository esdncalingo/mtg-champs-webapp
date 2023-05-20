
export const dateString = (date: any) => {
  let newDate = new Date(date)
  return newDate.toDateString();
}