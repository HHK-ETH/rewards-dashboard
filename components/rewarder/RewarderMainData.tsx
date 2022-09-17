import { formatUnits } from 'ethers/lib/utils';
import { Rewarder } from '../../constants';

function RewarderMainData({ rewarder }: { rewarder: Rewarder }): JSX.Element {
  return (
    <div className="grid w-3/4 grid-cols-4 gap-4 mx-auto text-2xl">
      <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
        <h1 className="mb-2 font-semibold">Pool TVL</h1>
        <h1>{rewarder.pair.reserveUSD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</h1>
      </div>
      <div className="p-4 text-center rounded-md shadow-xl bg-neutral-600">
        <h1 className="mb-2 font-semibold">24H volume</h1>
        <h1>
          {rewarder.pair.volumeUSD[0] ? rewarder.pair.volumeUSD[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}{' '}
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
  );
}

export default RewarderMainData;
