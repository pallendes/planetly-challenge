import {Estimation} from 'types';
import {dedupEstimations, getCountryFromISOCode} from './utils';

describe('utils', () => {
  it('should return the name of the country given a country code', () => {
    const result = getCountryFromISOCode('de');

    expect(result).toBe('Germany');
  });

  it('should return an empty string the country given country code does not exists', () => {
    const result = getCountryFromISOCode('cl');

    expect(result).toBe('');
  });

  it('should merge duplicated elements', () => {
    const estimation1 = {
      id: '1',
      attributes: {
        country: 'ca',
        carbon_g: 1000,
        carbon_kg: 1,
        carbon_mt: 0.001,
        carbon_lb: 2.2,
      },
    } as Estimation;
    const estimation2 = {
      id: '2',
      attributes: {
        country: 'ca',
        carbon_g: 2000,
        carbon_kg: 2,
        carbon_mt: 0.002,
        carbon_lb: 4.4,
      },
    } as Estimation;
    const estimation3 = {
      id: '3',
      attributes: {
        country: 'de',
        carbon_g: 3000,
        carbon_kg: 3,
        carbon_mt: 0.002,
        carbon_lb: 3.3,
      },
    } as Estimation;

    const estimations: Estimation[] = [estimation1, estimation2, estimation3];

    const result = dedupEstimations(estimations);

    expect(result).toEqual([
      {
        id: '1',
        attributes: {
          carbon_g: 3000,
          carbon_kg: 3,
          carbon_lb: 6.6000000000000005,
          carbon_mt: 0.003,
          country: 'ca',
        },
      },
      {
        id: '3',
        attributes: {
          carbon_g: 3000,
          carbon_kg: 3,
          carbon_lb: 3.3,
          carbon_mt: 0.002,
          country: 'de',
        },
      },
    ]);
  });
});
