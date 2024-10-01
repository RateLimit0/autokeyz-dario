// app/api/contact/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Define the validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  postCode: z.string().min(1, 'Postcode is required'),
  vehicleModel: z.string().min(1, 'Vehicle model is required'),
  vehicleYear: z.string().min(1, 'Vehicle year is required'), // Updated field
  message: z.string().optional(), // Made optional as per requirement
  isVehicleLocked: z.enum(['Yes', 'No'], 'Please select if the vehicle is locked'),
  doesVehicleRunAndDrive: z.enum(['Yes', 'No'], 'Please select if the vehicle runs and drives')
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Received contact form data:', body);

    // Validate the incoming data
    const parsedData = ContactFormSchema.safeParse(body);

    if (!parsedData.success) {
      const errors = parsedData.error.errors.map(err => err.message).join(', ');
      console.error('Validation errors:', errors);
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }

    const data: ContactFormData = parsedData.data;
    console.log('Validated data:', data);

    // Create Nodemailer transporter using Amazon SES SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP connection configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully.');
    } catch (smtpError) {
      console.error('SMTP verification failed:', smtpError);
      return NextResponse.json(
        { success: false, error: 'SMTP configuration error.' },
        { status: 500 }
      );
    }

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address (must be verified in SES)
      to: process.env.CONTACT_EMAIL, // Receiver address
      subject: '⚠️ New Job ⚠️',
      text: `Name: ${data.name}
Email: ${data.email}
Post Code: ${data.postCode}
Phone Number: ${data.phoneNumber}
Vehicle Model: ${data.vehicleModel}
Vehicle Year: ${data.vehicleYear}
Is Vehicle Locked?: ${data.isVehicleLocked}
Does Vehicle Run And Drive?: ${data.doesVehicleRunAndDrive}
Message: ${data.message || 'N/A'}`
      // Optionally, add HTML version for better formatting
      // html: `<p>Name: ${data.name}</p><p>Email: ${data.email}</p>...`
    };

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);

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
