const timeSince = (date) => {
  if (!date) {
    return '';
  }
  const currentDate = new Date(date);
  let seconds = Math.floor((new Date() - currentDate) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    const time = Math.floor(interval);
    return `${time} ${time === 1 ? 'year ago' : 'years ago'}`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const time = Math.floor(interval);
    return `${time} ${time === 1 ? 'month ago' : 'months ago'}`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const time = Math.floor(interval);
    return `${time} ${time === 1 ? 'day ago' : 'days ago'}`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const time = Math.floor(interval);
    return `${time} ${time === 1 ? 'hour ago' : 'hours ago'}`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    const time = Math.floor(interval);
    return `${time} ${time === 1 ? 'minute ago' : 'minutes ago'}`;
  }
  return Math.floor(seconds) + ' seconds ago';
};

export default timeSince;
