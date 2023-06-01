
export const dateString = (date: string) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('en-PH');
}

export const timeString = (date: string) => {
  const newDate = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  return newDate.toLocaleTimeString('en-US', options)
}
