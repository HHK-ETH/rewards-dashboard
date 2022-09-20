import { BigNumber } from 'ethers';
import erc20ABI from './abis/erc20.json';
import rewarderABI from './abis/rewarder.json';

export const ERC20_ABI = erc20ABI;
export const REWARDER_ABI = rewarderABI;

export enum ChainId {
  ETHEREUM = 1,
  POLYGON = 137,
  FANTOM = 250,
  GNOSIS = 100,
  ARBITRUM = 42161,
  HARMONY = 1666600000,
  CELO = 42220,
  MOONRIVER = 1285,
  FUSE = 122,
  MOONBEAM = 1284,
  KAVA = 2222,
  METIS = 1088,
}

export const MINICHEF_ADDRESS: { [chainId: number]: string } = {
  [ChainId.ETHEREUM]: '0xEF0881eC094552b2e128Cf945EF17a6752B4Ec5d',
  [ChainId.POLYGON]: '0x0769fd68dFb93167989C6f7254cd0D766Fb2841F',
  [ChainId.GNOSIS]: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
  [ChainId.HARMONY]: '0x67dA5f2FfaDDfF067AB9d5F025F8810634d84287',
  [ChainId.ARBITRUM]: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
  [ChainId.CELO]: '0x8084936982D089130e001b470eDf58faCA445008',
  [ChainId.MOONRIVER]: '0x3dB01570D97631f69bbb0ba39796865456Cf89A5',
  [ChainId.FUSE]: '0x182CD0C6F1FaEc0aED2eA83cd0e160c8Bd4cb063',
  [ChainId.FANTOM]: '0xf731202A3cf7EfA9368C2d7bD613926f7A144dB5',
  [ChainId.MOONBEAM]: '0x011E52E4E40CF9498c79273329E8827b21E2e581',
  [ChainId.KAVA]: '0xf731202A3cf7EfA9368C2d7bD613926f7A144dB5',
  [ChainId.METIS]: '0x1334c8e873E1cae8467156e2A81d1C8b566B2da1',
};

export type Rewarder = {
  id: string;
  masterchefId: number;
  balance: BigNumber;
  rewardsDue: BigNumber;
  rewardToken: {
    id: string;
    decimals: number;
    symbol: string;
  };
  rewardPerBlock: BigNumber;
  rewardPerSecond: BigNumber;
  pair: {
    id: string;
    symbol: string;
    volumeUSD: number[]; //last 30 days volume
    reserveUSD: number;
  };
  lastUpdated: number;
};
