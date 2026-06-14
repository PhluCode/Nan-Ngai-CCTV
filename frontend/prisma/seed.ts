import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const VIDEO_FILES = [
  '/uploads/1743433880529-Merged.mp4',
  '/uploads/1743539086934-1.mp4',
  '/uploads/1743539245804-1.mp4',
  '/uploads/1743539914363-1.mp4',
  '/uploads/1743540306127-1.mp4',
  '/uploads/1743542895262-2.mp4',
  '/uploads/1743605495538-1.mp4',
  '/uploads/1743610776559-Merged.mp4',
  '/uploads/1780769530970-3.mp4',
];

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user ensured.');

  // Clean old data
  await prisma.incident.deleteMany();
  await prisma.cCTV.deleteMany();
  
  const LOCATIONS = [
    { name: 'Sukhumvit Rd', sector: 'Sector 7', roadSegment: 'Sukhumvit Soi 11', landmark: 'Nana BTS' },
    { name: 'Asok Intersection', sector: 'Sector 7', roadSegment: 'Asok Montri', landmark: 'Terminal 21' },
    { name: 'Rama IV', sector: 'Sector 7', roadSegment: 'Rama IV Road', landmark: 'Lumphini Park' },
    { name: 'Siam Square', sector: 'Sector 1', roadSegment: 'Rama I Road', landmark: 'Siam Paragon' },
    { name: 'Phaya Thai', sector: 'Sector 1', roadSegment: 'Phaya Thai Rd', landmark: 'Victory Monument' },
    { name: 'Silom Bypass', sector: 'Sector 2', roadSegment: 'Silom Road', landmark: 'Chong Nonsi BTS' },
    { name: 'Ekkamai South', sector: 'Sector 7', roadSegment: 'Ekkamai Rd', landmark: 'Gateway Ekkamai' },
    { name: 'Thong Lo', sector: 'Sector 7', roadSegment: 'Thong Lo Soi 10', landmark: 'J Avenue' },
    { name: 'Ploenchit Rd', sector: 'Sector 1', roadSegment: 'Ploenchit Road', landmark: 'Central Embassy' },
    { name: 'Pathum Wan', sector: 'Sector 1', roadSegment: 'Pathum Wan Intersection', landmark: 'MBK Center' },
  ];

  // Seed 16 Cameras
  const cctvs = [];
  for (let i = 0; i < 16; i++) {
    const loc = LOCATIONS[i % LOCATIONS.length];
    const videoUrl = VIDEO_FILES[i % VIDEO_FILES.length];
    
    const cctv = await prisma.cCTV.create({
      data: {
        name: `${loc.name} - Cam ${i + 1}`,
        rtspUrl: `rtsp://cam${i + 1}.traffic.local/stream`,
        latitude: 13.75 + (Math.random() * 0.1 - 0.05),
        longitude: 100.5 + (Math.random() * 0.1 - 0.05),
        status: 'Online',
        accidentVideoUrl: videoUrl,
        hasAccidentVideo: true,
        sector: loc.sector,
        roadSegment: loc.roadSegment,
        landmark: loc.landmark,
      }
    });
    cctvs.push(cctv);
  }
  console.log(`Seeded ${cctvs.length} CCTVs`);

  // Seed some active incidents to trigger alerts
  const alertIndices = [2, 7, 14];
  for (const idx of alertIndices) {
    if (cctvs[idx]) {
      await prisma.incident.create({
        data: {
          cctvId: cctvs[idx].id,
          verificationStatus: 'PENDING',
          severity: 'CRITICAL',
          confidenceScore: 0.95,
          imageUrl: cctvs[idx].accidentVideoUrl, 
          location: cctvs[idx].roadSegment,
          latitude: cctvs[idx].latitude,
          longitude: cctvs[idx].longitude,
          notes: 'Automated AI detection of possible collision.',
        }
      });
    }
  }

  // Seed some resolved incidents for logs/historical data
  for (let i = 0; i < 5; i++) {
    await prisma.incident.create({
      data: {
        cctvId: cctvs[i].id,
        verificationStatus: 'APPROVED',
        severity: i % 2 === 0 ? 'MAJOR' : 'MINOR',
        confidenceScore: 0.88,
        location: cctvs[i].roadSegment,
        notes: 'Cleared by response team.',
        resolvedAt: new Date(),
        resolvedBy: admin.id,
      }
    });
  }

  console.log('Seeded Incidents');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
