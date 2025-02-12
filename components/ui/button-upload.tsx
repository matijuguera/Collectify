import { CirclePlus } from "lucide-react";
import { Button } from "./button";

type ButtonUploadProps = { className?: string };

export default function ButtonUpload({ className }: ButtonUploadProps) {
  // TODO: const router = useRouter();

  function onClick() {
    // TODO: router.push("/upload");
  }

  return (
    <Button className={className} variant="outline" onClick={onClick}>
      <CirclePlus />
      Upload
    </Button>
  );
}
