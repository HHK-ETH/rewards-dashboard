import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import ConnectModal from './ConnectModal';

function Header(): JSX.Element {
  const { address, isConnected, connector } = useAccount();
  const [label, setLabel] = useState('Connect wallet');
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isConnected && address && connector) {
      setLabel(address.slice(0, 4) + '...' + address.slice(-4));
    }
  }, [isConnected, address, connector]);

  return (
    <header className="p-2 shadow-lg bg-neutral-900">
      <nav className="">
        <Link href={'/'}>
          <div className="inline-block cursor-pointer">
            <Image src={'/sushilogo.png'} alt={'Sushi Logo'} layout={'intrinsic'} height={'50'} width={'50'} />
            <h1 className="inline-block mt-2 ml-2 text-3xl align-top">SUSHI</h1>
          </div>
        </Link>
        <button
          className="float-right px-4 py-1 m-2 text-xl font-semibold rounded-lg bg-neutral-700"
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
