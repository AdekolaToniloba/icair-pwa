#!/usr/bin/env node
/**
 * Speaker Image Optimization Script
 * 
 * This script optimizes speaker images for the PWA:
 * - Resizes to 400x400px (perfect for grid display)
 * - Converts to WebP format
 * - Maintains quality while reducing file size
 * - Generates both thumbnail and full-size versions
 * 
 * Usage:
 *   node optimize-images.js
 * 
 * Prerequisites:
 *   npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
    inputDir: './public/speakers-original',
    outputDir: './public/speakers',
    thumbnailSize: 400, // Grid view
    fullSize: 800, // Modal view
    quality: 80,
    format: 'webp',
};

// Ensure output directory exists
async function ensureDir(dir) {
    try {
        await fs.mkdir(dir, { recursive: true });
        console.log(`✓ Created directory: ${dir}`);
    } catch (error) {
        if (error.code !== 'EEXIST') throw error;
    }
}

// Generate blur placeholder data URL
async function generateBlurPlaceholder(inputPath) {
    try {
        const buffer = await sharp(inputPath)
            .resize(20, 20, { fit: 'cover' })
            .blur(5)
            .webp({ quality: 20 })
            .toBuffer();

        return `data:image/webp;base64,${buffer.toString('base64')}`;
    } catch (error) {
        console.error(`Error generating blur placeholder for ${inputPath}:`, error.message);
        return null;
    }
}

// Optimize a single image
async function optimizeImage(inputPath, outputPath, size) {
    try {
        const info = await sharp(inputPath)
            .resize(size, size, {
                fit: 'cover',
                position: 'center',
            })
            .webp({
                quality: CONFIG.quality,
                effort: 6, // Higher effort = better compression
            })
            .toFile(outputPath);

        return info;
    } catch (error) {
        console.error(`Error optimizing ${inputPath}:`, error.message);
        return null;
    }
}

// Format file size
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Process all images
async function processImages() {
    console.log('🖼️  Starting image optimization...\n');

    try {
        // Ensure directories exist
        await ensureDir(CONFIG.outputDir);

        // Read input directory
        const files = await fs.readdir(CONFIG.inputDir);
        const imageFiles = files.filter(file =>
            /\.(jpg|jpeg|png)$/i.test(file)
        );

        if (imageFiles.length === 0) {
            console.log('⚠️  No images found in input directory');
            return;
        }

        console.log(`Found ${imageFiles.length} images to process\n`);

        const results = [];
        let totalOriginalSize = 0;
        let totalOptimizedSize = 0;

        // Process each image
        for (const file of imageFiles) {
            const inputPath = path.join(CONFIG.inputDir, file);
            const fileName = path.parse(file).name;
            const outputPath = path.join(
                CONFIG.outputDir,
                `${fileName}.${CONFIG.format}`
            );

            console.log(`Processing: ${file}`);

            // Get original file size
            const originalStats = await fs.stat(inputPath);
            const originalSize = originalStats.size;
            totalOriginalSize += originalSize;

            // Optimize thumbnail
            const thumbnailInfo = await optimizeImage(
                inputPath,
                outputPath,
                CONFIG.thumbnailSize
            );

            if (thumbnailInfo) {
                totalOptimizedSize += thumbnailInfo.size;
                const savings = ((originalSize - thumbnailInfo.size) / originalSize * 100).toFixed(1);

                console.log(`  ✓ Thumbnail: ${formatBytes(thumbnailInfo.size)} (${savings}% smaller)`);

                // Generate blur placeholder
                const blurDataURL = await generateBlurPlaceholder(inputPath);
                if (blurDataURL) {
                    console.log(`  ✓ Blur placeholder generated`);
                }

                results.push({
                    original: file,
                    output: `${fileName}.${CONFIG.format}`,
                    originalSize,
                    optimizedSize: thumbnailInfo.size,
                    savings,
                    blurDataURL,
                });
            }

            console.log('');
        }

        // Summary
        console.log('━'.repeat(60));
        console.log('Summary\n');
        console.log(`Total images processed: ${results.length}`);
        console.log(`Original total size: ${formatBytes(totalOriginalSize)}`);
        console.log(`Optimized total size: ${formatBytes(totalOptimizedSize)}`);

        const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
        console.log(`Total savings: ${formatBytes(totalOriginalSize - totalOptimizedSize)} (${totalSavings}%)\n`);

        // Generate blur data JSON file
        const blurDataMap = {};
        results.forEach(result => {
            if (result.blurDataURL) {
                blurDataMap[result.output] = result.blurDataURL;
            }
        });

        const blurDataPath = path.join(CONFIG.outputDir, 'blur-data.json');
        await fs.writeFile(
            blurDataPath,
            JSON.stringify(blurDataMap, null, 2)
        );
        console.log(`✓ Blur placeholders saved to: ${blurDataPath}\n`);

        // Generate speaker data snippet
        console.log('━'.repeat(60));
        console.log('Sample TypeScript code:\n');
        console.log('const SPEAKERS = [');
        results.slice(0, 2).forEach((result, i) => {
            const name = result.original
                .replace(/\.[^/.]+$/, '')
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            console.log('  {');
            console.log(`    id: "${i + 1}",`);
            console.log(`    name: "Dr. ${name}",`);
            console.log(`    image: "/speakers/${result.output}",`);
            if (result.blurDataURL) {
                console.log(`    blurDataURL: "${result.blurDataURL.slice(0, 50)}...",`);
            }
            console.log('    // ... other fields');
            console.log('  },');
        });
        console.log('  // ...\n];');

        console.log('\n✅ Optimization complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Run the script
processImages().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});