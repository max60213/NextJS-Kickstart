import { getTranslations } from 'next-intl/server';
import './home/home.css';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return (
    <main>
      <h1 className='test'>{t('title')}</h1>
    </main>
  );
}