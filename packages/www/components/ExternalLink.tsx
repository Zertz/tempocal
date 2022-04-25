import { ExternalLinkIcon } from "@heroicons/react/outline";

export default function ExternalLink({
  children,
  href,
}: {
  children: string;
  href: string;
}) {
  return (
    <a
      className="inline-flex items-center gap-1 underline hover:text-gray-300 transition-colors"
      href={href}
      rel="noopener noreferrer"
    >
      {children}
      <ExternalLinkIcon className="w-4 h-4" />
    </a>
  );
}
