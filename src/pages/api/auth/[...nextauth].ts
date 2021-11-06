import axios, { AxiosError } from "axios";
import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialProvider from "next-auth/providers/credentials";

const API_ENDPOINT = process.env.NEXT_PUBLIC_URL_API

interface LoginValues {
  email: string
  password: string
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialProvider({
      async authorize(credentials: LoginValues) {
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
          console.log('Credentials', token);
          token.accessToken = user.data.access_token
          token.refreshToken = user.data.refresh_token
          token.scope = user.data.scope
          token.expires_in = user.data.expires_in
          token.token_type = user.data.token_type
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
  }
})