import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

function ConnectModal({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }) {
  const injected = useConnect({
    connector: new InjectedConnector(),
  });
  const walletConnect = useConnect({
    connector: new WalletConnectConnector({
      options: {
        qrcode: true,
      },
    }),
  });
  const { connector } = useAccount();

  function closeModal() {
    setIsOpen(false);
  }
  const [injectedBg, setInjectedBg] = useState('bg-neutral-800');
  const [walletConnectBg, setWalletConnectBg] = useState('bg-neutral-800');

  useEffect(() => {
    if (!connector) return;
    if (connector.name !== 'WalletConnect') {
      setInjectedBg('bg-green-700');
      setWalletConnectBg('bg-neutral-800');
    } else {
      setInjectedBg('bg-neutral-800');
      setWalletConnectBg('bg-green-700');
    }
  }, [connector, injected.isSuccess, walletConnect.isSuccess]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full text-white max-w-md transform overflow-hidden rounded-2xl bg-neutral-700 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg text-center font-medium leading-6 ">
                  Connect wallet
                </Dialog.Title>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    className={'py-1 px-4 text-md font-semibold rounded-lg hover:opacity-70 ' + injectedBg}
                    onClick={() => {
                      injected.connect();
                    }}
                  >
                    Injected/Metamask
                  </button>
                  <button
                    className={'py-1 px-4 text-md font-semibold rounded-lg hover:opacity-70 ' + walletConnectBg}
                    onClick={() => {
                      walletConnect.connect();
                    }}
                  >
                    WalletConnect
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="float-right rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium hover:opacity-70"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConnectModal;
