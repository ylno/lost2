const { build } = require('esbuild');
const chokidar = require('chokidar');
const buildOptions = require('./esbuild.config');

const rebuild = () => {
	build(buildOptions).catch(() => process.exit(1));
};

chokidar.watch(['src/**/*', '../packages/shared-services/**/*']).on('all', (event, path) => {
	console.log(`${event} detected in ${path}. Rebuilding...`);
	rebuild();
});

// Initial build
rebuild();
