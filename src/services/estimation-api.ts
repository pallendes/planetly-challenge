import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Estimation, EstimationCreation} from 'types';

interface EstimationResponse {
  data: Estimation;
}

export const estimationApi = createApi({
  reducerPath: 'estimationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVICE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const API_KEY = process.env.REACT_APP_SERVICE_API_KEY;
      headers.set('Authorization', `Bearer ${API_KEY}`);

      return headers;
    },
  }),
  tagTypes: ['Estimation'],
  endpoints: (builder) => ({
    getEstimations: builder.query<Array<Estimation>, void>({
      query: () => 'estimates',
      transformResponse: (
        response: Array<EstimationResponse>
      ): Array<Estimation> => response.map(({data}) => data),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({id}) => ({
                type: 'Estimation' as const,
                id,
              })),
              {type: 'Estimation', id: 'LIST'},
            ]
          : [{type: 'Estimation', id: 'LIST'}],
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

export const {useCreateEstimationMutation, useGetEstimationsQuery} =
  estimationApi;
