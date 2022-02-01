import KeyMirror from "keymirror";

const CREATE_COURSE_ACTIONS = KeyMirror({
  UPDATE_COURSE_PROP: null,
});

const INITIAL_STATE = {
  course: {
    title: '',
    start_date: '',
    end_date: '',
    course_medications_attributes: [],
    user_id: '',
  },
};

const NUMBER_REGEXP = /^[0-9\b]+$/;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export {CREATE_COURSE_ACTIONS, INITIAL_STATE, NUMBER_REGEXP, WEEKDAYS};
