
export const dateString = (date: any) => {
  let newDate = new Date(date)
  return newDate.toLocaleDateString('en-PH');
}

export const timeString = (date: any) => {
  let newDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return newDate.toLocaleTimeString('en-US', options)
}
