// вытягивание searchId:
const generateSearchId = async (func: any) => {
  const response = await fetch("https://front-test.dev.aviasales.ru/search");
  const data = await response.json();
  const searchId = await data.searchId;
  func(searchId);
  return searchId;
};
export default generateSearchId;
