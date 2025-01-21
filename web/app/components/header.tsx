import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Weather from "./weather";
import DateDisplay from "./date-display";

export default async function Header() {
  const user = await currentUser();

  return (
    <nav className="">
      {user ? (
        <p>{user.username}</p>
      ) : (
        <SignInButton mode="modal">
          <button>login</button>
        </SignInButton>
      )}

      <h1 className="font-bold mt-4">pulse</h1>
      <DateDisplay />
      <Weather />
    </nav>
  );
}
