import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Estimation, EstimationCreation} from 'types';

interface EstimationResponse {
  data: Estimation;
}

export const estimationApi = createApi({
  reducerPath: 'estimationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.carboninterface.com/api/v1',
    prepareHeaders: (headers) => {
      const API_KEY = 'sBBejwD1HgJFC1E0d0oQ';
      headers.set('Authorization', `Bearer ${API_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEstimation: builder.query<EstimationResponse, void>({
      query: (id) => `estimates/${id}`,
    }),
    createEstimation: builder.mutation<EstimationResponse, EstimationCreation>({
      query: (body) => ({
        url: 'estimates',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useGetEstimationQuery, useCreateEstimationMutation} =
  estimationApi;
