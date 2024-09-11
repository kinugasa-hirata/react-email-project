import * as React from 'react';
import { Html, Button, Text, Container } from "@react-email/components";

interface EmailTemplateProps {
  recipientName: string;
  url: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ recipientName, url }) => (
  <Html>
    <Container>
      <Text>Hello {recipientName},</Text>
      <Text>Thank you for using our service. Please confirm your account by clicking the button below:</Text>
      <Button href={url}>Confirm Account</Button>
    </Container>
  </Html>
);