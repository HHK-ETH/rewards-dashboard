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
        <div>Reward rate</div>
        <div>Reward due</div>
      </div>
    </div>
  );
}

export default Rewarders;
