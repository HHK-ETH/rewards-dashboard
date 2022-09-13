import { formatUnits } from 'ethers/lib/utils';
import UseFetchRewarders from '../../hooks/UseFetchRewarders';
import UseFormatRewarders from '../../hooks/UseFormatRewarders';

function Rewarders() {
  const rewarders = UseFetchRewarders();
  const rewardersData = UseFormatRewarders(rewarders.rewarders);

  if (rewardersData.loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div>
      <div className="bg-neutral-700 m-2 text-2xl rounded-lg p-4 grid grid-cols-5 text-center">
        <div>Name</div>
        <div>Pool TVL</div>
        <div>Pool 24H volume</div>
        <div>Reward token</div>
        <div>Reward rate</div>
      </div>
      {rewardersData.data
        .sort((rewarderA, rewarderB) => {
          return rewarderA.lpReserveUSD > rewarderB.lpReserveUSD ? 0 : 1;
        })
        .map((rewarder, index) => {
          return (
            <div className="bg-neutral-600 m-2 text-xl rounded-lg p-2 grid grid-cols-5 text-center" key={index}>
              <div>{rewarder.lpName} Rewarder</div>
              <div>{rewarder.lpReserveUSD.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</div>
              <div>{rewarder.lp24hVolume.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</div>
              <div>{rewarder.tokenName}</div>
              <div>{parseFloat(formatUnits(rewarder.rewardPerBlock)).toFixed(4)} /block</div>
            </div>
          );
        })}
    </div>
  );
}

export default Rewarders;
