

export default {
  providers: [
    // Primary Clerk issuer (with trailing slash)
    {
      domain: "https://equal-squid-51.clerk.accounts.dev/",
      applicationID: "convex",
    },
    // Allow issuer without trailing slash in case of mismatch
    {
      domain: "https://equal-squid-51.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};