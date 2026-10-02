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
}) => {
  const displayTicketId = ticketId || 'ASTHA-INQUIRY';
  const serviceInfo = getServiceDetails(serviceRequired);
  return (
    <div
      style={{
        backgroundColor: '#f1f5f9',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '40px 15px',
        color: '#1e293b',
      }}
    >
      <div
        style={{
          maxWidth: '620px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0A1128 0%, #101F42 100%)',
            padding: '36px 36px 28px 36px',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '-0.5px',
                  lineHeight: '1.2',
                }}
              >
                Astha<span style={{ color: '#38bdf8' }}>Soft</span>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#94a3b8',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                Enterprise Software &amp; Cloud Engineering
              </div>
            </div>
            <div
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                borderRadius: '20px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#38bdf8',
              }}
            >
              Ticket #{displayTicketId}
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '36px' }}>
          <h1
            style={{
              margin: '0 0 16px 0',
              fontSize: '22px',
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            Your Scoping Session Request Has Been Received
          </h1>

          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '15px',
              color: '#334155',
              lineHeight: '1.6',
            }}
          >
            Dear <strong>{name}</strong>,
          </p>

          <p
            style={{
              margin: '0 0 16px 0',
              fontSize: '15px',
              color: '#334155',
              lineHeight: '1.6',
            }}
          >
            Thank you for contacting <strong>AsthaSoft</strong>. We have received
            your request regarding{' '}
            <strong style={{ color: '#0284c7' }}>{serviceRequired}</strong>.
          </p>

          {/* 24-Hour Commitment */}
          <div
            style={{
              margin: '20px 0',
              padding: '18px 20px',
              backgroundColor: '#f0f9ff',
              borderLeft: '4px solid #0284c7',
              borderRadius: '6px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#0369a1',
                fontSize: '14px',
                lineHeight: '1.6',
                fontWeight: 500,
              }}
            >
              ⏱ <strong>Response Commitment:</strong> A dedicated strategic
              consultant will review your project scope and respond with
              technical insights within <strong>24 hours</strong>.
            </p>
          </div>

          {/* Service Specifications & Deliverables */}
          <div
            style={{
              margin: '26px 0',
              border: '1px solid #bfdbfe',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)',
                padding: '14px 20px',
                color: '#ffffff',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#93c5fd',
                }}
              >
                Service Specification &amp; Capabilities
              </div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  marginTop: '2px',
                  color: '#ffffff',
                }}
              >
                {serviceInfo.title}
              </div>
            </div>

            <div style={{ padding: '20px' }}>
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1e3a8a',
                  marginBottom: '8px',
                }}
              >
                {serviceInfo.headline}
              </div>

              <p
                style={{
                  margin: '0 0 16px 0',
                  fontSize: '13px',
                  color: '#475569',
                  lineHeight: '1.6',
                }}
              >
                {serviceInfo.overview}
              </p>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                }}
              >
                Key Deliverables &amp; Engineering Scope:
              </div>
              <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style={{ marginBottom: '16px' }}>
                <tbody>
                  {serviceInfo.deliverables.map((item, idx) => (
                    <tr key={idx} style={{ verticalAlign: 'top' }}>
                      <td style={{ padding: '4px 8px 4px 0', color: '#0284c7', fontWeight: 700, fontSize: '15px' }}>✓</td>
                      <td style={{ padding: '4px 0', color: '#334155', fontSize: '13px', lineHeight: '1.5' }}>{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#0f172a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '6px',
                }}
              >
                Recommended Technology Stack:
              </div>
              <div style={{ marginBottom: '16px' }}>
                {serviceInfo.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      backgroundColor: '#f1f5f9',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      fontWeight: 600,
                      margin: '3px 3px 3px 0',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  marginTop: '14px',
                }}
              >
                <div style={{ fontSize: '12px', color: '#475569', marginBottom: '6px' }}>
                  <strong>⏱ Typical Delivery Timeline:</strong> {serviceInfo.timeline}
                </div>
                <div style={{ fontSize: '12px', color: '#475569', marginBottom: '8px' }}>
                  <strong>⚡ Methodology:</strong> Agile 2-Week Sprints · Continuous Staging Deployments · Daily Standup Visibility
                </div>
                <div>
                  {serviceInfo.architecturePillars.map((pillar, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: 'inline-block',
                        backgroundColor: '#f0fdf4',
                        color: '#166534',
                        border: '1px solid #bbf7d0',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '11px',
                        fontWeight: 600,
                        margin: '3px 3px 3px 0',
                      }}
                    >
                      🛡 {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Conditional NDA paragraph */}
          {requestNDA ? (
            <div
              style={{
                margin: '24px 0',
                padding: '18px 20px',
                backgroundColor: '#f0fdf4',
                borderLeft: '4px solid #16a34a',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: '#166534',
                  fontSize: '14px',
                  marginBottom: '6px',
                }}
              >
                ✓ Non-Disclosure Agreement (NDA) Requested
              </div>
              <p
                style={{
                  margin: 0,
                  color: '#15803d',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                We have noted your request for a Non-Disclosure Agreement. Prior
                to discussing technical specifics and sensitive project
                architecture, our compliance team will provide a signed Mutual
                NDA to ensure your proprietary intellectual property is
                fully protected.
              </p>
            </div>
          ) : (
            <div
              style={{
                margin: '20px 0',
                padding: '14px 18px',
                backgroundColor: '#f8fafc',
                borderLeft: '4px solid #94a3b8',
                borderRadius: '6px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: '#475569',
                  fontSize: '13px',
                  lineHeight: '1.5',
                }}
              >
                <strong>Confidentiality Notice:</strong> All project specifications
                shared with AsthaSoft remain strictly confidential under our
                standard professional policy.
              </p>
            </div>
          )}

          {/* Submitted Data Review */}
          <div
            style={{
              margin: '28px 0',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: '#f8fafc',
                padding: '12px 18px',
                borderBottom: '1px solid #e2e8f0',
                fontWeight: 700,
                fontSize: '13px',
                textTransform: 'uppercase',
                color: '#475569',
              }}
            >
              Summary of Submitted Scope
            </div>
            <div style={{ padding: '16px 18px', fontSize: '14px' }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: '#64748b' }}>Service Requested: </span>
                <strong style={{ color: '#0f172a' }}>{serviceRequired}</strong>
              </div>
              {contactNumber && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#64748b' }}>Contact Number: </span>
                  <span style={{ color: '#0f172a' }}>{contactNumber}</span>
                </div>
              )}
              {projectDescription && (
                <div style={{ marginTop: '12px' }}>
                  <span style={{ color: '#64748b', display: 'block', marginBottom: '4px' }}>
                    Project Description:
                  </span>
                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      padding: '12px',
                      borderRadius: '6px',
                      color: '#334155',
                      whiteSpace: 'pre-wrap',
                      lineHeight: '1.5',
                    }}
                  >
                    {projectDescription}
                  </div>
                </div>
              )}
            </div>
          </div>

          <p
            style={{
              margin: '0 0 24px 0',
              fontSize: '14px',
              color: '#475569',
              lineHeight: '1.6',
            }}
          >
            If you have existing technical requirements, architecture diagrams,
            or wireframes to share, feel free to reply directly to this email.
          </p>

          <div
            style={{
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '15px',
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              AsthaSoft Strategic Consulting Team
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
              AsthaSoft Technologies · Enterprise Solutions
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '24px 36px',
            borderTop: '1px solid #e2e8f0',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#64748b' }}>
            © {new Date().getFullYear()} AsthaSoft Technologies. All rights reserved.
          </p>
          <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
            ISO-Aligned Delivery · Strict NDA Security · Guaranteed 100% IP Transfer
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerAutoReplyEmail;
