import request from 'graphql-request';
import { useCallback, useEffect, useState } from 'react';
import { SUBGRAPH_QUERY, SUBGRAPH_URL } from '../constants';

function UseFetchRewarders(): { rewarders: any[]; loading: boolean } {
  const [rewarders, setRewarders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRewarders = useCallback(async () => {
    setLoading(true);
    const results = await request(SUBGRAPH_URL, SUBGRAPH_QUERY);
    setRewarders(results.masterChefV2PoolInfos);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRewarders();
  }, [fetchRewarders]);

  return { rewarders, loading };
}

export default UseFetchRewarders;
