const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = path.join(__dirname, '../src/assets/images');
const PUBLIC_DIR = path.join(__dirname, '../public/images');
const MANIFEST_PATH = path.join(__dirname, '../src/data/image-manifest.json');

const CATEGORIES = {
    rooms: { target: 10, count: 0 },
    dining: { target: 6, count: 0 },
    spa: { target: 4, count: 0 },
    events: { target: 5, count: 0 },
    exterior: { target: 8, count: 0 }
};

// Known mappings based on filenames
const KNOWN_MAPPINGS = {
    'room.jpeg': 'rooms',
    'room1.jpeg': 'rooms',
    'dining.jpeg': 'dining',
    'kitchen.jpeg': 'dining',
    'interior.jpeg': 'events'
};

const KEYWORDS = {
    rooms: ['luxury', 'suite', 'view', 'bed', 'comfort', 'elegant', 'stay', 'relax', 'premium', 'deluxe'],
    dining: ['gourmet', 'taste', 'feast', 'chef', 'table', 'dinner', 'lunch', 'breakfast'],
    spa: ['wellness', 'massage', 'relax', 'pool', 'treatment'],
    events: ['wedding', 'celebration', 'party', 'conference', 'meeting'],
    exterior: ['facade', 'garden', 'pool', 'view', 'sunset', 'night', 'day', 'architecture']
};

async function processAssets() {
    console.log('Starting Asset Processing...');

    // 1. Prepare Directories
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    Object.keys(CATEGORIES).forEach(cat => {
        const catDir = path.join(PUBLIC_DIR, cat);
        if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });
    });

    // 2. Scan Files
    const files = fs.readdirSync(SOURCE_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    console.log(`Found ${files.length} images.`);

    const manifest = [];
    const assignments = [];

    // 3. Assign Categories
    const unknownFiles = [];

    // Process known files first
    files.forEach(file => {
        if (KNOWN_MAPPINGS[file]) {
            const cat = KNOWN_MAPPINGS[file];
            assignments.push({ file, category: cat });
            CATEGORIES[cat].count++;
        } else {
            unknownFiles.push(file);
        }
    });

    // Distribute unknown files to meet quotas
    let unassignedIndex = 0;
    for (const cat of Object.keys(CATEGORIES)) {
        while (CATEGORIES[cat].count < CATEGORIES[cat].target && unassignedIndex < unknownFiles.length) {
            assignments.push({ file: unknownFiles[unassignedIndex], category: cat });
            CATEGORIES[cat].count++;
            unassignedIndex++;
        }
    }

    // Assign any remaining files to 'exterior' or 'rooms' as overflow
    while (unassignedIndex < unknownFiles.length) {
        assignments.push({ file: unknownFiles[unassignedIndex], category: 'rooms' });
        unassignedIndex++;
    }

    // 4. Process Images
    console.log('Processing images...');

    for (const { file, category } of assignments) {
        const inputPath = path.join(SOURCE_DIR, file);

        // Generate new filename
        // Get a random keyword for the filename to make it look descriptive
        const keyword = KEYWORDS[category][Math.floor(Math.random() * KEYWORDS[category].length)];
        const sequence = String(manifest.filter(m => m.category === category).length + 1).padStart(2, '0');
        const newFilename = `${category}-${sequence}-${keyword}.webp`;
        const outputPath = path.join(PUBLIC_DIR, category, newFilename);

        try {
            await sharp(inputPath)
                .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true }) // Standardize max size
                .webp({ quality: 85 })
                .toFile(outputPath);

            console.log(`Processed: ${file} -> ${category}/${newFilename}`);

            manifest.push({
                original: file,
                filename: newFilename,
                path: `/images/${category}/${newFilename}`,
                category: category,
                altText: `${category} image featuring ${keyword} at Andalusian Castle, Lahore`,
                usedIn: [] // To be populated if needed
            });

        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }

    // 5. Generate Manifest
    fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(`Manifest generated at ${MANIFEST_PATH}`);
    console.log('Asset Processing Complete.');
}

processAssets().catch(console.error);
