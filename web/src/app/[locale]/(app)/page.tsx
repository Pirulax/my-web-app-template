import { getTranslations } from 'next-intl/server';
import { ColorSchemeToggle } from '../../../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../../../components/Welcome/Welcome';

export async function generateMetadata() {
  const t = await getTranslations('Pages.Home');
  return {
    title: t('Title'),
  };
}

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
