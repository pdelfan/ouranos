import Image from "next/image";

export default function NotFound() {
  return (
    <main className="flex h-[100svh] flex-col items-center justify-center p-3">
      <div className="flex items-center gap-3">
        <Image
          src="/ouranos.svg"
          alt="Ouranos logo"
          width={40}
          height={40}
          className="block transition-transform duration-700 ease-in-out hover:rotate-180"
        />
        <Image
          src="/ouranosText.svg"
          alt="Ouranos text"
          width={70}
          height={20}
        />
      </div>
      <h1 className="mt-2 text-center text-lg sm:text-xl">
        The page you are looking for could not be found
      </h1>
    </main>
  );
}
