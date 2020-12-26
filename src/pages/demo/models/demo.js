import { onTest } from "../services";
export default {
  namespace: "demo",
  state: {},
  effects: {
    * onTest({ payload }, { call, put }) {
      const res = yield call(onTest, payload)
      const { data = {} } = res || {}
      return res
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
}