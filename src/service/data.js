const URL = 'https://economia.awesomeapi.com.br/json/all';

const responseApi = async () => {
  const req = await fetch(URL);
  const response = await req.json();
  return Promise.resolve(response);
};

export default responseApi;
