import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/general/Header';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen text-white bg-neutral-800">
      <Head>
        <title>Rewards dashboard</title>
        <meta name="description" content="Manage rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container pt-16 mx-auto">
        <div className="grid grid-cols-3 gap-4 mx-auto text-center">
          <Link href={'/browse/1'}>
            <div className="col-start-2 px-8 py-4 border-2 rounded-lg cursor-pointer hover:opacity-80">
              <h1 className="text-xl font-semibold">Browse and manage rewarders</h1>
              <p>Browse all rewarders, analyse, compare and update reward rate.</p>
            </div>
          </Link>
          <Link href={'/create'}>
            <div className="col-start-2 px-8 py-4 border-2 rounded-lg cursor-pointer hover:opacity-80">
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
