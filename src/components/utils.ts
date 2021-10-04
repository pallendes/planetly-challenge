import {Estimation} from 'types';
import _uniqBy from 'lodash/uniqBy';

export const availableUnits = [
  {value: 'carbon_g', name: 'g'},
  {value: 'carbon_lb', name: 'lg'},
  {value: 'carbon_kg', name: 'Kg'},
  {value: 'carbon_mt', name: 'MT'},
];

export const getCountryFromISOCode = (code: string): string => {
  return (
    availableCountries.find(
      (country) => country.value.toLowerCase() === code.toLowerCase()
    )?.name || ''
  );
};

export const dedupEstimations = (
  estimations: Array<Estimation>
): Array<Estimation> => {
  const dedupedArray: Array<Estimation> = [];

  const uniques = _uniqBy(estimations, ({attributes}) => attributes.country);

  uniques.forEach((unique) => {
    const mergedEstimation = {...unique};

    estimations.forEach((estimation) => {
      if (
        mergedEstimation.attributes.country === estimation.attributes.country &&
        mergedEstimation.id !== estimation.id
      ) {
        mergedEstimation.attributes = {
          ...estimation.attributes,
          carbon_g:
            mergedEstimation.attributes.carbon_g +
            estimation.attributes.carbon_g,
          carbon_lb:
            mergedEstimation.attributes.carbon_lb +
            estimation.attributes.carbon_lb,
          carbon_kg:
            mergedEstimation.attributes.carbon_kg +
            estimation.attributes.carbon_kg,
          carbon_mt:
            mergedEstimation.attributes.carbon_mt +
            estimation.attributes.carbon_mt,
        };
      }
    });

    dedupedArray.push(mergedEstimation);
  });

  return dedupedArray;
};

export const availableCountries = [
  {
    value: 'US',
    name: 'United Stated of America',
  },
  {
    value: 'CA',
    name: 'Canada',
  },
  {
    value: 'AT',
    name: 'Austria',
  },
  {
    value: 'BG',
    name: 'Bulgaria',
  },
  {
    value: 'HR',
    name: 'Croatia',
  },
  {
    value: 'CY',
    name: 'Cyprus',
  },
  {
    value: 'CZ',
    name: 'Czechia',
  },
  {
    value: 'DK',
    name: 'Denmark',
  },
  {
    value: 'EU-27',
    name: 'EU-27',
  },
  {
    value: 'EE',
    name: 'Estonia',
  },
  {
    value: 'FI',
    name: 'Finland',
  },
  {
    value: 'FR',
    name: 'France',
  },
  {
    value: 'DE',
    name: 'Germany',
  },
  {
    value: 'GR',
    name: 'Greece',
  },
  {
    value: 'GR',
    name: 'Greece',
  },
  {
    value: 'GU',
    name: 'Hungary',
  },
  {
    value: 'IE',
    name: 'Ireland',
  },
  {
    value: 'IT',
    name: 'Italy',
  },
  {
    value: 'LV',
    name: 'Latvia',
  },
  {
    value: 'LU',
    name: 'Luxemburgo',
  },
  {
    value: 'MT',
    name: 'Malta',
  },
  {
    value: 'NL',
    name: 'Netherlands',
  },
  {
    value: 'PL',
    name: 'Poland',
  },
  {
    value: 'PT',
    name: 'Portugal',
  },
  {
    value: 'RO',
    name: 'Romania',
  },
  {
    value: 'SK',
    name: 'Slovakia',
  },
  {
    value: 'SI',
    name: 'Slovenia',
  },
  {
    value: 'ES',
    name: 'Spain',
  },
  {
    value: 'SE',
    name: 'Sweden',
  },
  {
    value: 'GB',
    name: 'United Kingdom',
  },
];
