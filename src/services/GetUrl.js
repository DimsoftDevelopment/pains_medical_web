export const getUrl = ({
  url,
  page,
  per_page,
  query,
  start_date,
  end_date,
  user_id,
}) => {
  let pageValue = '';
  let perPage = '';
  let queryValue = '';
  let startDate = '';
  let endDate = '';
  let userID = '';

  if (page) pageValue = `page=${page}&`;
  if (per_page) perPage = `per_page=${per_page}&`;
  if (query) queryValue = `query=${query}&`;
  if (start_date) startDate = `start_date=${start_date}&`;
  if (end_date) endDate = `end_date=${end_date}&`;
  if (user_id) userID = `user_id=${user_id}&`;

  return (
    `${url}?` +
    `${pageValue}` +
    `${perPage}` +
    `${queryValue}` +
    `${startDate}` +
    `${endDate}` +
    `${userID}`
  );
};
