/**
 * @fileoverview Sitemap Generator Script.
 * Generates XML sitemap for SEO (SRS 5.3.4).
 * Run with: node scripts/generate-sitemap.js
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

// Site configuration
const SITE_URL = 'https://andalusiancastle.com';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Pages configuration
const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/#rooms', priority: '0.9', changefreq: 'weekly' },
    { url: '/#amenities', priority: '0.8', changefreq: 'monthly' },
    { url: '/#dining', priority: '0.8', changefreq: 'monthly' },
    { url: '/#gallery', priority: '0.7', changefreq: 'monthly' },
    { url: '/#testimonials', priority: '0.6', changefreq: 'monthly' },
    { url: '/#offers', priority: '0.9', changefreq: 'weekly' },
    { url: '/#location', priority: '0.8', changefreq: 'monthly' },
];

/**
 * Generate XML sitemap content.
 * @returns {string} XML sitemap content
 */
function generateSitemap() {
    const urlEntries = pages.map(page => `
  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  <!-- Andalusian Castle Sitemap -->
  <!-- Generated: ${new Date().toISOString()} -->${urlEntries}
</urlset>`;
}

/**
 * Write sitemap to public folder.
 */
function writeSitemap() {
    const sitemap = generateSitemap();
    const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

    fs.writeFileSync(outputPath, sitemap, 'utf8');
    console.log(`✅ Sitemap generated: ${outputPath}`);
    console.log(`   ${pages.length} URLs included`);
}

// Run generator
writeSitemap();
