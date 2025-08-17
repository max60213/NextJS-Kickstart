import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LocaleSwitcher";

const Navigation = () => {

  const t = useTranslations('Navigation');
  return (
    <nav className="navigation sticky p-4 flex justify-between top-0 left-0 w-full z-50">
      <ol className="ps-4">
        <li><Link href="/">{t('home')}</Link></li>
        <li>{t('more.title')}
          <ol className="ps-4">
            <li><Link href="/about">{t('more.about')}</Link></li>
            <li><Link href="/news">{t('more.news')}</Link></li>
          </ol>
        </li>
      </ol>
      <LanguageSwitcher />
    </nav>
  )
}

export default Navigation;