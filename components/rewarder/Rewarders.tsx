import { formatUnits } from 'ethers/lib/utils';
import Link from 'next/link';
import { Rewarder } from '../../constants';

function Rewarders({ rewarders, chainId }: { rewarders: Rewarder[]; chainId: string }) {
  return (
    <div>
      <div className="grid grid-cols-7 p-4 m-2 text-2xl text-center rounded-lg bg-neutral-700">
        <div>Name</div>
        <div>Pool TVL</div>
        <div>Pool 24H volume</div>
        <div>Reward token</div>
        <div>Balance</div>
        <div>Reward per block</div>
        <div>Reward due</div>
      </div>
      {rewarders.map((rewarder, index) => {
        return (
          <Link key={index} href={`/browse/${chainId}/${rewarder.id}`}>
            <div className="grid grid-cols-7 p-4 m-2 text-xl text-center rounded-lg cursor-pointer bg-neutral-700 hover:opacity-80">
              <div>{rewarder.pair.symbol}</div>
              <div>{rewarder.pair.reserveUSD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</div>
              <div>
                {rewarder.pair.volumeUSD[0]
                  ? rewarder.pair.volumeUSD[0].toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 0}{' '}
                $
              </div>
              <div>{rewarder.rewardToken.symbol}</div>
              <div>
                {parseFloat(formatUnits(rewarder.balance, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </div>
              <div>
                {parseFloat(formatUnits(rewarder.rewardPerBlock, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}/block
              </div>
              <div>
                {parseFloat(formatUnits(rewarder.rewardsDue, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Rewarders;
