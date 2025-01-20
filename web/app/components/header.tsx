import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Weather from "./weather";

export default async function Header() {
  const user = await currentUser();
  console.log(user);

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
        <p>
          {new Date()
            .toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })
            .toLowerCase()}
        </p>
      </div>
      <div>
        <Weather />
      </div>
    </nav>
  );
}
