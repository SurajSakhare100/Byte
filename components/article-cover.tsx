import Image from 'next/image';

type ArticleCoverProps = {
  coverImage: string;
  title: string;
};

export function ArticleCover({ coverImage, title }: ArticleCoverProps) {
  if (!coverImage.startsWith('/')) {
    return (
      <div
        className="mx-auto mt-8 h-48 max-w-5xl rounded-2xl sm:mt-10 sm:h-64 sm:rounded-3xl lg:h-96"
        style={{ background: coverImage }}
        role="img"
        aria-label={title}
      />
    );
  }

  return (
    <div className="relative mx-auto mt-8 h-48 max-w-5xl overflow-hidden rounded-2xl sm:mt-10 sm:h-64 sm:rounded-3xl lg:h-96">
      <Image
        src={coverImage}
        alt={title}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
        className="object-cover"
      />
    </div>
  );
}
