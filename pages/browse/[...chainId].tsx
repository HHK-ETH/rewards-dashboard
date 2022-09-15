import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '../../components/general/Header';
import Rewarders from '../../components/rewarder/Rewarders';
import { ChainId, MINICHEF_ADDRESS, Rewarder } from '../../constants';

function Browse({ rewarders }: { rewarders: Rewarder[] }) {
  const router = useRouter();
  const { chainId } = router.query;
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
          defaultValue={chainId ? chainId[0] : '1'}
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
          placeholder={'Find by token name or symbol (ex: Lido, LDO...)'}
        />
        <Rewarders rewarders={rewarders} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const params = context.params;
  let chainId = '1';
  if (params && params.chainId) {
    chainId = params.chainId[0];
  }
  const res = await fetch(`https://rewards.sushibackup.com/api/${chainId}`, {
    headers: new Headers({
      Authorization: 'Bearer ' + process.env.API_TOKEN,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  });
  let rewarders = [];
  if (res.status === 200) {
    rewarders = await res.json();
  }

  // Pass data to the page via props
  return { props: { rewarders } };
}

export default Browse;
