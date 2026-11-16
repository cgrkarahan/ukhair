import Image from "next/image";

type BlogImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "eager" | "lazy";
};

export default function BlogImage({
  src,
  alt,
  sizes,
  className,
  style,
  loading = "lazy",
}: BlogImageProps) {
  if (/^https:\/\//i.test(src)) {
    return (
      // Openverse originals intentionally stay remote so a new article does
      // not require a code deployment. Selection is restricted server-side.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        className={className}
        style={style}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={loading === "eager"}
      className={className}
      style={style}
    />
  );
}
