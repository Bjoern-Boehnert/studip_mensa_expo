export const decodeHTMLEntities = (html: string): string => {
	const htmlEntityPattern = /&[^;]+;/g;
	return html.replace(htmlEntityPattern, (entity) => {
		switch (entity) {
			case "&quot;":
				return '"';
			case "&amp;":
				return '&';
			case "&lt;":
				return '<';
			case "&gt;":
				return '>';
			case "&nbsp;":
				return ' ';
			case "&apos;":
				return "'";
			default:
				return entity;
		}
	});
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
};

export const formatFileSize = (sizeInBytes: number) => {
	if (sizeInBytes < 1024) return `${sizeInBytes} Bytes`;
	const kb = sizeInBytes / 1024;
	if (kb < 1024) return `${kb.toFixed(2)} KB`;
	const mb = kb / 1024;
	if (mb < 1024) return `${mb.toFixed(2)} MB`;
	const gb = mb / 1024;
	return `${gb.toFixed(2)} GB`;
};