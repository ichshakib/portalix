import express, { type Request, type Response } from 'express';
import path from 'node:path';
import sitesData from './data/sites.json';

interface SiteItem {
  id: string;
  name: string;
  url: string;
  domain: string;
  category: string;
  regions?: string[];
  tags?: string[];
  isTrusted?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  description?: string;
  addedAt?: number;
  order?: number;
  faviconUrl?: string;
}

interface CategoryInfo {
  id: string;
  name: string;
  count: number;
  icon: string;
  desc: string;
}

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const VIEWS_DIR = path.resolve(process.cwd(), 'views');

// Configure View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));

// Prepare Category Metadata
const getCategoryList = (sites: SiteItem[]): CategoryInfo[] => {
  const baseCategories: Array<Omit<CategoryInfo, 'count'>> = [
    { id: 'movies-shows', name: 'Movies & Shows', icon: '🎬', desc: 'Free movie streaming sites, web series & HD cinema hubs' },
    { id: 'anime', name: 'Anime', icon: '🎌', desc: 'Subbed & dubbed anime streaming platforms and aggregators' },
    { id: 'manga', name: 'Manga', icon: '📖', desc: 'Online manga readers, scanlations, manhwa & webtoons' },
    { id: 'live-tv-sports', name: 'Live TV & Sports', icon: '⚽', desc: 'Live sports streams, PPV events, soccer, basketball & IPTV' },
    { id: 'paid', name: 'Paid', icon: '💳', desc: 'Official premium OTT platforms, subscription streaming & video on demand' },
    { id: 'apps', name: 'Apps', icon: '📱', desc: 'Mobile streaming APKs, media managers & streaming client applications' },
  ];

  return baseCategories.map((cat) => ({
    ...cat,
    count: sites.filter((s) => s.category.toLowerCase() === cat.name.toLowerCase()).length,
  }));
};

const sites: SiteItem[] = sitesData as SiteItem[];
const categories: CategoryInfo[] = getCategoryList(sites);

// Root Route: Server-side Render with EJS
app.get('/', (_req: Request, res: Response) => {
  res.render('index', {
    sites,
    categories,
    totalCount: sites.length,
  });
});

// API Sites Directory route
app.get('/api/sites', (_req: Request, res: Response) => {
  res.json(sites);
});

// API Info route
app.get('/api/info', (_req: Request, res: Response) => {
  res.json({
    name: 'portalix',
    version: '1.0.0',
    description: 'Portalix Media & Streaming Directory',
    status: 'active',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check route
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Portalix server is running at http://localhost:${PORT}`);
});
