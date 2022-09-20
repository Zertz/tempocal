import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

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
      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
    </a>
  );
}
