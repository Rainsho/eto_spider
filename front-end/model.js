import merge from 'lodash/merge';
import { fetchEtoDate } from './service';

export default {
  namespace: 'eto',

  state: {
    date: [],
    etos: {},
  },

  reducers: {
    updateDate(state, { payload }) {
      return {
        ...state,
        date: payload,
      };
    },
    mergeEtos(state, { payload }) {
      return {
        ...state,
        etos: merge(state.etos, payload),
      };
    },
  },

  effects: {
    *getDate(action, { call, put }) {
      let date = yield call(fetchEtoDate);
      date = date.map(x => new Date(x.TIME).getTime());
      yield put({ type: 'updateDate', payload: date });
    },
  },
};
