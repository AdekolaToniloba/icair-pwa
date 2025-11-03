const fs = require('fs');
const path = require('path');

// Path to your speakers data file
const speakersDataPath = './data/speakers-data.ts';
const publicSpeakersDir = './public/speakers';

// Read the speakers data file
let speakersData = fs.readFileSync(speakersDataPath, 'utf8');

// Get all image files in the public/speakers directory
const imageFiles = fs.readdirSync(publicSpeakersDir);

console.log('Found images in public/speakers:');
console.log(imageFiles);

// Create a mapping of base names to actual extensions
const imageMap = {};
imageFiles.forEach(file => {
    const baseName = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
    const ext = file.split('.').pop();
    imageMap[baseName] = ext;
});

console.log('\nImage mapping:');
console.log(imageMap);

// Replace .webp extensions with actual extensions
let updatedData = speakersData;
let changesMade = 0;

Object.keys(imageMap).forEach(baseName => {
    const actualExt = imageMap[baseName];
    // Replace patterns like: image: "/speakers/bunmi-ajala.webp"
    const webpPattern = new RegExp(`image: "/speakers/${baseName}\\.webp"`, 'g');
    const jpegPattern = new RegExp(`image: "/speakers/${baseName}\\.jpeg"`, 'g');
    const jpgPattern = new RegExp(`image: "/speakers/${baseName}\\.jpg"`, 'g');
    const pngPattern = new RegExp(`image: "/speakers/${baseName}\\.png"`, 'g');

    const replacement = `image: "/speakers/${baseName}.${actualExt}"`;

    if (updatedData.match(webpPattern)) {
        updatedData = updatedData.replace(webpPattern, replacement);
        console.log(`✓ Updated ${baseName}.webp → ${baseName}.${actualExt}`);
        changesMade++;
    } else if (actualExt === 'jpg' && updatedData.match(jpegPattern)) {
        updatedData = updatedData.replace(jpegPattern, replacement);
        console.log(`✓ Updated ${baseName}.jpeg → ${baseName}.${actualExt}`);
        changesMade++;
    } else if (actualExt === 'jpeg' && updatedData.match(jpgPattern)) {
        updatedData = updatedData.replace(jpgPattern, replacement);
        console.log(`✓ Updated ${baseName}.jpg → ${baseName}.${actualExt}`);
        changesMade++;
    }
});

// Write the updated file
if (changesMade > 0) {
    fs.writeFileSync(speakersDataPath, updatedData);
    console.log(`\n✅ Successfully updated ${changesMade} image paths in speakers-data.ts`);
} else {
    console.log('\n⚠️  No changes needed - all image extensions already match');
}

console.log('\n📝 Next steps:');
console.log('1. Review the changes in data/speakers-data.ts');
console.log('2. Test the speakers page to verify images load correctly');
console.log('3. If some images still don\'t load, check the browser console for 404 errors');