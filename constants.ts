import { gql } from 'graphql-request';

export const MASTERCHEFV2_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/sushiswap/masterchef-v2-ethereum';
export const EXCHANGE_SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange';

export const MASTERCHEFV2_SUBGRAPH_QUERY = gql`
  query masterchefv2 {
    masterChefV2PoolInfos(first: 500) {
      id
      lpToken
      rewarder {
        id
        name
        rewardToken
        type
        rewardPerBlock
        rewardPerSecond
      }
    }
  }
`;

export const LPTOKEN_SUBGRAPH_QUERY = gql`
  query lpToken($id: ID!) {
    pair(id: $id) {
      id
      name
      reserveUSD
      dayData(orderBy: date, orderDirection: desc, first: 1) {
        volumeUSD
        date
      }
    }
  }
`;
