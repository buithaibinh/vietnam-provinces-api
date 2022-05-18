import pkg from 'vietnam-provinces';
const { getProvincesWithDetail, getDistricts, getWards, getProvinces } = pkg;
(() => {
  console.log('Hello, World!');
  console.log(getDistricts('02'));
})();
