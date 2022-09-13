import { Contract } from 'ethers';
import request from 'graphql-request';
import { useCallback, useEffect, useState } from 'react';
import { erc20ABI, useProvider } from 'wagmi';
import { EXCHANGE_SUBGRAPH_URL, LPTOKEN_SUBGRAPH_QUERY } from '../constants';

type RewarderData = {
  address: string;
  masterchefv2Id: number;
  lpAddress: string;
  lpName: string;
  lpReserveUSD: number;
  lp24hVolume: number;
  tokenName: string;
  tokenAddress: string;
  rewardPerBlock: string;
  rewardPerSecond: string;
};

function UseFormatRewarders(rewarders: any[]): { data: RewarderData[]; loading: boolean } {
  const provider = useProvider();
  const [data, setData]: [data: RewarderData[], setData: Function] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatRewarders = useCallback(async () => {
    setLoading(true);
    const result = await Promise.all(
      rewarders.map(async (rewarder: any): Promise<RewarderData> => {
        const rewardToken = new Contract(rewarder.rewarder.rewardToken, erc20ABI, provider);
        let symbol = 'UNKNOWN';
        let lpName = 'UNKNOWN';
        let lpReserveUSD = 0;
        let lp24hVolume = 0;
        if (rewardToken.address !== '0x0000000000000000000000000000000000000000') {
          symbol = await rewardToken.symbol();
        }
        const lpData = await request(EXCHANGE_SUBGRAPH_URL, LPTOKEN_SUBGRAPH_QUERY, { id: rewarder.lpToken });
        if (lpData.pair) {
          lpName = lpData.pair.name;
          lpReserveUSD = parseFloat(lpData.pair.reserveUSD);
          if (lpData.pair.dayData[0]) {
            lp24hVolume = parseFloat(lpData.pair.dayData[0].volumeUSD);
          }
        }
        return {
          address: rewarder.rewarder.id,
          masterchefv2Id: parseFloat(rewarder.id),
          lpAddress: rewarder.lpToken,
          lpName: lpName,
          lpReserveUSD: lpReserveUSD,
          lp24hVolume: lp24hVolume,
          tokenName: symbol,
          tokenAddress: rewardToken.address,
          rewardPerBlock: rewarder.rewarder.rewardPerBlock,
          rewardPerSecond: rewarder.rewarder.rewardPerSecond,
        };
      })
    );
    setData(result);
    setLoading(false);
  }, [provider, rewarders]);

  useEffect(() => {
    formatRewarders();
  }, [formatRewarders]);

  return { data, loading };
}

export default UseFormatRewarders;
