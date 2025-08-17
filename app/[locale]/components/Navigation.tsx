import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LocaleSwitcher";

const Navigation = () => {

  const t = useTranslations('Navigation');
    return (
      <nav className="sticky top-0 left-0 w-full z-50">
        <ul>
            <li><Link href="/">{t('home')}</Link></li>
            <li><Link href="/about">{t('about')}</Link></li>
            <li><Link href="/news">{t('news')}</Link></li>
        </ul>
        <LanguageSwitcher />
      </nav>
    )
}

export default Navigation;