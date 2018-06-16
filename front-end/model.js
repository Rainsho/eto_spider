import { message } from 'antd';
import merge from 'lodash/merge';
import zipObject from 'lodash/zipObject';
import { fetchEtoDate, fetchEtoByTime } from './service';

export default {
  namespace: 'eto',

  state: {
    date: [],
    etos: {},
  },

  effects: {
    *getDate(action, { call, put }) {
      let date = yield call(fetchEtoDate);
      date = date.map(x => new Date(x.TIME).getTime());
      yield put({ type: 'updateDate', payload: date });
    },
    *getEtos({ payload }, { call, put, all, select }) {
      const stored = yield select(state => state.eto.etos);
      const storedKeys = Object.keys(stored);
      const emptyDate = (payload || []).filter(x => storedKeys.indexOf(x) === -1);
      const etos = yield all(emptyDate.map(x => call(fetchEtoByTime, x)));
      const etoObj = zipObject(emptyDate, etos);
      yield put({ type: 'mergeEtos', payload: etoObj });
      emptyDate.length === 0 && message.success('数据已更新');
    },
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
};
