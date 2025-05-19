import Image from "next/image";

export default function Page() {
  return (
    <div className="w-full row-span-3 h-full flex flex-col justify-center items-center gap-4 md:rounded-2xl bg-muted">
      <Image
        src="/echoes-logo.png"
        alt="Logo"
        width={200}
        height={200}
        priority
        className="opacity-50 mb-4 h-auto"
      />
      <p className="text-4xl font-medium opacity-50">EchoApp Web</p>
      <p className="w-[500px] text-center text-balance opacity-30">
        Bringing the best of real-time messaging and dynamic communities
        together—connect, chat, and grow, all in one seamless experience. 🚀
      </p>
    </div>
  );
}
