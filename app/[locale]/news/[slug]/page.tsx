import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover?: {
    id: number;
    url: string;
    alternativeText: string;
    width: number;
    height: number;
    formats?: {
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
    };
  };
  author?: {
    id: number;
    name: string;
    email: string;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
  };
  blocks?: Array<{
    __component: string;
    id: number;
    body?: string;
    title?: string;
  }>;
}

interface ArticleResponse {
  data: Article[];
}

// 獲取單篇文章
const getArticle = async (id: string): Promise<Article | null> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/articles/${id}?populate=*`, {
      next: { revalidate: 60 }, // 快取 60 秒
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.data || null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
};

// 生成靜態路徑（可選，用於 SSG）
export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/articles?fields[0]=documentId`);
    const result: ArticleResponse = await response.json();
    
    return result.data.map((article) => ({
      slug: article.documentId, // 使用 documentId 作為 slug 參數
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// 生成 metadata（SEO 優化）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.description?.substring(0, 160) || '',
  };
}

interface PageProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, locale } = await params;
  const article = await getArticle(slug);
  const t = await getTranslations('ArticlePage');
  
  if (!article) {
    notFound();
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <article>
        {/* 封面圖片 */}
        {article.cover && (
          <div className="mb-8">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${article.cover.formats?.large?.url || article.cover.url}`}
              alt={article.cover.alternativeText || article.title}
              width={article.cover.formats?.large?.width || article.cover.width}
              height={article.cover.formats?.large?.height || article.cover.height}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              priority={true}
            />
          </div>
        )}

        <header className="mb-8">
          {/* 分類標籤 */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">
                {article.category.name}
              </span>
            </div>
          )}

          {/* 標題 */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {article.title}
          </h1>

          {/* 描述 */}
          {article.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {article.description}
            </p>
          )}

          {/* 作者和日期資訊 */}
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              {article.author && (
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm mr-2">
                    {article.author.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{article.author.name}</span>
                </div>
              )}
            </div>
            <time dateTime={article.publishedAt}>
              {t('publishedOn', {
                date: new Date(article.publishedAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              })}
            </time>
          </div>
        </header>

        {/* 動態內容區塊 */}
        <div className="prose prose-lg max-w-none">
          {article.blocks?.map((block, index) => (
            <div key={index} className="mb-8">
              {block.__component === 'shared.rich-text' && block.body && (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: block.body.replace(/\n/g, '<br>') }}
                />
              )}
              
              {block.__component === 'shared.quote' && (
                <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 italic my-8 p-6 rounded-r-lg">
                  <p className="text-lg mb-2">{block.body}</p>
                  {block.title && (
                    <cite className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      — {block.title}
                    </cite>
                  )}
                </blockquote>
              )}
              
              {block.__component === 'shared.media' && (
                <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">媒體內容區塊</p>
                </div>
              )}
              
              {block.__component === 'shared.slider' && (
                <div className="my-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">輪播圖區塊</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </article>

      {/* 返回連結 */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <a
          href="/news"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← {t('backToNews')}
        </a>
      </div>
    </main>
  );
}
