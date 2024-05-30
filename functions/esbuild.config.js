const { build } = require('esbuild');

const buildOptions = {
	entryPoints: ['src/index.ts'],
	bundle: true,
	outdir: 'lib',
	platform: 'node',
	target: 'node20',
};

build(buildOptions).catch(() => process.exit(1));

module.exports = buildOptions;
