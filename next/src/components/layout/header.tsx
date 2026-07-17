import Image from "next/image";
interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        <h1 className="text-2xl md:text-3xl font-extrabold  tracking-tight">
          {title}
        </h1>
        <p className="text-sm ">{subtitle}</p>
      </div>
    </header>
  );
}
