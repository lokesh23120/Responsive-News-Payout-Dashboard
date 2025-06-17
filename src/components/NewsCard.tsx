import Image from "next/image";


interface NewsCardProps {
  title: string;
  author: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  sourceName: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  author,
  url,
  imageUrl,
  publishedAt,
  sourceName,
}) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-md">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={300}
          className="rounded"
        />
        <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">
          {author ? author : "Unknown Author"} | {new Date(publishedAt).toLocaleDateString()}
        </p>
        <p className="text-xs text-gray-400 mt-1">{sourceName}</p>
      </a>
    </div>
  );
};

export default NewsCard;
