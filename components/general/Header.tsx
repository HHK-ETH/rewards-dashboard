import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ConnectModal from './ConnectModal';

function Header(): JSX.Element {
  const { address, isConnected } = useAccount();
  const [label, setLabel] = useState('Connect wallet');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isConnected && address) {
      setLabel(address.slice(0, 4) + '...' + address.slice(-4));
    }
  }, [isConnected, address]);

  return (
    <header className="p-2 bg-neutral-900 shadow-lg">
      <nav className="">
        <Image src={'/sushilogo.png'} alt={'Sushi Logo'} layout={'intrinsic'} height={'50'} width={'50'} />
        <h1 className="text-3xl inline-block align-top mt-2 ml-2">SUSHI</h1>
        <button
          className="float-right bg-neutral-700 py-1 px-4 text-xl font-semibold rounded-lg m-2"
          onClick={() => setIsOpen(true)}
        >
          {label}
        </button>
      </nav>
      <ConnectModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
