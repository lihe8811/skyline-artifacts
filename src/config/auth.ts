import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      // ===== Clerk ===== //
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?: string;
      CLERK_SECRET_KEY?: string;
      CLERK_WEBHOOK_SECRET?: string;

      // ===== Next Auth ===== //
      NEXT_AUTH_SECRET?: string;

      NEXT_AUTH_SSO_PROVIDERS?: string;

      // Github
      GITHUB_CLIENT_ID?: string;
      GITHUB_CLIENT_SECRET?: string;
    }
  }
}

// TODO(NextAuth ENVs Migration): Remove once nextauth envs migration time end
const removeTipsTemplate = (willBeRemoved: string, replaceOne: string) =>
  `${willBeRemoved} will be removed in the future. Please set ${replaceOne} instead.`;
// End

export const getAuthConfig = () => {
  // TODO(NextAuth ENVs Migration): Remove once nextauth envs migration time end
  if (process.env.CLOUDFLARE_ZERO_TRUST_CLIENT_ID) {
    console.warn(
      removeTipsTemplate('CLOUDFLARE_ZERO_TRUST_CLIENT_ID', 'AUTH_CLOUDFLARE_ZERO_TRUST_ID'),
    );
  }
  if (process.env.CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET) {
    console.warn(
      removeTipsTemplate(
        'CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET',
        'AUTH_CLOUDFLARE_ZERO_TRUST_SECRET',
      ),
    );
  }
  if (process.env.CLOUDFLARE_ZERO_TRUST_ISSUER) {
    console.warn(
      removeTipsTemplate('CLOUDFLARE_ZERO_TRUST_ISSUER', 'AUTH_CLOUDFLARE_ZERO_TRUST_ISSUER'),
    );
  }
  if (process.env.GITHUB_CLIENT_ID) {
    console.warn(removeTipsTemplate('GITHUB_CLIENT_ID', 'AUTH_GITHUB_ID'));
  }
  if (process.env.GITHUB_CLIENT_SECRET) {
    console.warn(removeTipsTemplate('GITHUB_CLIENT_SECRET', 'AUTH_GITHUB_SECRET'));
  }
  // End

  return createEnv({
    client: {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
      /**
       * whether to enabled clerk
       */
      NEXT_PUBLIC_ENABLE_CLERK_AUTH: z.boolean().optional(),

      NEXT_PUBLIC_ENABLE_NEXT_AUTH: z.boolean().optional(),
    },
    server: {
      // Clerk
      CLERK_SECRET_KEY: z.string().optional(),
      CLERK_WEBHOOK_SECRET: z.string().optional(),

      // NEXT-AUTH
      NEXT_AUTH_SECRET: z.string().optional(),
      NEXT_AUTH_SSO_PROVIDERS: z.string().optional().default('auth0'),

      // Github
      GITHUB_CLIENT_ID: z.string().optional(),
      GITHUB_CLIENT_SECRET: z.string().optional(),

      // Cloudflare Zero Trust
      CLOUDFLARE_ZERO_TRUST_CLIENT_ID: z.string().optional(),
      CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET: z.string().optional(),
      CLOUDFLARE_ZERO_TRUST_ISSUER: z.string().optional(),
    },

    runtimeEnv: {
      // Clerk
      NEXT_PUBLIC_ENABLE_CLERK_AUTH: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
      CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,

      // Next Auth
      NEXT_PUBLIC_ENABLE_NEXT_AUTH: !!process.env.NEXT_AUTH_SECRET,
      NEXT_AUTH_SSO_PROVIDERS: process.env.NEXT_AUTH_SSO_PROVIDERS,
      NEXT_AUTH_SECRET: process.env.NEXT_AUTH_SECRET,

      // Github
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

      // Cloudflare Zero Trust
      CLOUDFLARE_ZERO_TRUST_CLIENT_ID: process.env.CLOUDFLARE_ZERO_TRUST_CLIENT_ID,
      CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET: process.env.CLOUDFLARE_ZERO_TRUST_CLIENT_SECRET,
      CLOUDFLARE_ZERO_TRUST_ISSUER: process.env.CLOUDFLARE_ZERO_TRUST_ISSUER,
    },
  });
};

export const authEnv = getAuthConfig();