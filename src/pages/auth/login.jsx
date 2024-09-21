import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Log in to your account
            </h3>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div>
            <label className="font-medium">Email</label>
            <Input type="email" required />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <Input type="password" required />
          </div>

          <Button className="w-full text-neutral-100">
            <Link to={"/dashboard"}>Sign in</Link>
          </Button>
        </form>
      </div>
    </main>
  );
}
