type ForgotPasswordEmailArgs =
	// The first thing I need is what the forgot password process needs 
	| ({
		req?: PayloadRequest
		token?: string
		user?: User
		// I'll add some variables as well
		cta: {
			buttonLabel: string
			url: string
		}
		content: string
		headline: string
		email: string
	})
	| undefined

import React from 'react'
import type { PayloadRequest } from 'payload'
import type { User } from '@/payload-types'
import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from '@react-email/components'

const footer = {
	color: '#8898aa',
	fontSize: '12px',
}

const footerText = {
	fontSize: '12px',
	color: '#b5b5b5',
	lineHeight: '15px',
}


// then we can export a default function called ForgotPasswordEmail and assign the type we created to the args
export default function ForgotPasswordEmail(args: ForgotPasswordEmailArgs) {
	return (
		<Html>
			<Head />
			{/* This is what's shown as the email preview when sent */}
			<Preview>Forgot your password? Reset it now.</Preview>
			<Body>
				<Container>
					<Section>
						<Heading>{args?.headline}</Heading>
					</Section>
					<Section>
						<Heading>
							{args?.cta.buttonLabel}
						</Heading>
						<Text>{args?.content}</Text>
						<Section>
							<Button href={args?.cta.url}>
								{args?.cta.buttonLabel}
							</Button>
						</Section>
						<Hr />
						<Text>
							Having trouble with the button? Copy and paste this link into your browser:
						</Text>
						<Section>
							<Link href={args?.cta.url}>
								{args?.cta.url}
							</Link>
						</Section>
					</Section>
					<Section style={footer}>
						<Text style={footerText}>
							You received this email because someone requested a password reset link for{' '} {args?.email}. If this wasn&apos;t you, you can safely ignore this email.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	)
}