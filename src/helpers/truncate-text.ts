export function truncatedText({
	text,
	max = 200,
}: {
	text: string;
	max?: number;
}) {
	return text && text.length > max
		? `${text.slice(0, max).trimEnd()}...`
		: text;
}
