#!/usr/bin/env npx tsx
/**
 * Post to BlueSky and Twitter/X when Trump is golfing today
 * Usage: npx tsx scripts/post-social.ts [--force]
 *
 * --force: Post even if already posted today (for testing)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// Load environment variables from .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split('\n').forEach(line => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
            process.env[match[1].trim()] = match[2].trim();
        }
    });
}

const PROJECT_DIR = path.join(__dirname, '..');
const STATS_PATH = path.join(PROJECT_DIR, 'public', 'stats.json');
const LAST_POST_PATH = path.join(PROJECT_DIR, '.last-social-post');

interface Stats {
    currentDate: string;
    totalGolfDays: number;
    percentageGolfed: string;
    estimatedTotalCost: number;
    recentGolfDays: Array<{ date: string; location: string }>;
}

// ============== BLUESKY ==============

async function postToBluesky(text: string): Promise<boolean> {
    const handle = process.env.BLUESKY_HANDLE;
    const password = process.env.BLUESKY_PASSWORD;

    if (!handle || !password) {
        console.log('[BlueSky] Missing credentials, skipping');
        return false;
    }

    try {
        // 1. Create session (login)
        const sessionRes = await fetch('https://bsky.social/xrpc/com.atproto.server.createSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier: handle, password }),
        });

        if (!sessionRes.ok) {
            const err = await sessionRes.text();
            console.error('[BlueSky] Login failed:', err);
            return false;
        }

        const session = await sessionRes.json() as { did: string; accessJwt: string };

        // 2. Create post
        const postRes = await fetch('https://bsky.social/xrpc/com.atproto.repo.createRecord', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.accessJwt}`,
            },
            body: JSON.stringify({
                repo: session.did,
                collection: 'app.bsky.feed.post',
                record: {
                    text,
                    createdAt: new Date().toISOString(),
                    // Add link facet for the URL
                    facets: [{
                        index: {
                            byteStart: text.indexOf('https://'),
                            byteEnd: text.indexOf('https://') + 'https://istrumpgolfing.today'.length,
                        },
                        features: [{
                            $type: 'app.bsky.richtext.facet#link',
                            uri: 'https://istrumpgolfing.today',
                        }],
                    }],
                },
            }),
        });

        if (!postRes.ok) {
            const err = await postRes.text();
            console.error('[BlueSky] Post failed:', err);
            return false;
        }

        console.log('[BlueSky] Posted successfully!');
        return true;
    } catch (error) {
        console.error('[BlueSky] Error:', error);
        return false;
    }
}

// ============== TWITTER/X ==============

function generateOAuthSignature(
    method: string,
    url: string,
    params: Record<string, string>,
    consumerSecret: string,
    tokenSecret: string
): string {
    // Sort and encode parameters
    const sortedParams = Object.keys(params)
        .sort()
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');

    // Create signature base string
    const signatureBase = [
        method.toUpperCase(),
        encodeURIComponent(url),
        encodeURIComponent(sortedParams),
    ].join('&');

    // Create signing key
    const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;

    // Generate HMAC-SHA1 signature
    const signature = crypto
        .createHmac('sha1', signingKey)
        .update(signatureBase)
        .digest('base64');

    return signature;
}

function generateOAuthHeader(
    method: string,
    url: string,
    extraParams: Record<string, string> = {}
): string {
    const apiKey = process.env.TWITTER_API_KEY!;
    const apiSecret = process.env.TWITTER_API_SECRET!;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN!;
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET!;

    const oauthParams: Record<string, string> = {
        oauth_consumer_key: apiKey,
        oauth_nonce: crypto.randomBytes(16).toString('hex'),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
        oauth_token: accessToken,
        oauth_version: '1.0',
    };

    // Combine OAuth params with any extra params for signature
    const allParams = { ...oauthParams, ...extraParams };

    // Generate signature
    oauthParams.oauth_signature = generateOAuthSignature(
        method,
        url,
        allParams,
        apiSecret,
        accessTokenSecret
    );

    // Build Authorization header
    const headerParams = Object.keys(oauthParams)
        .sort()
        .map(key => `${encodeURIComponent(key)}="${encodeURIComponent(oauthParams[key])}"`)
        .join(', ');

    return `OAuth ${headerParams}`;
}

async function postToTwitter(text: string): Promise<boolean> {
    const apiKey = process.env.TWITTER_API_KEY;
    const apiSecret = process.env.TWITTER_API_SECRET;
    const accessToken = process.env.TWITTER_ACCESS_TOKEN;
    const accessTokenSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET;

    if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
        console.log('[Twitter] Missing credentials, skipping');
        return false;
    }

    try {
        const url = 'https://api.twitter.com/2/tweets';
        const body = JSON.stringify({ text });

        const authHeader = generateOAuthHeader('POST', url);

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body,
        });

        if (!res.ok) {
            const err = await res.text();
            console.error('[Twitter] Post failed:', res.status, err);
            return false;
        }

        const result = await res.json();
        console.log('[Twitter] Posted successfully! Tweet ID:', (result as { data?: { id?: string } }).data?.id);
        return true;
    } catch (error) {
        console.error('[Twitter] Error:', error);
        return false;
    }
}

// ============== MAIN ==============

function formatCost(cost: number): string {
    if (cost >= 1_000_000) {
        return `$${(cost / 1_000_000).toFixed(1)}M`;
    }
    return `$${cost.toLocaleString()}`;
}

function getTodayEST(): string {
    // Get today's date in Eastern Time
    const now = new Date();
    const estDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    return estDate.toISOString().split('T')[0];
}

function hasPostedToday(): boolean {
    if (!fs.existsSync(LAST_POST_PATH)) {
        return false;
    }
    const lastPost = fs.readFileSync(LAST_POST_PATH, 'utf-8').trim();
    return lastPost === getTodayEST();
}

function markPosted(): void {
    fs.writeFileSync(LAST_POST_PATH, getTodayEST());
}

async function main(): Promise<void> {
    const forcePost = process.argv.includes('--force');
    const today = getTodayEST();

    console.log(`[${new Date().toISOString()}] Checking if we should post...`);
    console.log(`[Info] Today (EST): ${today}`);

    // Load stats
    if (!fs.existsSync(STATS_PATH)) {
        console.error('[Error] stats.json not found');
        process.exit(1);
    }

    const stats: Stats = JSON.parse(fs.readFileSync(STATS_PATH, 'utf-8'));

    // Check if today is a golf day
    const todayIsGolfDay = stats.recentGolfDays.some(day => day.date === today);

    if (!todayIsGolfDay) {
        console.log('[Info] Today is not a golf day, skipping post');
        process.exit(0);
    }

    console.log('[Info] Today IS a golf day!');

    // Check if already posted
    if (!forcePost && hasPostedToday()) {
        console.log('[Info] Already posted today, skipping');
        process.exit(0);
    }

    // Build the post message
    const message = `Yes, he is golfing today. Trump has golfed ${stats.totalGolfDays} days (${stats.percentageGolfed}%) costing taxpayers ~${formatCost(stats.estimatedTotalCost)}. Track it: https://istrumpgolfing.today`;

    console.log(`[Info] Posting: "${message}"`);

    // Post to both platforms
    const blueskySuccess = await postToBluesky(message);
    const twitterSuccess = await postToTwitter(message);

    if (blueskySuccess || twitterSuccess) {
        markPosted();
        console.log('[Info] Post tracker updated');
    }

    if (!blueskySuccess && !twitterSuccess) {
        console.error('[Error] Failed to post to any platform');
        process.exit(1);
    }

    console.log('[Info] Done!');
}

main().catch(err => {
    console.error('[Fatal]', err);
    process.exit(1);
});
