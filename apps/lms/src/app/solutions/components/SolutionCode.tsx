import { HiCode } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";

import { saveToClipboard } from "~/utils/clipboard";

type Props = {
  text: string;
};

const SolutionCode = ({ text }: Props) => {
  const handleCopy = () => saveToClipboard(text);

  return (
    <div>
      <div className="flex gap-2 rounded-t bg-gray-600 p-2 font-mono text-sm font-black text-white items-center">
        <HiCode />
        Solution Code
      </div>
      <div className="relative  w-full rounded-b bg-gray-700 p-2 font-mono text-sm text-white">
        <pre className="overflow-hidden selection:bg-white">{text}</pre>
        <div className="absolute right-2 top-2 flex items-center gap-2">
          <MdOutlineContentCopy
            onClick={handleCopy}
            className="cursor-pointer hover:scale-95 active:text-gray-400"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default SolutionCode;
