export async function getData() {
  const res = await fetch('https://fakestoreapi.com/products/1', {
    next: { revalidate: 60 }, // ISR-like behavior
  });

  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}