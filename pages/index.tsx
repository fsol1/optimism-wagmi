import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useBalance } from "wagmi";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { data, isError, isLoading } = useBalance({ address: address });

  return (
    <>
      <nav className="flex h-20 items-center justify-end bg-[#1A1E24]">
        <div className="mr-10">
          <ConnectButton />
        </div>
      </nav>

      <div className="mx-auto mt-20 h-[750px] w-[750px] rounded-2xl bg-[#1A1E24]">
        <div className="pt-12 pl-12">
          <button className="mr-7 text-4xl font-bold text-[#eb0822]">
            Deposit
          </button>
          <button className="text-4xl text-[#718096]">Withdraw</button>
        </div>

        <div className="mx-12 mt-12 h-[180px] rounded-2xl bg-[#15171A] text-white">
          <div className="flex items-center p-7">
            <h2 className="mr-5 text-xl text-[#718096]">From</h2>
            <h2 className="text-xl text-white">Ethereum Mainnet</h2>
          </div>
          <div className="flex px-7">
            <input
              className="h-16 w-full rounded-l-2xl border border-[#718096] bg-[#1A1E24] pl-5 text-2xl font-bold text-white focus:outline-none"
              type="number"
              min={0}
              placeholder="0.0"
            />
            <div className="flex w-52 items-center justify-center rounded-r-2xl border border-[#718096] bg-[#1A1E24]">
              <h1 className="text-2xl">ETH</h1>
            </div>
          </div>
          <h2 className="py-4 pl-7 text-xl text-[#718096]">
            Balance: {data?.formatted.substring(0, 6)} ETH
          </h2>
        </div>
      </div>
    </>
  );
}
