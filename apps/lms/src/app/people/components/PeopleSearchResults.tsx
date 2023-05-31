import usePeopleStore from "../stores/peopleStore";
import PeopleItem from "./PeopleItem";

type Props = {
  refetch: () => void;
};

const PeopleSearchResults = ({ refetch }: Props) => {
  const people = usePeopleStore((state) => state.people);
  return (
    <div className="rounded-b-lg bg-white p-2 text-sm">
      {people.map((person, idx, arr) => (
        <PeopleItem
          person={person}
          key={person.id}
          first={idx === 0}
          last={idx === arr.length - 1}
          refetch={refetch}
        />
      ))}
    </div>
  );
};

export default PeopleSearchResults;
