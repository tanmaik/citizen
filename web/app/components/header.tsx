import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Weather from "./weather";
import DateDisplay from "./date-display";

export default async function Header() {
  const user = await currentUser();

  return (
    <nav className="flex justify-between items-end py-4 border-b">
      <div className="text-left">
        {user ? (
          <UserButton />
        ) : (
          <SignInButton mode="modal">
            <button>login</button>
          </SignInButton>
        )}
      </div>
      <div className="text-center">
        <h1 className="font-bold">pulse</h1>
        <DateDisplay />
      </div>
      <div>
        <Weather />
      </div>
    </nav>
  );
}
