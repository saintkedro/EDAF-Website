import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center">
      <Image
        src={onDark ? "/edaf-logo-light.svg" : "/edaf-logo.svg"}
        alt={`${site.name}: ${site.tagline}`}
        width={800}
        height={232}
        loading={onDark ? "lazy" : "eager"}
        unoptimized
        className="h-12 w-auto lg:h-14"
      />
    </Link>
  );
}
