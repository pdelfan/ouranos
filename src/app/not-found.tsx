import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center p-3 h-[100svh]">
      <div className="flex items-center gap-3">
        <Image
          src="/ouranos.svg"
          alt="Ouranos logo"
          width={40}
          height={40}
          className="block transition-transform ease-in-out duration-700 hover:rotate-180"
        />
        <Image
          src="/ouranosText.svg"
          alt="Ouranos text"
          width={70}
          height={20}
        />
      </div>
      <h1 className="text-center text-lg sm:text-xl mt-2">
        The page you are looking for could not be found
      </h1>
    </main>
  );
}
