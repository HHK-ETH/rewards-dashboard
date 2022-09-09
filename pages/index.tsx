import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/general/Header';

const Home: NextPage = () => {
  return (
    <div className="text-white bg-neutral-800 min-h-screen">
      <Head>
        <title>Rewards dashboard</title>
        <meta name="description" content="Manage rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto pt-16">
        <div className="mx-auto grid grid-cols-3 text-center gap-4">
          <Link href={'/browse'}>
            <div className="col-start-2 border-2 rounded-lg py-4 px-8 hover:opacity-80 cursor-pointer">
              <h1 className="text-xl font-semibold">Browse and manage rewarders</h1>
              <p>Browse all rewarders, analyse, compare and update reward rate.</p>
            </div>
          </Link>
          <Link href={'/create'}>
            <div className="col-start-2 border-2 rounded-lg py-4 px-8 hover:opacity-80 cursor-pointer">
              <h1 className="text-xl font-semibold">Create and deploy a new rewarder</h1>
              <p>Kickstart rewards for the liquidity pool of your choice.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
