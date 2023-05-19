import { useState } from "react";

import { api } from "~/utils/api";
import Button from "~/components/Button";
import Input from "~/components/Input";
import useSolutionStore from "~/stores/solutionStore";

type Props = {
  mark: number | null;
  solutionId: string;
};

const SolutionOptions = ({ mark, solutionId }: Props) => {
  const [value, setValue] = useState(mark || 0);
  const changeMark = useSolutionStore((state) => state.changeMark);
  const toggleForceRerender = useSolutionStore(
    (state) => state.toggleForceRerender,
  );

  const setMarkMutation = api.solution.setMark.useMutation();

  const handleSave = async () => {
    await setMarkMutation.mutateAsync({ solutionId, mark: String(value) });
    changeMark(solutionId, value);
    toggleForceRerender();
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div>Current score:</div>
      <Input
        min={0}
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        type="number"
        className="w-40 border py-1"
      />
      <Button className="border px-2 py-1" onClick={handleSave}>
        Set score
      </Button>
    </div>
  );
};

export default SolutionOptions;
