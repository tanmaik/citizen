export default function Home() {
  return (
    <div className="justify-center flex py-5 ">
      <div className="w-full max-w-4xl">
        <div className="">
          <h1 className="text-center font-semibold text-4xl">pulse</h1>
          <p className="text-center mt-2 font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <hr className="mt-4" />
      </div>
    </div>
  );
}
