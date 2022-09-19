import { formatUnits } from 'ethers/lib/utils';
import { useEffect, useState } from 'react';
import { ChainId, Rewarder } from '../../constants';

function RewarderExtraData({ chainId, rewarder }: { chainId: string; rewarder: Rewarder }): JSX.Element {
  const volume30d = calculateAverageVolume(rewarder.pair.volumeUSD);
  const tokenPerDay = parseFloat(formatUnits(rewarder.rewardPerSecond, rewarder.rewardToken.decimals)) * 3600 * 24;
  const [tokenPrice, setTokenPrice] = useState(0);
  const volumeRewardRatio = tokenPerDay * tokenPrice > 0 ? volume30d / (tokenPerDay * tokenPrice) : 1;
  const balanceRewardsDueRatio =
    parseFloat(formatUnits(rewarder.balance, rewarder.rewardToken.decimals)) /
    parseFloat(formatUnits(rewarder.rewardsDue, rewarder.rewardToken.decimals));

  useEffect(() => {
    async function fetchTokenPrice() {
      setTokenPrice(await queryTokenPrice(parseInt(chainId, 10), rewarder.rewardToken.id));
    }
    fetchTokenPrice();
  }, [chainId, rewarder.rewardToken.id]);

  return (
    <>
      <div className="p-4 text-lg rounded-lg bg-neutral-700">
        <div className="grid grid-cols-3 gap-2">
          <h2 className="font-bold">Rewarder address: </h2>
          <h2 className="col-span-2">{rewarder.id}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <h2 className="font-bold">Reward token address: </h2>
          <h2 className="col-span-2">{rewarder.rewardToken.id}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <h2 className="font-bold">LP token address: </h2>
          <h2 className="col-span-2">{rewarder.pair.id}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <h2 className="font-bold">Masterchef pool id: </h2>
          <h2 className="col-span-2">{rewarder.masterchefId}</h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <h2 className="font-bold">Reward per second: </h2>
          <h2 className="col-span-2">
            {parseFloat(formatUnits(rewarder.rewardPerSecond, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
            {rewarder.rewardToken.symbol}/second
          </h2>
        </div>
      </div>
      <div className="p-4 mt-2 text-xl rounded-lg bg-neutral-700">
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-bold ">Average volume last 30 days: </h2>
          <h2 className="">{volume30d.toFixed(2)}$ per day</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-bold ">Current daily incentive in token: </h2>
          <h2 className="">
            {tokenPerDay.toFixed(2)} {rewarder.rewardToken.symbol} per day
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-bold ">Current daily incentive in $: </h2>
          <h2 className="">{(tokenPerDay * tokenPrice).toFixed(2)}$ per day</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-bold ">Ratio volume/rewards: </h2>
          <h2 className={volumeRewardRatio >= 1 ? 'text-green-600' : 'text-red-600'}>{volumeRewardRatio.toFixed(2)}</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <h2 className="font-bold ">Ratio balance/rewards due: </h2>
          <h2 className={balanceRewardsDueRatio >= 1 ? 'text-green-600' : 'text-red-600'}>
            {balanceRewardsDueRatio.toFixed(2)}
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-8">
        <button className="block py-4 text-xl font-semibold rounded-lg cursor-pointer bg-neutral-700 hover:opacity-80">
          Update reward rate
        </button>
        <button className="block py-4 text-xl font-semibold rounded-lg cursor-pointer bg-neutral-700 hover:opacity-80">
          Refill rewarder
        </button>
      </div>
    </>
  );
}

function calculateAverageVolume(volumes: number[]): number {
  let volume30d = 0;
  volumes.map((volume) => {
    volume30d += volume;
  });
  return volume30d / volumes.length;
}

async function queryTokenPrice(chainId: number, tokenAddress: string): Promise<number> {
  let chain = ChainId[chainId].toLowerCase();
  if (chain === 'gnosis') chain = 'xdai';
  const result = await fetch(`https://coins.llama.fi/prices/current/${chain}:${tokenAddress}`);
  if (result.status === 200) {
    const tokenPrice = (await result.json()).coins[`${chain}:${tokenAddress}`];
    return tokenPrice ? tokenPrice.price : 0;
  }
  return 0;
}

export default RewarderExtraData;
