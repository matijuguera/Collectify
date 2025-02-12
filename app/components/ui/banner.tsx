import { Skeleton } from "@/app/components/ui/skeleton";
import clsx from "clsx";
import Image from "next/image";

type BannerProps = {
  className?: string;
  src: string;
  height?: string;
};

export default function Banner({
  className,
  src,
  height = "130px",
}: BannerProps) {
  return (
    <div>
      <Image
        className={clsx(className, "border-solid rounded-lg")}
        src={src}
        width={0}
        height={0}
        alt="banner"
        sizes="100vw"
        style={{ width: "100%", height: height, objectFit: "cover" }} // optional
      />
    </div>
  );
}

export function BannerSkeleton() {
  return <Skeleton className="w-full h-[130px]" />;
}
