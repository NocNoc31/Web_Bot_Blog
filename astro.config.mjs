// import { defineConfig } from 'astro/config'
// import mdx from '@astrojs/mdx'
// import sitemap from '@astrojs/sitemap'
// import tailwind from '@astrojs/tailwind'
// import { remarkReadingTime } from './src/utils/readTime.ts'
// import { siteConfig } from './src/data/site.config'

// // https://astro.build/config
// export default defineConfig({
// 	site: siteConfig.site,
// 	markdown: {
// 		remarkPlugins: [remarkReadingTime],
// 		drafts: true,
// 		shikiConfig: {
// 			theme: 'material-theme-palenight',
// 			wrap: true
// 		}
// 	},
// 	integrations: [
// 		mdx({
// 			syntaxHighlight: 'shiki',
// 			shikiConfig: {
// 				experimentalThemes: {
// 					light: 'vitesse-light',
// 					dark: 'material-theme-palenight',
// 				  },
// 				wrap: true
// 			},
// 			drafts: true
// 		}),
// 		sitemap(),
// 		tailwind()
// 	]
// })




import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { remarkReadingTime } from './src/utils/readTime.ts';
import { siteConfig } from './src/data/site.config';

// https://astro.build/config
export default defineConfig({
    site: 'https://dashing-kringle-49c2a1.netlify.app/',
    base: process.env.NODE_ENV === 'production' ? '/Web_Bot_Blog/' : '',
    markdown: {
        remarkPlugins: [remarkReadingTime],
        drafts: true,
        shikiConfig: {
            theme: 'material-theme-palenight',
            wrap: true
        }
    },
    integrations: [
        mdx({
            syntaxHighlight: 'shiki',
            shikiConfig: {
                experimentalThemes: {
                    light: 'vitesse-light',
                    dark: 'material-theme-palenight',
                  },
                wrap: true
            },
            drafts: true
        }),
        sitemap(),
        tailwind()
    ]
});