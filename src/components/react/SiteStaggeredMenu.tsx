import StaggeredMenu from '../reactbits/StaggeredMenu/StaggeredMenu';
import { isNavActive, moreNav, primaryNav } from '../../data/site';

interface Props {
  currentPath?: string;
}

export default function SiteStaggeredMenu({ currentPath = '' }: Props) {
  const items = [
    ...primaryNav.filter((item) => item.href !== '/kontakt'),
    ...moreNav,
    ...primaryNav.filter((item) => item.href === '/kontakt'),
  ].map((item) => ({
    label: item.label,
    ariaLabel: item.label,
    link: item.href,
    active: isNavActive(currentPath, item.href),
  }));

  return (
    <StaggeredMenu
      position="left"
      isFixed
      externalHeader
      items={items}
      displaySocials={false}
      displayItemNumbering={false}
      colors={['#1a100a', '#6b3e1e']}
      accentColor="#e8b07a"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#ffffff"
      closeOnClickAway
      changeMenuColorOnOpen={false}
      ctaHref="/kabel-verkaufen"
      ctaLabel="KABEL VERKAUFEN"
    />
  );
}
