import Image, { type ImageProps } from "next/image";
import BlobLogoGray from "public/blob-logo-gray.png";
import BlobLogoWhite from "public/blob-logo-white.png";
import BlobLogo from "public/blob-logo.png";

type Props = Omit<ImageProps, "src" | "alt"> & {
  variant: keyof typeof IMG;
};

const IMG = {
  classic: BlobLogo,
  white: BlobLogoWhite,
  gray: BlobLogoGray,
};

const Logo = ({ variant = "classic", ...other }: Props) => {
  return (
    <Image src={IMG[variant]} alt="Logo" height={120} width={120} {...other} />
  );
};

export default Logo;
