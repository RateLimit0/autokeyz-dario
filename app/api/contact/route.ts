// route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { SecretsManager } from 'aws-sdk';
import { z } from 'zod';

const secretsManager = new SecretsManager({
  region: 'eu-west-2', 
});

const getSecrets = async () => {
  const secretArn = "arn:aws:secretsmanager:eu-west-2:491085406777:secret:autokeyz/contact-form-secrets-oMvShv";

  if (!secretArn) {
    throw new Error('SECRET_ARN environment variable is not set');
  }

  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretArn }).promise();

    if ('SecretString' in data) {
      return JSON.parse(data.SecretString!);
    } else {
      const buff = Buffer.from(data.SecretBinary as string, 'base64');
      return JSON.parse(buff.toString('ascii'));
    }
  } catch (err) {
    console.error('Error retrieving secrets:', err);
    throw err;
  }
};

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  postCode: z.string().min(1, 'Post code is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleYear: z.string().min(1, 'Vehicle year is required'),
  message: z.string().optional(),
  isVehicleLocked: z.enum(['Yes', 'No']),
  doesVehicleRunAndDrive: z.enum(['Yes', 'No']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsedData = contactSchema.safeParse(body);
    if (!parsedData.success) {
      const errors = parsedData.error.errors.map(err => err.message).join(', ');
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    const secrets = await getSecrets();

    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      EMAIL_USER,
      CONTACT_EMAIL,
    } = secrets;

    if (
      !SMTP_HOST ||
      !SMTP_PORT ||
      !SMTP_USER ||
      !SMTP_PASS ||
      !EMAIL_USER ||
      !CONTACT_EMAIL
    ) {
      throw new Error('One or more SMTP configuration secrets are missing');
    }

    // Use the environment variables in your Nodemailer configuration
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // true for port 465, false for other ports
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER, // Sender address (must be verified in SES or your SMTP service)
      to: CONTACT_EMAIL, // Receiver address
      subject: '⚠️ New Job ⚠️',
      text: `Name: ${parsedData.data.name}
Email: ${parsedData.data.email}
Post Code: ${parsedData.data.postCode}
Phone Number: ${parsedData.data.phoneNumber}
Vehicle Model: ${parsedData.data.vehicleModel}
Vehicle Year: ${parsedData.data.vehicleYear}
Is Vehicle Locked?: ${parsedData.data.isVehicleLocked}
Does Vehicle Run And Drive?: ${parsedData.data.doesVehicleRunAndDrive}
Message: ${parsedData.data.message || 'N/A'}`
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);

    // Respond back to the frontend
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!', messageId: result.messageId },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
