import useSolutionStore from "~/stores/solutionStore";
import Solution from "./Solution";

const SolutionsContent = () => {
  const solutions = useSolutionStore((state) => state.solutions);
  const forceRerender = useSolutionStore((state) => state.forceRerender);

  return (
    <div className="flex flex-col gap-2 rounded-b-xl bg-white p-2">
      {solutions?.map((solution, id) => (
        <Solution key={id} solution={solution} />
      ))}
    </div>
  );
};

export default SolutionsContent;
