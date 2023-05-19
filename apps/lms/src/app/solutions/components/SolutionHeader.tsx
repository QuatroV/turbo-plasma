import { type Prisma } from "@plasma/db";

type Props = {
  solver: Prisma.UserGetPayload<{}> | null;
  mark: number | null;
  createdAt: Date;
  onClick: () => void;
};

const SolutionHeader = ({ solver, mark, createdAt, onClick }: Props) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-between"
      onClick={onClick}
    >
      <div>
        <div className="text-lg font-bold">
          {solver?.name} {solver?.surname}{" "}
          <span className="text-sm text-gray-500">{solver?.email}</span>
        </div>
        <div className="text-sm text-gray-500">
          {createdAt?.toLocaleString()}{" "}
        </div>
      </div>
      {mark ? (
        <div>
          score:<span className="ml-1 text-3xl font-bold">{mark}</span>
        </div>
      ) : null}
    </div>
  );
};

export default SolutionHeader;
