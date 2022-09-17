import { formatUnits } from 'ethers/lib/utils';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../../../components/general/Header';
import { Rewarder } from '../../../constants';

function Rewarder({ rewarder, chainId }: { rewarder: Rewarder | null; chainId: string }) {
  return (
    <div className="min-h-screen text-white bg-neutral-800">
      <Head>
        <title>Browse rewarders</title>
      </Head>
      <Header />
      <Link href={`/browse/${chainId}`}>
        <button className="float-left px-4 py-2 m-4 rounded-lg hover:opacity-80 bg-neutral-600">&larr; Go back</button>
      </Link>
      <main className="container pt-16 mx-auto">
        {rewarder === null && <h1 className="text-xl text-center">Impossible to retrieve data for this rewarder.</h1>}
        {rewarder !== null && (
          <div className="grid w-3/4 grid-cols-4 gap-4 mx-auto text-2xl">
            <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
              <h1 className="mb-2 font-semibold">Pool TVL</h1>
              <h1>{rewarder.pair.reserveUSD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</h1>
            </div>
            <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
              <h1 className="mb-2 font-semibold">24H volume</h1>
              <h1>
                {rewarder.pair.volumeUSD[0]
                  ? rewarder.pair.volumeUSD[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 0}{' '}
                $
              </h1>
            </div>
            <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
              <h1 className="mb-2 font-semibold">Balance</h1>
              <h1 className="">
                {parseFloat(formatUnits(rewarder.balance, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </h1>
            </div>
            <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
              <h1 className="mb-2 font-semibold">Reward due</h1>
              <h1>
                {parseFloat(formatUnits(rewarder.rewardsDue, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </h1>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params;
  let chainId = '1';
  let rewarderAddress = '0x0000000000000000000000000000000000000000';
  if (params && params.chainId && params.rewarderAddress) {
    chainId = params.chainId.toString();
    rewarderAddress = params.rewarderAddress.toString();
  }
  const res = await fetch(`https://rewards.sushibackup.com/api/${chainId}/${rewarderAddress}`, {
    headers: new Headers({
      Authorization: 'Bearer ' + process.env.API_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  });
  let rewarder: Rewarder | null = null;
  if (res.status === 200) {
    rewarder = await res.json();
  }

  // Pass data to the page via props
  return { props: { rewarder, chainId } };
}

export default Rewarder;
