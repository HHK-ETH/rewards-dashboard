import Image from 'next/image';

function Header(): JSX.Element {
  return (
    <header className="p-2 bg-neutral-900 shadow-lg">
      <nav className="">
        <Image src={'/sushilogo.png'} alt={'Sushi Logo'} layout={'intrinsic'} height={'50'} width={'50'} />
        <h1 className="text-3xl inline-block align-top mt-2 ml-2">SUSHI</h1>
        <button className="float-right bg-neutral-700 py-1 px-4 text-xl font-semibold rounded-lg m-2">
          Connect wallet
        </button>
      </nav>
    </header>
  );
}

export default Header;
