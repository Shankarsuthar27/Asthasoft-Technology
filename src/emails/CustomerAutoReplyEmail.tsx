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

  return (
    <div
      style={{
        margin: 0,
        padding: '32px 16px',
        backgroundColor: '#f8fafc',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        color: '#1e293b',
        lineHeight: 1.6,
      }}
    >
      <table
        role="presentation"
        width="100%"
        cellPadding={0}
        cellSpacing={0}
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
        }}
      >
        {/* Brand Header */}
        <tbody>
          <tr>
            <td
              style={{
                padding: '26px 32px',
                backgroundColor: '#0f172a',
                backgroundImage: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              }}
            >
              <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                <tbody>
                  <tr>
                    <td>
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: '#ffffff',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        AsthaSoft
                      </div>
                      <div
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#94a3b8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          marginTop: '3px',
                        }}
                      >
                        Enterprise Software &amp; Cloud Engineering
                      </div>
                    </td>
                    <td align="right" style={{ verticalAlign: 'top' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '6px 12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#38bdf8',
                          fontFamily: 'monospace',
                        }}
                      >
                        #{displayTicketId}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* Body Content */}
          <tr>
            <td style={{ padding: '32px' }}>
              <h1
                style={{
                  margin: '0 0 14px',
                  fontSize: '21px',
                  fontWeight: 700,
                  color: '#0f172a',
                  lineHeight: 1.3,
                }}
              >
                Your Scoping Request Has Been Received
              </h1>
              <p style={{ margin: '0 0 14px', fontSize: '15px', color: '#334155' }}>
                Dear <strong>{name}</strong>,
              </p>
              <p
                style={{
                  margin: '0 0 20px',
                  fontSize: '14px',
                  color: '#475569',
                  lineHeight: 1.6,
                }}
              >
                Thank you for contacting <strong>AsthaSoft Technologies</strong>. We have registered
                your project details regarding <strong>{serviceInfo.title}</strong> and initiated
                preliminary technical review.
              </p>

              {/* 24-Hour Commitment */}
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  marginBottom: '28px',
                  backgroundColor: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderLeft: '4px solid #0284c7',
                  borderRadius: '8px',
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: '16px 20px' }}>
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0369a1',
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          marginBottom: '4px',
                        }}
                      >
                        ⚡ 24-Hour Response Commitment
                      </div>
                      <div style={{ fontSize: '13.5px', color: '#0c4a6e', lineHeight: 1.5 }}>
                        A Senior Solution Architect is currently reviewing your project
                        requirements and will connect with you within <strong>24 hours</strong> with
                        technical insights and recommended architecture.
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Service Specification */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0284c7',
                    marginBottom: '6px',
                  }}
                >
                  Service Specification &amp; Capabilities
                </div>
                <div
                  style={{
                    fontSize: '17px',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: '4px',
                  }}
                >
                  {serviceInfo.title}
                </div>
                <div
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#64748b',
                    marginBottom: '12px',
                  }}
                >
                  {serviceInfo.headline}
                </div>
                <p
                  style={{
                    margin: '0 0 16px',
                    fontSize: '14px',
                    color: '#334155',
                    lineHeight: 1.6,
                  }}
                >
                  {serviceInfo.overview}
                </p>

                {/* Key Deliverables */}
                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '18px 20px',
                    marginBottom: '20px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      marginBottom: '12px',
                    }}
                  >
                    Key Deliverables &amp; Engineering Scope:
                  </div>
                  <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                    <tbody>
                      {serviceInfo.deliverables.map((item, idx) => (
                        <tr key={idx}>
                          <td
                            style={{
                              padding: '6px 12px 6px 0',
                              verticalAlign: 'top',
                              color: '#0284c7',
                              fontWeight: 700,
                              fontSize: '15px',
                              lineHeight: 1.4,
                              width: '22px',
                            }}
                          >
                            ✓
                          </td>
                          <td
                            style={{
                              padding: '6px 0',
                              verticalAlign: 'top',
                              color: '#334155',
                              fontSize: '13.5px',
                              lineHeight: 1.5,
                            }}
                          >
                            {item}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Recommended Tech Stack */}
                <div style={{ marginBottom: '18px' }}>
                  <div
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px',
                    }}
                  >
                    Recommended Technology Stack:
                  </div>
                  <div style={{ fontSize: '13px', color: '#1e293b', lineHeight: 1.8 }}>
                    {serviceInfo.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          margin: '3px 6px 3px 0',
                          backgroundColor: '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Execution Standards */}
                <table
                  role="presentation"
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    borderTop: '1px solid #e2e8f0',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '20px',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: '10px 0',
                          fontSize: '13px',
                          color: '#64748b',
                          fontWeight: 600,
                          width: '140px',
                          verticalAlign: 'top',
                        }}
                      >
                        Typical Timeline:
                      </td>
                      <td style={{ padding: '10px 0', fontSize: '13px', color: '#0f172a' }}>
                        {serviceInfo.timeline}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: '10px 0',
                          fontSize: '13px',
                          color: '#64748b',
                          fontWeight: 600,
                          verticalAlign: 'top',
                        }}
                      >
                        Methodology:
                      </td>
                      <td style={{ padding: '10px 0', fontSize: '13px', color: '#0f172a' }}>
                        Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: '10px 0',
                          fontSize: '13px',
                          color: '#64748b',
                          fontWeight: 600,
                          verticalAlign: 'top',
                        }}
                      >
                        Core Guarantees:
                      </td>
                      <td style={{ padding: '10px 0', fontSize: '13px', color: '#0f172a' }}>
                        {serviceInfo.architecturePillars.join(' · ')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* NDA Section */}
              <table
                role="presentation"
                width="100%"
                cellPadding={0}
                cellSpacing={0}
                style={{
                  marginBottom: '28px',
                  backgroundColor: requestNDA ? '#f0fdf4' : '#f8fafc',
                  border: `1px solid ${requestNDA ? '#bbf7d0' : '#e2e8f0'}`,
                  borderRadius: '8px',
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: '14px 18px' }}>
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: requestNDA ? '#166534' : '#0f172a',
                          marginBottom: '4px',
                        }}
                      >
                        {requestNDA
                          ? '✓ Non-Disclosure Agreement (NDA) Requested'
                          : 'Confidentiality Notice'}
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: requestNDA ? '#15803d' : '#475569',
                          lineHeight: 1.5,
                        }}
                      >
                        {requestNDA
                          ? 'We have logged your request for a formal Non-Disclosure Agreement. Prior to scheduling technical architecture reviews or sharing technical schemas, our legal team will provide a countersigned Mutual NDA to safeguard your proprietary intellectual property.'
                          : 'All project specifications and ideas shared with AsthaSoft are treated with strict professional confidentiality under our standard bilateral policy.'}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Summary of Submitted Scope */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0284c7',
                    marginBottom: '8px',
                  }}
                >
                  Summary of Submitted Scope
                </div>
                <table
                  role="presentation"
                  width="100%"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          padding: '10px 16px',
                          color: '#64748b',
                          fontWeight: 600,
                          width: '150px',
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        Service Requested:
                      </td>
                      <td
                        style={{
                          padding: '10px 16px',
                          color: '#0f172a',
                          fontWeight: 600,
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        {serviceRequired}
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: '10px 16px',
                          color: '#64748b',
                          fontWeight: 600,
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        Contact Number:
                      </td>
                      <td
                        style={{
                          padding: '10px 16px',
                          color: '#0f172a',
                          borderBottom: '1px solid #f1f5f9',
                        }}
                      >
                        <a
                          href={`tel:${safePhoneClean}`}
                          style={{
                            color: '#0284c7',
                            textDecoration: 'underline',
                            fontWeight: 600,
                          }}
                        >
                          {contactNumber || 'Not provided'}
                        </a>
                      </td>
                    </tr>
                    {budget && (
                      <tr>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#64748b',
                            fontWeight: 600,
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          Estimated Budget:
                        </td>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#0f172a',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          {budget}
                        </td>
                      </tr>
                    )}
                    {timeline && (
                      <tr>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#64748b',
                            fontWeight: 600,
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          Delivery Target:
                        </td>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#0f172a',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          {timeline}
                        </td>
                      </tr>
                    )}
                    {preferredTime && (
                      <tr>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#64748b',
                            fontWeight: 600,
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          Preferred Time:
                        </td>
                        <td
                          style={{
                            padding: '10px 16px',
                            color: '#0f172a',
                            borderBottom: '1px solid #f1f5f9',
                          }}
                        >
                          {preferredTime}
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td
                        style={{
                          padding: '10px 16px',
                          color: '#64748b',
                          fontWeight: 600,
                          verticalAlign: 'top',
                        }}
                      >
                        Project Brief:
                      </td>
                      <td style={{ padding: '10px 16px', color: '#334155', lineHeight: 1.5 }}>
                        {projectDescription || 'No description provided'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* What Happens Next */}
              <div style={{ marginBottom: '28px' }}>
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#0284c7',
                    marginBottom: '12px',
                  }}
                >
                  What Happens Next
                </div>
                <table role="presentation" width="100%" cellPadding={0} cellSpacing={0}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: 'top', width: '32px', paddingBottom: '12px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            textAlign: 'center',
                            lineHeight: '24px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          1
                        </div>
                      </td>
                      <td
                        style={{
                          paddingBottom: '12px',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          color: '#334155',
                        }}
                      >
                        <strong style={{ color: '#0f172a' }}>Scope Review:</strong> A dedicated
                        Solution Architect reviews your specifications within 24 hours.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: 'top', width: '32px', paddingBottom: '12px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            textAlign: 'center',
                            lineHeight: '24px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          2
                        </div>
                      </td>
                      <td
                        style={{
                          paddingBottom: '12px',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          color: '#334155',
                        }}
                      >
                        <strong style={{ color: '#0f172a' }}>Discovery Call:</strong> We align on
                        technical architecture, sprint breakdown, and security requirements.
                      </td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: 'top', width: '32px', paddingBottom: '12px' }}>
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0284c7',
                            color: '#ffffff',
                            textAlign: 'center',
                            lineHeight: '24px',
                            fontSize: '12px',
                            fontWeight: 700,
                          }}
                        >
                          3
                        </div>
                      </td>
                      <td
                        style={{
                          paddingBottom: '12px',
                          fontSize: '13px',
                          lineHeight: 1.5,
                          color: '#334155',
                        }}
                      >
                        <strong style={{ color: '#0f172a' }}>Fixed-Scope Proposal:</strong> You
                        receive an architecture document, sprint plan, and transparent milestone quote.
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    marginTop: '10px',
                    padding: '14px 16px',
                    backgroundColor: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: 1.5,
                  }}
                >
                  📎 <strong>Have existing architecture diagrams, wireframes, or RFP documents to share?</strong>
                  <br />
                  Simply reply directly to this email and our technical team will review them ahead
                  of our call.
                </div>
              </div>

              {/* Team Signoff */}
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                  Strategic Consulting &amp; Engineering Team
                </div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
                  AsthaSoft Technologies · Enterprise Solutions ·{' '}
                  <a
                    href="mailto:sales@asthasoftindia.com"
                    style={{ color: '#0284c7', textDecoration: 'underline' }}
                  >
                    sales@asthasoftindia.com
                  </a>
                </div>
              </div>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td
              style={{
                padding: '20px 32px',
                backgroundColor: '#f8fafc',
                borderTop: '1px solid #e2e8f0',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>
                © {new Date().getFullYear()} AsthaSoft Technologies. All rights reserved.
                <br />
                <span style={{ color: '#94a3b8', fontSize: '11px' }}>
                  ISO-Aligned Architecture · Strict NDA Security · Guaranteed 100% IP Transfer
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CustomerAutoReplyEmail;
