import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import pkg from 'vietnam-provinces';
import createError from 'http-errors';

const { getProvincesWithDetail, getDistricts, getWards, getProvinces } = pkg;

/**
 * Get All Wards Of A District In Vietnam
 */
const getWardsOfDistrict = (event) => {
  return {
    status: 'OK',
    data: getWards(event.queryStringParameters.district),
  };
};

/**
 * Get All Districts Of A City In Vietnam
 */
const getDistrictsOfCity = (event) => {
  return {
    status: 'OK',
    data: getDistricts(event.queryStringParameters.city),
  };
};

/**
 * This endpoint will return back all name of cities in Vietnam
 */
const getAllCities = (event) => {
  return {
    status: 'OK',
    data: getProvinces(),
  };
};

const baseHandle = (event) => {
  console.log(event);
  const {
    requestContext: {
      http: { method, path },
    },
  } = event;
  if (method === 'GET') {
    switch (path) {
      case '/wards':
        return getWardsOfDistrict(event);
      case '/districts':
        return getDistrictsOfCity(event);
      case '/cities':
        return getAllCities(event);
      default:
        break;
    }
  }

  throw createError[400]('Bad Request');
};
const handler = middy(baseHandle).use(httpErrorHandler());

export { handler };
