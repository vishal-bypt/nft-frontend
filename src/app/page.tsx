// app/home/page.tsx
import React from 'react';
import { getData } from './home/getData';
import Link from 'next/link';
import NFT from '../app/nft/page';

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
      <div>
      <Link href="/nft" data-testid="about-link">NFT</Link>
    </div>
    </div>
    
  );
}

export default async function Home() {
  const data: Product = await getData();
  return <NFT/>;
}
