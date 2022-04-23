import { LinkIcon } from "@heroicons/react/outline";

export function AnchorHeader({
  children,
  id,
}: {
  children: string;
  id: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between border-b border-solid border-gray-400 pb-2">
      <h4 id={id} className="text-xl font-bold">
        <a className="flex items-center group relative" href={`#${id}`}>
          <LinkIcon className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity absolute -left-5" />
          {children}
        </a>
      </h4>
    </div>
  );
}
