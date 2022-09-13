import request from 'graphql-request';
import { useCallback, useEffect, useState } from 'react';
import { MASTERCHEFV2_SUBGRAPH_QUERY, MASTERCHEFV2_SUBGRAPH_URL } from '../constants';

function UseFetchRewarders(): { rewarders: any[]; loading: boolean } {
  const [rewarders, setRewarders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRewarders = useCallback(async () => {
    setLoading(true);
    const results = await request(MASTERCHEFV2_SUBGRAPH_URL, MASTERCHEFV2_SUBGRAPH_QUERY);
    setRewarders(results.masterChefV2PoolInfos);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRewarders();
  }, [fetchRewarders]);

  return { rewarders, loading };
}

export default UseFetchRewarders;
