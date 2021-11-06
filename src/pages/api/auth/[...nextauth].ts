import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL_API

interface UserValues {
  access_token: string
  refresh_token: string
  scope: string
  expires_in: number
  token_type: string
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

          console.log('ACCESS TOKEN ----> ' + JSON.stringify(user.data.access_token, null, 2));

          if (user) {
            return {
              status: 'success',
              data: user.data
            }
          }

          return null

        } catch (e) {
          // const errorMessage = e.response.data.detail
          // Redirecting to the login page with error messsage in the URL
          throw new Error('&email=' + credentials.email)
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

      if (account !== undefined) {
        if (account?.provider == 'facebook') {
          console.log('Credentials', token);
          const res = await axios
            .post(API_ENDPOINT + '/auth/convert-token', {
              token: account.access_token,
              backend: 'facebook',
              grant_type: 'convert_token',
              client_secret: process.env.CLIENT_SECRET,
              client_id: process.env.CLIENT_ID
            })
          token.accessToken = res.data.access_token
          token.refreshToken = res.data.refresh_token
        }
        if (account?.provider == 'credentials') {
          const UserCredentials: any = user.data
          console.log('Credentials', token);
          token.accessToken = UserCredentials.access_token
          token.refreshToken = UserCredentials.refresh_token
          token.scope = UserCredentials.scope
          token.expires_in = UserCredentials.expires_in
          token.token_type = UserCredentials.token_type
        }
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