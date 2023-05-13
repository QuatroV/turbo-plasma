import { useRouter } from "next/router";
import Button from "~/components/Button";

export default function Custom404() {
  const router = useRouter();
  return (
    <div className=" h-full w-full font-rubik">
      <div className="bg-glass m-2 rounded-xl p-2">
        <div className="flex items-center gap-2">
          <div className="border-r border-black pr-2 text-4xl font-black">
            404
          </div>
          <div className="text-xl ">Page Not Found</div>
        </div>
      </div>
      <div className="bg-glass m-2 flex flex-col gap-2 rounded-xl p-2 text-sm">
        <div className="rounded bg-white p-2 ">
          The page you requested doesn't exist. Consider going back:
        </div>
        <div className="flex gap-2">
          <Button onClick={() => router.back()} className="py-1 px-2">
            Back
          </Button>
          <Button onClick={() => router.push("/")} className="py-1 px-2">
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}
