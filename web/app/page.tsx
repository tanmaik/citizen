export default function Home() {
  const formatDate = (date) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="justify-center flex py-5 ">
      <div className="w-full max-w-4xl">
        <div className="">
          <h1 className="text-center font-semibold text-4xl">pulse</h1>
          <p className="text-center mt-2 font-medium">
          {formatDate(new Date())}
          </p>
        </div>
        <hr className="mt-4" />
      </div>
    </div>
  );
}
