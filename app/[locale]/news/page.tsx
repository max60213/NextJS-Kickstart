import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const getArticles = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${baseUrl}/api/articles?populate=*`);
  const articles = await response.json();
  console.log(articles.data);
  return articles.data;
}

const NewsPage = async () => {
  const articles = await getArticles();
  const t = await getTranslations('NewsPage');
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">{t('title')}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: any) => (
          <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* 封面圖片 */}
            {article.cover && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${article.cover.formats?.medium?.url || article.cover.url}`}
                  alt={article.cover.alternativeText || article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="p-6">
              {/* 分類標籤 */}
              {article.category && (
                <div className="mb-3">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
                    {article.category.name}
                  </span>
                </div>
              )}

              {/* 標題 */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                <Link 
                  href={`/news/${article.documentId}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {article.title}
                </Link>
              </h2>

              {/* 描述 */}
              {article.description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {article.description}
                </p>
              )}

              {/* 作者和日期 */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                <div className="flex items-center space-x-2">
                  {article.author && (
                    <>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                        {article.author.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-xs">{article.author.name}</span>
                    </>
                  )}
                </div>
                <time dateTime={article.publishedAt} className="text-xs">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </time>
              </div>

              {/* 閱讀更多連結 */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href={`/news/${article.documentId}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                >
                  閱讀更多 →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}

export default NewsPage;