// app/home/page.tsx
import React from 'react';
import { getData } from './getData';

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};

function HomeUI({ data }: { data: Product }) {
  return (
    <div>
      <label data-testid="title">Title:</label> {data.title}
    </div>
  );
}

export default async function Home() {
  const data: Product = await getData();
  return <HomeUI data={data} />;
}
