import moment from 'moment';

export const getCurrentPastCourses = courses => {
  const past = [];
  const current = [];

  courses.forEach(course => {
    if (moment(course.end_date).isBefore(moment())) {
      past.push(course);
    } else {
      current.push(course);
    }
  });
  return {past, current};
};

export const isMissedDay = (selectedDate, missedDates) => {
  const isMissed = missedDates.filter(missedDate => {
    return moment(missedDate).isSame(selectedDate, 'day');
  })[0];
  return isMissed;
}
