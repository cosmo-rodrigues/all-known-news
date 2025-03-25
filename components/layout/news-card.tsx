import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Article } from '@/types';

export const NewsCard = ({ article }: { article: Article }) => {
  return (
    <Card className="h-full flex flex-col">
      {article.imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader>
        <h3 className="text-lg font-semibold line-clamp-2">{article.title}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {article.description || 'No description available'}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{article.source_name}</span>
        <span className="text-muted-foreground">
          {format(new Date(article.publishedAt), 'MMM dd, yyyy')}
        </span>
      </CardFooter>
      <Link
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inset-0"
      />
    </Card>
  );
};
