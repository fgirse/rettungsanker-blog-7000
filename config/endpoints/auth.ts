import { Endpoint, PayloadRequest } from "payload"

// Helper to set session cookie
async function setAuthSession(user: any, req: PayloadRequest) {
  // This would typically set the Better Auth session
  // For now, we'll redirect to sign in with the email pre-filled
  return user
}

// endpoints/githubAuth.ts
export const githubAuthCallbackEndpoint: Endpoint = {
  path: "/auth/github/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const code = req.query.code

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      },
    )

    if (!tokenRes.ok) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    const body = await tokenRes.json()

    const { access_token } = body

    if (!access_token) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const githubUser = await userRes.json()

    if (!githubUser || !githubUser.email) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }
    
    // Find or create user in Payload
    const result = await req.payload.find({
      collection: "users",
      where: {
        email: {
          equals: githubUser.email,
        },
      },
    })

    let user
    if (result.totalDocs === 0) {
      // Create new user
      const newUser = await req.payload.create({
        collection: "users",
        data: {
          email: githubUser.email,
          name: githubUser.name,
          emailVerified: true,

        },
        draft: false,
      })
      user = newUser
    } else {
      user = result.docs[0]
    }

    try {
      await setAuthSession(user, req)
    } catch (error) {
      console.error(error)
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    return Response.redirect(new URL(`/admin`, process.env.APP_BASE_URL))
  },
}

/*
// This endpoint is disabled - login_token fields don't exist in Users collection
export const loginTokenVerifyEndpoint: Endpoint = {
  path: "/auth/login/:token",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const token = req.routeParams?.token

    if (!token) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    const result = await req.payload.find({
      collection: "users",
      where: {
        login_token: {
          equals: token,
        },
      },
    })

    if (result.totalDocs === 0) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    const user = result.docs.at(0)!
    const expires = new Date(user.login_token_expiration ?? "")
    const now = new Date()

    await req.payload.update({
      collection: "users",
      id: user.id,
      data: {
        login_token: null,
        login_token_expiration: null,
      },
    })

    if (expires < now) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    await setAuthSession(user, req)

    return Response.redirect(new URL(`/admin`, process.env.APP_BASE_URL))
  },
}
*/
