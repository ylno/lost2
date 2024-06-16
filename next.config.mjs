import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { isServer }) => {
		// Ignore /functions directory
		config.module.rules.push({
			test: /\.(js|ts)$/,
			include: [path.resolve(__dirname, 'functions')],
			use: 'ignore-loader'
		});

		return config;
	},
};

export default nextConfig;
