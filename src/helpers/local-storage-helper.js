function setTokenExpirationDate(minutesFromNow) {
  const threshold = minutesFromNow * 60 * 1000;
  const date = new Date();
  localStorage.setItem('expiresAt', date.setTime(date.getTime() + threshold).toString());
}

export default setTokenExpirationDate;