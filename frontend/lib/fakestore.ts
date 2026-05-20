// lib/fakestore.ts
export async function getProductById(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}