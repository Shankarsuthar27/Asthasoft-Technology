import React from 'react';
import { getServiceDetails } from './templates';

export interface CustomerAutoReplyProps {
  name: string;
  email: string;
  contactNumber: string;
  serviceRequired: string;
  projectDescription: string;
  requestNDA: boolean;
  ticketId?: string;
  budget?: string;
  timeline?: string;
  preferredTime?: string;
}

export const CustomerAutoReplyEmail: React.FC<CustomerAutoReplyProps> = ({
  name = 'Valued Partner',
  contactNumber = '',
  serviceRequired = 'Custom Enterprise Software',
  projectDescription = '',
  requestNDA = false,
  ticketId,
  budget,
  timeline,
  preferredTime,
}) => {
  const displayTicketId = ticketId || 'ASTHA-INQUIRY';
  const serviceInfo = getServiceDetails(serviceRequired);
  const safePhoneClean = contactNumber.replace(/[^0-9+]/g, '');

  const deliverablesText = serviceInfo.deliverables
    .map((item) => `  • ${item}`)
    .join('\n');
  const techStackText = serviceInfo.techStack.join(' · ');
  const pillarsText = serviceInfo.architecturePillars.join(' · ');

  return (
    <div
      style={{
        margin: 0,
        padding: '24px 20px',
        backgroundColor: '#ffffff',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        fontSize: '14px',
        lineHeight: 1.6,
        color: '#111827',
      }}
    >
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          fontSize: '14px',
          lineHeight: 1.6,
          color: '#111827',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
{`ASTHASOFT TECHNOLOGIES | SCOPING CONFIRMATION
Enterprise Software & Cloud Engineering

Ticket ID : #${displayTicketId}
Status    : Received · Solution Architect Assigned

Dear ${name},

Thank you for contacting AsthaSoft Technologies. We have received your project details regarding ${serviceInfo.title}.

RESPONSE COMMITMENT:
A Senior Solution Architect is currently reviewing your project requirements and will connect with you within 24 hours with technical insights and recommended architecture.

SERVICE SPECIFICATIONS & ENGINEERING CAPABILITIES
Service: ${serviceInfo.title}
"${serviceInfo.headline}"

OVERVIEW:
${serviceInfo.overview}

KEY DELIVERABLES & ENGINEERING SCOPE:
${deliverablesText}

TECHNOLOGY & TIMELINE:
  • Tech Stack  : ${techStackText}
  • Timeline    : ${serviceInfo.timeline}
  • Methodology : Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility
  • Guarantees  : ${pillarsText}

CONFIDENTIALITY & NDA:
${
  requestNDA
    ? `  • Formal NDA Status: Requested & Logged
    Prior to scheduling technical architecture reviews or sharing technical schemas, our legal team will provide a countersigned Mutual NDA to safeguard your proprietary intellectual property.`
    : `  • Bilateral Confidentiality:
    All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.`
}

SUMMARY OF SUBMITTED SCOPE
  • Service Requested : ${serviceRequired}
  • Contact Number    : `}<a href={`tel:${safePhoneClean}`} style={{ color: '#2563eb', textDecoration: 'underline' }}>{contactNumber || 'Not provided'}</a>
{budget ? `\n  • Estimated Budget  : ${budget}` : ''}
{timeline ? `\n  • Delivery Target   : ${timeline}` : ''}
{preferredTime ? `\n  • Preferred Time    : ${preferredTime}` : ''}
{`\n  • Project Brief     :\n    ${projectDescription || 'No description provided'}

WHAT HAPPENS NEXT:
  1. Scope Review    : A dedicated Solution Architect reviews your specifications within 24 hours.
  2. Discovery Call  : We align on technical architecture, sprint breakdown, and security requirements.
  3. Formal Proposal : You receive an architecture document, sprint plan, and transparent milestone quote.

Have existing architecture diagrams, wireframes, or RFP documents to share?
Simply reply directly to this email and our technical team will review them ahead of our call.

Strategic Consulting & Engineering Team
AsthaSoft Technologies · Enterprise Solutions
Email : `}<a href="mailto:sales@asthasoftindia.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>sales@asthasoftindia.com</a>
{`
Web   : `}<a href="https://asthasoftindia.com" style={{ color: '#2563eb', textDecoration: 'underline' }}>https://asthasoftindia.com</a>
{`

© ${new Date().getFullYear()} AsthaSoft Technologies. All rights reserved.
ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer`}
      </div>
    </div>
  );
};

export default CustomerAutoReplyEmail;
