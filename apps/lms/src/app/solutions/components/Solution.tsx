import { useState } from "react";

import { type SolutionForClient } from "@plasma/api/src/routers/task";

import SolutionCode from "./SolutionCode";
import SolutionHeader from "./SolutionHeader";
import SolutionOptions from "./SolutionOptions";

type Props = {
  solution: SolutionForClient;
};

const Solution = ({ solution }: Props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex flex-col gap-2 rounded-lg border p-2">
      <SolutionHeader
        mark={solution.mark}
        solver={solution.solver}
        createdAt={solution.createdAt}
        onClick={() => setCollapsed((prev) => !prev)}
      />
      {!collapsed && (
        <>
          <SolutionCode text={solution.content} />
          <SolutionOptions mark={solution.mark} solutionId={solution.id} />
        </>
      )}
    </div>
  );
};

export default Solution;
