import { dirname } from 'path';
import { URL } from 'url';

export default function(url) {
	const { pathname: __filename } = new URL(url);
	const __dirname = dirname(__filename);

	return {
		__dirname,
		__filename,
		dirname: __dirname,
		filename: __filename,
	};
}
