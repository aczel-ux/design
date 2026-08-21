export const site = {
  name: 'aczel.design',
  person: 'Dániel Z. Aczél',
  email: 'aczeldz@gmail.com',
  phone: '+36 70 386 1739',
  phoneHref: 'tel:+36703861739',
  behance: 'https://www.behance.net/danielzaczel/',
  linkedin: 'https://www.linkedin.com/in/aczel/',
  description:
    'UX/UI and graphic design by Dániel Z. Aczél — digital products, design systems, branding and visual communication.',
};

export const withBase = (path = '/') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`.replace(/\/+/g, '/');
};

export const categories = {
  'ux-ui': { label: 'UX / UI', href: '/ux-ui/' },
  'web-design': { label: 'Web Design', href: '/web-design/' },
  'brand-logo': { label: 'Brand / Logo', href: '/brand-logo/' },
  graphics: { label: 'Graphics / Other', href: '/graphics/' },
} as const;
