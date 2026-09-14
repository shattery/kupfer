import StaggeredMenu from '../reactbits/StaggeredMenu/StaggeredMenu';
import { navItems } from '../../data/site';

export default function SiteStaggeredMenu() {
  const items = [
    ...navItems.map((item) => ({
      label: item.label,
      ariaLabel: item.label,
      link: item.href,
    })),
    {
      label: 'Kabel verkaufen',
      ariaLabel: 'Kabel verkaufen',
      link: '/kabel-verkaufen',
    },
  ];

  return (
    <StaggeredMenu
      position="left"
      isFixed
      items={items}
      displaySocials={false}
      displayItemNumbering
      colors={['#3f2512', '#9a5a28', '#b87333']}
      accentColor="#b87333"
      menuButtonColor="#ffffff"
      openMenuButtonColor="#0f172a"
      logoUrl="/logo-mark.svg"
      closeOnClickAway
      changeMenuColorOnOpen
    />
  );
}
