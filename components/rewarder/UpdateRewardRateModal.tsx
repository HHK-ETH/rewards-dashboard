import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useAccount, useContract, useNetwork, useSigner } from 'wagmi';
import { Rewarder, REWARDER_ABI } from '../../constants';

function UpdateRewardRateModal({
  isOpen,
  setIsOpen,
  chainId,
  rewarder,
}: {
  isOpen: boolean;
  setIsOpen: Function;
  chainId: string;
  rewarder: Rewarder;
}): JSX.Element {
  const { data: signer } = useSigner();
  const { chain } = useNetwork();
  const rewarderContract = useContract({
    addressOrName: rewarder.id,
    contractInterface: REWARDER_ABI,
    signerOrProvider: signer,
  });
  const [amount, setAmount] = useState(0);
  const walletReady = !signer || !chain || chain.id !== parseInt(chainId, 10) ? false : true;
  function closeModal() {
    setIsOpen(false);
  }
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
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left text-white align-middle transition-all transform shadow-xl rounded-2xl bg-neutral-700">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-center ">
                  Update reward rate
                </Dialog.Title>
                {!walletReady && (
                  <h1 className="mt-4 text-xl text-center">Please connect your wallet to the right network.</h1>
                )}
                {walletReady && (
                  <div className="mt-4">
                    <input
                      className="block w-3/4 px-4 py-2 mx-auto text-xl text-center rounded-lg shadow-lg bg-neutral-500"
                      type={'text'}
                      placeholder={`Amount of ${rewarder.rewardToken.symbol} to transfer`}
                      value={amount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (isNaN(value)) {
                          setAmount(0);
                          return;
                        }
                        setAmount(value);
                      }}
                    />
                    <button
                      className="block w-2/4 px-4 py-2 mx-auto mt-4 text-xl rounded-lg shadow-lg bg-neutral-500 hover:opacity-80"
                      onClick={() => {}}
                    >
                      Set new reward rate
                    </button>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    className="float-right px-4 py-2 text-sm font-medium rounded-md bg-neutral-800 hover:opacity-70"
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

export default UpdateRewardRateModal;
