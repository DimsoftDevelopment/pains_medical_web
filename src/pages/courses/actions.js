import {COURSES_ACTIONS} from './constants';

export const getCourses = (id) => ({
  type: COURSES_ACTIONS.GET_COURSES,
  payload: { user_id: id }
});

export const getCoursesSuccess = courses => ({
  type: COURSES_ACTIONS.GET_COURSES_SUCCESS,
  payload: {courses},
});

export const getCoursesError = error => ({
  type: COURSES_ACTIONS.GET_COURSES_ERROR,
  payload: {error},
});

export const getCoursesByMember = member_id => ({
  type: COURSES_ACTIONS.GET_COURSE_BY_MEMBER,
  payload: {member_id},
});

export const getCoursesByMemberSuccess = courses => ({
  type: COURSES_ACTIONS.GET_COURSE_BY_MEMBER_SUCCESS,
  payload: {courses},
});

export const getCoursesByMemberError = error => ({
  type: COURSES_ACTIONS.GET_COURSE_BY_MEMBER_ERROR,
  payload: {error},
});

export const getCourse = id => ({
  type: COURSES_ACTIONS.GET_COURSE,
  payload: {id},
});

export const getCourseSuccess = course => ({
  type: COURSES_ACTIONS.GET_COURSE_SUCCESS,
  payload: {course},
});

export const getCourseError = error => ({
  type: COURSES_ACTIONS.GET_COURSE_ERROR,
  payload: {error},
});

export const createCourse = course => ({
  type: COURSES_ACTIONS.CREATE_COURSE,
  payload: {course},
});

export const createCourseSuccess = course => ({
  type: COURSES_ACTIONS.CREATE_COURSE_SUCCESS,
  payload: {course},
});

export const createCourseError = error => ({
  type: COURSES_ACTIONS.CREATE_COURSE_ERROR,
  payload: {error},
});

export const updateCourse = course => ({
  type: COURSES_ACTIONS.UPDATE_COURSE,
  payload: {course},
});

export const updateCourseSuccess = course => ({
  type: COURSES_ACTIONS.CREATE_COURSE_SUCCESS,
  payload: {course},
});

export const updateCourseError = error => ({
  type: COURSES_ACTIONS.CREATE_COURSE_ERROR,
  payload: {error},
});

export const deleteCourse = id => ({
  type: COURSES_ACTIONS.DELETE_COURSE,
  payload: {id},
});

export const deleteCourseSuccess = id => ({
  type: COURSES_ACTIONS.DELETE_COURSE_SUCCESS,
  payload: {id},
});

export const deleteCourseError = error => ({
  type: COURSES_ACTIONS.CREATE_COURSE_ERROR,
  payload: {error},
});
