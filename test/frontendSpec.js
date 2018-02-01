import users from '../client/src/reducers/reducer-users';
import employeeAvailabilities from '../client/src/reducers/reducer-employee-availabilities';
import scheduleDates from '../client/src/reducers/reducer-schedule-dates';
import selectedWeek from '../client/src/reducers/reducer-selected-week';
import moment from 'moment';

describe('Shiftly Frontend Test Spec', () => {
  describe('users reducer', () => {
    const initialState = null;
    const stateWithOneUser = [{
      id: 194,
      name: 'r',
      role: 'employee',
      password: null,
    }];
    const stateWithAddedUser = [{
      id: 194,
      name: 'r',
      role: 'employee',
      password: null,
    }, {
      id: 204,
      name: 's',
      role: 'employee',
      password: null,
    }];

    it('should return the initial state', () => {
      expect(users(undefined, {})).toEqual(initialState);
    });

    it('should change the state with the action get users', () => {
      expect(users(undefined, {
        type: 'GET_USERS',
        payload: { data: stateWithOneUser },
      })).toEqual(stateWithOneUser);
    });

    it('should change the state with the action add employee', () => {
      expect(users(stateWithOneUser, {
        type: 'ADD_EMPLOYEE',
        payload: {
          data: {
            user: {
              id: 204,
              name: 's',
              role: 'employee',
              password: null,
            },
          },
        },
      })).toEqual(stateWithAddedUser);
    });
  });

  describe('employeeAvailabilities reducer', () => {
    const stateWithSingleUserAvailabilities = [];

    for (let i = 1; i < 15; i++) {
      stateWithSingleUserAvailabilities.push({ user_id: 1, day_part_id: i, is_available: true });
    }

    it('should return an initial state of "null"', () => {
      expect(employeeAvailabilities(undefined, {})).toEqual(null);
    });

    it('should add availabilities to the state with the action GET_EMPLOYEE_AVAILABILITIES', () => {
      expect(employeeAvailabilities(undefined, {
        type: 'GET_EMPLOYEE_AVAILABILITIES',
        payload: { data: stateWithSingleUserAvailabilities },
      })).toEqual(stateWithSingleUserAvailabilities);
    });
  });

  describe('schedule dates reducer', () => {
    const initialState = null;
    const stateWithOneScheduleTemp = [{
      id: 1,
      monday_dates: '2017-11-13T08:00:00.000Z',
    }];
    const stateWithAddedScheduleTemp = [{
      id: 1,
      monday_dates: '2017-11-13T08:00:00.000Z',
    }, {
      id: 2,
      monday_dates: '2017-11-27T08:00:00.000Z',
    }];

    it('should return the initial state', () => {
      expect(scheduleDates(undefined, {})).toEqual(initialState);
    });

    it('should change the state with the action get schedules', () => {
      expect(scheduleDates(undefined, {
        type: 'GET_SCHEDULE_DATES',
        payload: { data: stateWithOneScheduleTemp },
      })).toEqual(stateWithOneScheduleTemp);
    });

    it('should change the state with the action create schedule template', () => {
      expect(scheduleDates(stateWithOneScheduleTemp, {
        type: 'CREATE_SCHEDULE_TEMPLATE',
        payload: {
          data: {
            monday_date: {
              id: 2,
              monday_dates: '2017-11-27T08:00:00.000Z',
            },
          },
        },
      })).toEqual(stateWithAddedScheduleTemp);
    });
  });

  describe('selectedWeek reducer', () => {
    let monday = moment(moment().day(1)).isAfter(moment()) ? moment().day(-6) : moment().day(1);

    monday = monday.format('YYYY-MM-DD');

    it('should return an initial state of next monday', () => {
      expect(selectedWeek(undefined, {})).toEqual(monday);
    });
  });
});

