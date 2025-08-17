import { getTranslations } from 'next-intl/server';

const AboutPage = async () => {
  const t = await getTranslations('AboutPage');
  return (
    <main>
      <h1>{t('title')}</h1>
    </main>
  )
}

export default AboutPage;