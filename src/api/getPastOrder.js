export default async function getPastOrdcer(order) {
  const response = await fetch(`/api/past-order/${order}`);
  const data = await response.json();
  return data;
}
