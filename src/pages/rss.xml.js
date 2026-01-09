import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { getTranslations } from '../i18n';

export async function GET(context) {
	const t = getTranslations('ko');
	const posts = await getCollection('blog-ko');
	return rss({
		title: t.site.title,
		description: t.site.description,
		site: context.site,
		items: posts
			.filter((post) => post.data.publish !== false)
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
				...post.data,
				link: `/articles/${post.id}/`,
			})),
	});
}
