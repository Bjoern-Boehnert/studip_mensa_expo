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
