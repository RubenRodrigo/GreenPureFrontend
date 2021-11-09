import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosInstanceServerSide } from "src/helpers/axiosInstance";

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL_API

async function refreshAccessToken(token: any) {
  // console.log("10 - REFRESH", token);
  try {

    const now = Math.ceil(Date.now() / 1000);
    const response = await axiosInstanceServerSide().post('/auth/token/',
      {
        grant_type: "refresh_token",
        client_secret: process.env.CLIENT_SECRET,
        client_id: process.env.CLIENT_ID,
        refresh_token: token.refreshToken
      }
    );

    const refreshedTokens = response.data
    if (response.status !== 200) { throw refreshedTokens }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      token_expire: refreshedTokens.expires_in + now,
      token_type: refreshedTokens.token_type,
      scope: refreshedTokens.scope,
      refreshToken: refreshedTokens.refresh_token
    }
  } catch (error) {
    console.log("REFRESH TOKEN FAILED", error.response.data)
    return {
      ...token, error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials: any) {
        try {
          const user = await axios.post(API_ENDPOINT + '/auth/token',
            {
              username: credentials.email,
              password: credentials.password,
              grant_type: "password",
              client_secret: process.env.CLIENT_SECRET,
              client_id: process.env.CLIENT_ID
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
              }
            })
          console.log(user.data);

          console.log('CREDENTIALS ACCESS TOKEN ----> ' + JSON.stringify(user.data.access_token, null, 2));

          if (user) {
            return {
              status: 'success',
              data: user.data
            }
          }

          return null

        } catch (error) {
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response.data.detail
            throw new Error(errorMessage + '&email=' + credentials.email)
            // const errorMessage = e.response.data.detail
          } else {
            throw new Error('Error inesperado')
          }
          // Redirecting to the login page with error messsage in the URL
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID || '',
      clientSecret: process.env.FACEBOOK_SECRET || ''
    })
  ],
  callbacks: {
    /*
    |--------------------------------------------------------------------------
    | Callback : JWT
    |--------------------------------------------------------------------------
    */
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token to the token right after signin
      // console.log('token', token);
      // console.log('account', account);
      // console.log('user', user);
      const now = Math.ceil(Date.now() / 1000);

      if (account) {
        if (account?.provider == 'facebook') {
          const res = await axios
            .post(API_ENDPOINT + '/auth/convert-token', {
              token: account.access_token,
              backend: 'facebook',
              grant_type: 'convert_token',
              client_secret: process.env.CLIENT_SECRET,
              client_id: process.env.CLIENT_ID
            })
          token.provider = account?.provider
          token.accessToken = res.data.access_token
          token.refreshToken = res.data.refresh_token
          token.scope = res.data.scope
          token.token_expire = res.data.expires_in + now // This value have to be added to current date to get expires_in
          token.token_type = res.data.token_type
          console.log(res.data);
          console.log('FACEBOOK ACCESS TOKEN ----> ' + JSON.stringify(res.data.access_token, null, 2));
        }
        if (account?.provider == 'credentials') {
          const UserCredentials: any = user.data
          token.provider = account?.provider
          token.accessToken = UserCredentials.access_token
          token.refreshToken = UserCredentials.refresh_token
          token.scope = UserCredentials.scope
          token.token_expire = UserCredentials.expires_in + now// This value have to be added to current date to get expires_in
          token.token_type = UserCredentials.token_type
        }
      }

      // console.log("146 - JWT", token);

      if (now > token.token_expire) {
        return refreshAccessToken(token)
      }
      return token
    },
    /*
    |--------------------------------------------------------------------------
    | Callback : Session
    |--------------------------------------------------------------------------
    */
    async session({ session, token }) {
      // Store Access Token to Session
      session.refreshToken = token.refreshToken
      session.accessToken = token.accessToken
      session.provider = token.provider

      try {
        const user = await axios.get(API_ENDPOINT + '/user',
          {
            headers: {
              accept: '*/*',
              'Content-Type': 'application/json',
              Authorization: session
                ? 'Bearer ' + session.accessToken
                : null,
            }
          })
        session.user = { ...session.user, ...user.data }
      } catch (e) {
        console.log("error");
      }
      // console.log("180 - Session", token);

      if (token.error) {
        session.error = token.error
      }

      return session
    },
  },
  pages: {
    signIn: '/login'
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    // You can also specify a public key for verification if using public/private key (but private only is fine)
    // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,

    // If you want to use some key format other than HS512 you can specify custom options to use
    // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
    // verificationOptions = {
    //   maxTokenAge: `${maxAge}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
    //   algorithms: ['HS512']
    // },
  }
})