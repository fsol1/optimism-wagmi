import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { abi } from "@/optimismDepositABI";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";

export default function Home() {
  const [inputValue, setInputValue] = useState<number>(0);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({ address: address });

  const { config } = usePrepareContractWrite({
    address: "0x99C9fc46f92E8a1c0deC1b1747d010903E884bE1",
    abi: abi,
    functionName: "depositETH",
    args: [200000, "0x"],
  });

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setInputValue(parseFloat(e.currentTarget.value));
  };

  const onClickHandler = () => {
    setInputValue(parseFloat(data?.formatted!));
  };

  return (
    <>
      <nav className="flex h-20 items-center justify-end bg-[#1A1E24]">
        <div className="mr-10">
          <ConnectButton />
        </div>
      </nav>

      <div className="mx-auto mt-20 flex h-[750px] w-[750px] flex-col rounded-2xl bg-[#1A1E24]">
        <div className="pt-12 pl-12">
          <button className="mr-7 text-4xl font-bold text-[#eb0822]">
            Deposit
          </button>
          <button className="text-4xl text-[#718096]">Withdraw</button>
        </div>
        <div className="mx-12 mt-12 h-[190px] rounded-2xl bg-[#15171A] text-white">
          <div className="flex items-center p-7 py-5">
            <h2 className="mr-5 text-xl text-[#718096]">From</h2>
            <h2 className="text-xl font-semibold text-white">
              Ethereum Mainnet
            </h2>
          </div>
          <div className="flex px-7">
            <input
              className="h-16 w-full rounded-l-2xl border border-[#718096] bg-[#1A1E24] pl-5 text-2xl font-bold text-white focus:outline-none"
              type="number"
              min={0}
              placeholder="0.0"
              onChange={onChangeHandler}
              value={inputValue}
            />
            <div className="flex w-52 items-center justify-center rounded-r-2xl border border-[#718096] bg-[#1A1E24]">
              <h1 className="text-2xl">ETH</h1>
            </div>
          </div>
          <div className="flex items-center text-xl">
            <h2 className="py-4 pl-7 pr-2 text-[#718096]">
              Balance: {parseFloat(data?.formatted.substring(0, 6)!)} ETH
            </h2>
            <button className="text-[#eb0822]" onClick={onClickHandler}>
              (Max)
            </button>
          </div>
        </div>

        <button className="mx-auto my-4">
          <ArrowDown color="#eb0822" size={34} />
        </button>

        <div className="mx-12 h-[150px] rounded-2xl bg-[#15171A] text-white">
          <div className="p-7 text-xl text-[#718096]">
            <div className="flex items-center">
              <h2 className="mr-5">To</h2>
              <h2 className="font-semibold text-white">Optimism</h2>
            </div>
            <h2>You will receive: {inputValue} ETH</h2>
            <h2>Balance: 0 ETH</h2>
          </div>
        </div>

        <button className="m-12 flex h-20 items-center justify-center rounded-2xl bg-[#eb0822] text-2xl font-bold text-white">
          Deposit
        </button>
      </div>
    </>
  );
}
