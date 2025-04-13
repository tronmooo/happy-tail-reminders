
import { PetType } from "@/types";
import { Cat, Dog, Bird, Fish, Rabbit, Bone } from "lucide-react";

interface PetIconProps {
  petType: PetType;
  size?: number;
  className?: string;
}

const PetIcon = ({ petType, size = 24, className = "" }: PetIconProps) => {
  switch (petType) {
    case "dog":
      return <Dog size={size} className={className} />;
    case "cat":
      return <Cat size={size} className={className} />;
    case "bird":
      return <Bird size={size} className={className} />;
    case "fish":
      return <Fish size={size} className={className} />;
    case "rabbit":
      return <Rabbit size={size} className={className} />;
    case "other":
    default:
      return <Bone size={size} className={className} />;
  }
};

export default PetIcon;
