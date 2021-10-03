import {
  CaseReducer,
  createDraftSafeSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {RootState} from 'store';
import {Estimation} from 'types';

interface EstimationsState {
  savedEstimations: Array<Estimation>;
}

const initialState: EstimationsState = {
  savedEstimations: [],
};

const saveEstimation: CaseReducer<
  EstimationsState,
  PayloadAction<Estimation, string>
> = (state, {payload}) => {
  state.savedEstimations.push(payload);
};

const estimationsSlice = createSlice({
  name: 'estimations',
  initialState,
  reducers: {saveEstimation},
});

const selectSelf = (state: RootState): EstimationsState => state.estimations;

export const estimationsSelector = createDraftSafeSelector(
  selectSelf,
  (state: EstimationsState): EstimationsState => state
);

export const {name, actions, reducer} = estimationsSlice;
