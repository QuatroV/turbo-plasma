import { FiUser } from "react-icons/fi";
import useAuthStore from "~/stores/authStore";
import HeaderElement from "./HeaderElement";
import { useSession } from "next-auth/react";

const AuthHeaderElement = () => {
  const { data: session, status } = useSession();

  const setIsAuthModalOpen = useAuthStore((state) => state.setIsAuthModalOpen);

  const setIsProfileModalOpen = useAuthStore(
    (state) => state.setIsProfileModalOpen
  );

  if (session && status === "authenticated") {
    return (
      <HeaderElement
        onClick={() => setIsProfileModalOpen(true)}
        className="flex gap-2"
      >
        <FiUser size={20} />
        <span className="max-w-[60px] overflow-hidden text-ellipsis whitespace-pre font-bold">
          {session.user.name}
        </span>
      </HeaderElement>
    );
  }

  return (
    <HeaderElement onClick={() => setIsAuthModalOpen(true)}>
      <FiUser size={20} />
    </HeaderElement>
  );
};

export default AuthHeaderElement;
