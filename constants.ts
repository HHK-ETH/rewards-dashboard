import { gql } from 'graphql-request';

export const SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/sushiswap/masterchef-v2-ethereum';

export const SUBGRAPH_QUERY = gql`
  query masterchefv2 {
    masterChefV2PoolInfos(first: 500) {
      id
      lpToken
      rewarder {
        id
        name
        rewardToken
        type
      }
    }
  }
`;
