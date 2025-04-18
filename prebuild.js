const fs = require('fs');
const path = require('path');
const https = require('https');

const owner = 'PArns';
const repo = 'next.patrick-arns.de';

function getCommitCountFromGitHub(owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/repos/${owner}/${repo}/commits?per_page=1`,
      method: 'GET',
      headers: {
        'User-Agent': 'BuildInfoScript',
        'Accept': 'application/vnd.github+json'
      }
    };

    const req = https.get(options, (res) => {
      const linkHeader = res.headers.link;
      let count = 1;

      if (linkHeader) {
        const match = /page=(\d+)>; rel="last"/.exec(linkHeader);
        if (match) {
          count = parseInt(match[1], 10);
        }
      }

      // Body sofort verwerfen, damit die Connection geschlossen wird
      res.resume();

      resolve(count);
    });

    req.on('error', (err) => {
      console.error('Fehler beim Abrufen von Commits:', err);
      reject(err);
    });
  });
}

async function generateBuildInfo() {
  try {
    const commitCount = await getCommitCountFromGitHub(owner, repo);

    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const version = packageJson.version;

    const buildDate = new Date().toISOString();

    const buildInfo = {
      version,
      commitCount,
      buildDate,
      buildNumber: `${version}.${commitCount}`
    };

    fs.writeFileSync('build-info.json', JSON.stringify(buildInfo, null, 2));
    console.log(`✅ Build info generated: ${JSON.stringify(buildInfo, null, 2)}`);
  } catch (err) {
    process.exit(1);
  }
}

generateBuildInfo();
