import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../../components/general/Header';
import Rewarders from '../../components/rewarder/Rewarders';
import { ChainId, MINICHEF_ADDRESS, Rewarder } from '../../constants';

function Browse({ rewarders }: { rewarders: Rewarder[] }) {
  const router = useRouter();
  const { chainId } = router.query;
  const [search, setSearch] = useState('');
  const [filteredRewarders, setFilteredRewarders] = useState(rewarders);

  useEffect(() => {
    setFilteredRewarders(
      rewarders.filter((rewarder) => {
        if (rewarder.pair.symbol.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        if (rewarder.rewardToken.symbol.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
          return true;
        }
        return false;
      })
    );
  }, [rewarders, search]);

  return (
    <div className="min-h-screen text-white bg-neutral-800">
      <Head>
        <title>Browse rewarders</title>
      </Head>
      <Header />
      <main className="container pt-16 mx-auto ">
        <select
          className="block w-1/4 px-4 py-2 mx-auto mb-4 text-lg text-center shadow-lg bg-neutral-600 rounded-xl"
          onChange={(e) => {
            router.push('/browse/' + e.target.value);
          }}
          defaultValue={chainId ? chainId : '1'}
        >
          {Object.keys(MINICHEF_ADDRESS).map((id) => {
            return (
              <option value={id} key={id}>
                {ChainId[id as any]}
              </option>
            );
          })}
        </select>
        <input
          className="block w-1/3 px-4 py-2 mx-auto mb-8 text-lg text-center shadow-lg bg-neutral-600 rounded-xl"
          type={'text'}
          placeholder={'Find by token name or symbol (ex: SOS, LDO...)'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Rewarders rewarders={filteredRewarders} chainId={chainId ? chainId.toString() : '1'} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params;
  let chainId = '1';
  if (params && params.chainId) {
    chainId = params.chainId.toString();
  }
  const res = await fetch(`https://rewards.sushibackup.com/api/${chainId}`, {
    headers: new Headers({
      Authorization: 'Bearer ' + process.env.API_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  });
  let rewarders: Rewarder[] = [];
  if (res.status === 200) {
    rewarders = await res.json();
    rewarders = rewarders.sort((rewarderA: Rewarder, rewarderB: Rewarder) => {
      return rewarderA.pair.reserveUSD > rewarderB.pair.reserveUSD ? -1 : 1;
    });
  }

  // Pass data to the page via props
  return { props: { rewarders } };
}

export default Browse;
