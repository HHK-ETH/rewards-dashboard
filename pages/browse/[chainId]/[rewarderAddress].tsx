import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../../../components/general/Header';
import RewarderMainData from '../../../components/rewarder/RewarderMainData';
import VolumeChart from '../../../components/rewarder/VolumeChart';
import { Rewarder } from '../../../constants';

function Rewarder({ initialRewarder, chainId }: { initialRewarder: Rewarder | null; chainId: string }) {
  const [rewarder, setRewarder] = useState(initialRewarder);
  const [showReload, setShowReload] = useState(rewarder ? (Date.now() / 1000 - rewarder.lastUpdated) / 60 > 3 : false);
  useEffect(() => {
    if (!rewarder) {
      return;
    }
    setInterval(() => {
      if ((Date.now() / 1000 - rewarder.lastUpdated) / 60 > 3) {
        setShowReload(true);
      }
    }, 30_000);
  }, [rewarder]);

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
          <>
            {showReload && (
              <h1 className="text-xl text-center">
                The displayed data is {((Date.now() / 1000 - rewarder.lastUpdated) / 60).toFixed(2)} minutes old
                <button
                  onClick={() => updateRewarder(chainId, rewarder.id, setRewarder)}
                  className="px-4 py-2 m-2 text-xl rounded-lg hover:opacity-80 bg-neutral-600"
                >
                  &#8634; update now
                </button>
              </h1>
            )}
            <RewarderMainData rewarder={rewarder} />
            <div className="grid grid-cols-2 gap-4 mx-auto mt-8 ml-4">
              <div className="p-4 rounded-md shadow-xl bg-neutral-600">
                <VolumeChart rewarder={rewarder} />
              </div>
              <div className="p-4 rounded-md shadow-xl bg-neutral-600">okok</div>
            </div>
          </>
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
  return { props: { initialRewarder: rewarder, chainId } };
}

async function updateRewarder(chainId: string, rewarderAddress: string, setRewarder: Function): Promise<void> {
  const res = await fetch(`https://rewards.sushibackup.com/api/${chainId}/${rewarderAddress}`, {
    method: 'POST',
    headers: new Headers({
      Authorization: 'Bearer ' + process.env.API_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  });
  let rewarder: Rewarder | null = null;
  if (res.status === 200) {
    rewarder = await res.json();
    setRewarder(rewarder);
  }
}

export default Rewarder;
