import Head from 'next/head';
import Header from '../components/general/Header';
import Rewarders from '../components/rewarder/Rewarders';

function Browse() {
  return (
    <div className="text-white bg-neutral-800 min-h-screen">
      <Head>
        <title>Browse rewarders</title>
      </Head>
      <Header />
      <main className="container mx-auto pt-16 ">
        <input
          className="block bg-neutral-600 text-lg text-center mx-auto py-2 px-4 rounded-xl w-1/3 shadow-lg"
          type={'text'}
          placeholder={'Find by token name or symbol (ex: Lido, LDO...)'}
        />
        <Rewarders />
      </main>
    </div>
  );
}

export default Browse;
