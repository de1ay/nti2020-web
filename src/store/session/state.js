const state = {
  token: localStorage.getItem('token'),
  user: {},
  pagination: {
    page: 1,
    per_page: 15,
    total_pages: 1,
  },
};

export default state;
