export interface MegaMenuItem {
  title: string;
  description: string;
  badge?: string;
  href: string;
  iconName?: string;
}

export interface MegaMenuColumn {
  category: string;
  iconName?: string;
  items: MegaMenuItem[];
}

export interface NavMegaMenu {
  id: string;
  label: string;
  type: 'mega-3-col' | 'links-list' | 'direct-link';
  href?: string;
  columns?: MegaMenuColumn[];
  links?: { title: string; description: string; href: string; badge?: string }[];
}

export interface ServiceCard {
  id: string;
  category: 'build' | 'cloud' | 'design';
  title: string;
  badge?: string;
  description: string;
  technologies: string[];
  metrics: string;
  iconName: string;
}

export interface SolutionItem {
  id: string;
  name: string;
  tagline: string;
  features: string[];
  metrics: string;
  category: 'business-ops' | 'customer-apps' | 'industry-platforms';
  demoUrl?: string;
}

export interface IndustryVertical {
  id: string;
  title: string;
  tagline: string;
  description: string;
  useCases: string[];
  complianceBadge: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  rating: number;
  verifiedSource: string;
  impactMetric: string;
}
