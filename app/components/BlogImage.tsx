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
  if (/^https:\/\//i.test(src) || src.startsWith("/api/research-image")) {
    return (
      // Licensed remote originals and article-specific fallback illustrations
      // intentionally bypass Next image optimisation, so publishing never
      // requires a code deployment just to add an image.
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
