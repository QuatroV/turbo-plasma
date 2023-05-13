import dynamic from "next/dynamic";
import useAuthStore from "~/stores/authStore";
import AuthForm from "./AuthForm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Modal = dynamic(() => import("../../../components/Modal"), {
  ssr: false,
});

const AuthModal = () => {
  const isOpen = useAuthStore((state) => state.isAuthModalOpen);
  const setIsOpen = useAuthStore((state) => state.setIsAuthModalOpen);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      setIsOpen(false);
    }
    if (!session && !isOpen && status !== "loading") {
      setIsOpen(true);
    }
  }, [session, isOpen]);

  return (
    <Modal open={isOpen} setOpen={setIsOpen}>
      <AuthForm />
    </Modal>
  );
};

export default AuthModal;
