import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="text-white bg-neutral-800 min-h-screen">
      <Head>
        <title>Rewards dashboard</title>
        <meta name="description" content="Manage rewards" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="p-2 bg-neutral-900 shadow-lg">
        <nav className="">
          <Image src={'/sushilogo.png'} alt={'Sushi Logo'} layout={'intrinsic'} height={'50'} width={'50'} />
          <h1 className="text-3xl inline-block align-top mt-2 ml-2">SUSHI</h1>
          <button className="float-right bg-neutral-700 py-1 px-4 text-xl font-semibold rounded-lg m-2">
            Connect wallet
          </button>
        </nav>
      </header>
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
