import KeyMirror from "keymirror";

const CREATE_COURSE_ACTIONS = KeyMirror({
  UPDATE_COURSE_PROP: null,
  SET_MEDICATION: null,
  SET_SELECTED_MEDICATION_INDEX: null
});

const INITIAL_STATE = {
  course: {
    title: '',
    start_date: new Date(),
    end_date: new Date(),
    course_medications_attributes: [],
    user_id: null,
  },
  selectedMedication: null,
  selectedMedicationIndex: null
};

const NUMBER_REGEXP = /^[0-9\b]+$/;
const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export {CREATE_COURSE_ACTIONS, INITIAL_STATE, NUMBER_REGEXP, WEEKDAYS};
