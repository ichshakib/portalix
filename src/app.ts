import express, { type Request, type Response } from 'express';
import path from 'node:path';
import rateLimit from 'express-rate-limit';
import sitesData from './data/sites.json';

export interface SiteItem {
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

export interface CategoryInfo {
  id: string;
  name: string;
  count: number;
  icon: string;
  desc: string;
}

const app = express();
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const VIEWS_DIR = path.resolve(process.cwd(), 'views');

// Trust reverse proxies (e.g. Vercel, Cloudflare, Nginx)
app.set('trust proxy', 1);

// Enable Strong ETags for accurate 304 Not Modified validation
app.set('etag', 'strong');

// Configure View Engine (EJS)
app.set('view engine', 'ejs');
app.set('views', VIEWS_DIR);

// Global Rate Limiter: 300 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
});

// API Rate Limiter: 100 requests per 5 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'API rate limit exceeded. Please try again after 5 minutes.',
  },
});

// Apply Rate Limiters
app.use(globalLimiter);
app.use('/api', apiLimiter);

// Core Middleware & Static Assets Caching (7 days)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR, {
  maxAge: '7d',
  etag: true,
}));

// Prepare Category Metadata with Lucide Icon identifiers
const getCategoryList = (sites: SiteItem[]): CategoryInfo[] => {
  const baseCategories: Array<Omit<CategoryInfo, 'count'>> = [
    { id: 'movies-shows', name: 'Movies & Shows', icon: 'film', desc: 'Free movie streaming sites, web series & HD cinema hubs' },
    { id: 'anime', name: 'Anime', icon: 'tv', desc: 'Subbed & dubbed anime streaming platforms and aggregators' },
    { id: 'manga', name: 'Manga', icon: 'book-open', desc: 'Online manga readers, scanlations, manhwa & webtoons' },
    { id: 'live-tv-sports', name: 'Live TV & Sports', icon: 'trophy', desc: 'Live sports streams, PPV events, soccer, basketball & IPTV' },
    { id: 'paid', name: 'Paid', icon: 'credit-card', desc: 'Official premium OTT platforms, subscription streaming & video on demand' },
    { id: 'apps', name: 'Apps', icon: 'layout-grid', desc: 'Mobile streaming APKs, media managers & streaming client applications' },
  ];

  return baseCategories.map((cat) => ({
    ...cat,
    count: sites.filter((s) => s.category.toLowerCase() === cat.name.toLowerCase()).length,
  }));
};

const sites: SiteItem[] = sitesData as SiteItem[];
const categories: CategoryInfo[] = getCategoryList(sites);

// Cache-Control Header Presets
const CACHE_HEADERS = {
  // Edge/CDN cache 24h, browser cache 30 min, stale-while-revalidate 12h
  PAGE: 'public, max-age=1800, s-maxage=86400, stale-while-revalidate=43200',
  // Static API cache: Edge 24h, browser 1h, stale-while-revalidate 24h
  API_STATIC: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
  // Dynamic info/status: Browser 1 min, Edge 10 min
  DYNAMIC: 'public, max-age=60, s-maxage=600',
};

// Root Route: Directory Index (with Edge & Browser Caching)
app.get('/', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', CACHE_HEADERS.PAGE);
  res.render('index', {
    sites,
    categories,
    totalCount: sites.length,
  });
});

// About Page (Cached)
app.get('/about', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', CACHE_HEADERS.PAGE);
  res.render('about', {
    categories,
    totalCount: sites.length,
  });
});

// Submit / Request Site Page (Cached)
app.get('/submit', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', CACHE_HEADERS.PAGE);
  res.render('submit', {
    categories,
    totalCount: sites.length,
  });
});

// API Sites Directory route (High-performance cached JSON response)
app.get('/api/sites', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', CACHE_HEADERS.API_STATIC);
  res.json(sites);
});

// API Info route
app.get('/api/info', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', CACHE_HEADERS.DYNAMIC);
  res.json({
    name: 'portalix',
    version: '1.0.0',
    description: 'Portalix Media & Streaming Directory',
    status: 'active',
    environment: process.env.NODE_ENV || 'development',
  });
});

// Health check route (No-cache for real-time monitoring)
app.get('/health', (_req: Request, res: Response) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;
