import { z, defineCollection } from 'astro:content';

/**
 * Project Schema - Matches PRD Section 8.1
 */
const projectSchema = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    tagline: z.string(),
    type: z.enum(['app', 'website', 'research', 'open_source']),
    status: z.enum(['live', 'in_progress', 'archived', 'coming_soon']),
    year: z.number(),
    duration: z.string().optional(),
    roles: z.array(z.string()),
    platforms: z.array(z.enum(['web', 'ios', 'android'])),
    tech: z.array(z.string()),
    featured: z.boolean().default(false),
    category: z.string().optional(),
    links: z.object({
        live: z.string().url().optional().or(z.literal('')),
        repo: z.string().url().optional().or(z.literal('')),
        store: z.string().url().optional().or(z.literal('')),
        caseStudy: z.string().optional()
    }).optional(),
    media: z.object({
        logo: z.string().optional(),
        coverImage: z.string(),
        galleryImages: z.array(z.string()).optional(),
        demoVideoUrl: z.string().url().optional()
    }),
    summary: z.string(),
    metrics: z.object({
        users: z.string().optional(),
        downloads: z.string().optional(),
        revenue: z.string().optional(),
        impact: z.string().optional(),
        notes: z.string().optional()
    }).optional(),
    team: z.array(z.string()).optional()
});

/**
 * Team Member Schema - Matches PRD Section 8.3
 */
const teamSchema = z.object({
    order: z.number().optional().default(99),
    id: z.string(),
    name: z.string(),
    role: z.string(),
    badge: z.string().optional(),
    bio: z.string(),
    skills: z.array(z.string()),
    avatar: z.string().optional(),
    links: z.object({
        github: z.string().url().optional().or(z.literal('')),
        linkedin: z.string().url().optional().or(z.literal('')),
        twitter: z.string().url().optional().or(z.literal('')),
        website: z.string().url().optional().or(z.literal(''))
    }).optional(),
    highlights: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional()
});

const projectsCollection = defineCollection({
    type: 'content',
    schema: projectSchema
});

const teamCollection = defineCollection({
    type: 'data',
    schema: teamSchema
});

export const collections = {
    projects: projectsCollection,
    team: teamCollection
};
