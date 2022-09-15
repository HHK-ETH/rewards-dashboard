import { formatUnits } from 'ethers/lib/utils';
import { Rewarder } from '../../constants';
import UseFetchRewarders from '../../hooks/UseFetchRewarders';
import UseFormatRewarders from '../../hooks/UseFormatRewarders';

function Rewarders({ rewarders }: { rewarders: Rewarder[] }) {
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
      {rewarders
        .sort((rewarderA, rewarderB) => {
          return rewarderA.pair.reserveUSD > rewarderB.pair.reserveUSD ? 0 : 1;
        })
        .map((rewarder, index) => {
          return (
            <div key={index} className="grid grid-cols-7 p-4 m-2 text-xl text-center rounded-lg bg-neutral-700">
              <div>{rewarder.pair.symbol}</div>
              <div>{rewarder.pair.reserveUSD.toFixed(2)} $</div>
              <div>{rewarder.pair.volumeUSD[0] ? rewarder.pair.volumeUSD[0].toFixed(2) : 0} $</div>
              <div>{rewarder.rewardToken.symbol}</div>
              <div>
                {parseFloat(formatUnits(rewarder.balance, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </div>
              <div>
                {parseFloat(formatUnits(rewarder.rewardPerBlock, rewarder.rewardToken.decimals)).toFixed(4)} /block
              </div>
              <div>
                {parseFloat(formatUnits(rewarder.rewardsDue, rewarder.rewardToken.decimals)).toFixed(4)}{' '}
                {rewarder.rewardToken.symbol}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Rewarders;
