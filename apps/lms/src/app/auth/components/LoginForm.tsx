import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import clsxm from "~/utils/clsxm";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (response && response.error) {
      setError(response.error);
    }
  };

  return (
    <form
      className="relative flex flex-1 flex-col justify-between"
      onSubmit={handleSubmit}
    >
      <div className="mb-4 mt-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
          <label className=" whitespace-nowrap">E-mail:</label>
          <Input
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="w-44 border border-gray-500 bg-gray-200"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <label className=" whitespace-nowrap">Password:</label>
          <Input
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            className="w-44 border border-gray-500 bg-gray-200"
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <Link
            href={"/"}
            className=" whitespace-nowrap pt-[4px] transition-all hover:font-bold hover:underline hover:decoration-solid"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <Button>Login</Button>

      <div
        className={clsxm(
          "absolute -bottom-16 w-full rounded border border-red-500 bg-red-100 p-2",
          error ? "visible" : "invisible"
        )}
      >
        {error}
      </div>
    </form>
  );
};

export default LoginForm;
