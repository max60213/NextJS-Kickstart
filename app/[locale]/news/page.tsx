import { getTranslations } from 'next-intl/server';

const NewsPage = async () => {
    const t = await getTranslations('NewsPage');
    return (
        <main>
            <h1>{t('title')}</h1>
        </main>
    )
}

export default NewsPage;