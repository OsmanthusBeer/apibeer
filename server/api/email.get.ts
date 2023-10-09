import { URL } from 'node:url'
import nodemailer from 'nodemailer'
import { useCompiler } from '#vue-email'

export default defineEventHandler(async (_event) => {
  const config = useRuntimeConfig()
  const template = await useCompiler('hi.vue', {
    props: {
      url: 'https://github.com/OsmanthusBeer/apibeer',
    },
  })
  const transporter = nodemailer.createTransport(config.emailSmtp)

  const url = new URL(config.emailSmtp)

  // TODO: Send gmail fail.
  // refs: https://support.google.com/mail/answer/81126#authentication
  const options = {
    from: `ApiBeer <${decodeURIComponent(url.username)}>`,
    to: 'hi@example.com',
    subject: 'hi',
    html: template,
  }
  await transporter.sendMail(options)
  return { message: 'Email sent' }
})
