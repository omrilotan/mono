import { dirname } from 'path';
import { URL } from 'url';

export default function(url) {
	const {pathname} = new URL(url);

	return {
		__dirname: dirname(pathname),
		__filename: pathname,
	};
}
