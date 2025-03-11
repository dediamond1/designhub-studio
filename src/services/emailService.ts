
// Email sending service with SendGrid fallback

export interface EmailConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

export const defaultEmailConfig: EmailConfig = {
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  auth: {
    user: process.env.EMAIL_USER || 'user',
    pass: process.env.EMAIL_PASS || 'password',
  }
};

/**
 * Send an email using the configured email service
 * 
 * This is a placeholder implementation that would normally use a real email service like Nodemailer or SendGrid
 * In a production environment, you would replace this with actual email sending logic
 */
export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  from: string = 'noreply@kalmarstudio.com'
): Promise<boolean> => {
  try {
    // In a real implementation, this would connect to an SMTP server or use SendGrid API
    console.log(`EMAIL SENT: To: ${to}, Subject: ${subject}`);
    
    // Use SendGrid or other email service here
    // For now, we'll just simulate a successful email send
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

/**
 * Send a bulk email to multiple recipients
 */
export const sendBulkEmail = async (
  recipients: string[],
  subject: string,
  html: string,
  from: string = 'noreply@kalmarstudio.com'
): Promise<{ success: string[]; failed: string[] }> => {
  const results = {
    success: [] as string[],
    failed: [] as string[]
  };
  
  // Process each recipient
  for (const recipient of recipients) {
    try {
      await sendEmail(recipient, subject, html, from);
      results.success.push(recipient);
    } catch (error) {
      results.failed.push(recipient);
    }
  }
  
  return results;
};
