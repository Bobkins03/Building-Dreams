import { BuildData, PartItem, isPartCompatible } from "@/app/lib/builds";

export default function CompatibleCheck({ type, part, buildData }: {  type: string, part: PartItem | null, buildData: BuildData | null }) {

    return (
        part && buildData && !isPartCompatible(type, part, buildData) &&
        <div className="bg-red-500 py-1 rounded-t-lg text-center">Incompatible part!</div>
    );
}
  