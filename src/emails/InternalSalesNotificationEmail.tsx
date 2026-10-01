import React from 'react';

export interface InternalSalesNotificationProps {
  name: string;
  email: string;
  contactNumber: string;
  serviceRequired: string;
  projectDescription: string;
  requestNDA: boolean;
  ticketId?: string;
  timestamp?: string;
}

export const InternalSalesNotificationEmail: React.FC<InternalSalesNotificationProps> = ({
  name = 'Not Provided',
  email = 'Not Provided',
  contactNumber = 'Not Provided',
  serviceRequired = 'Custom Enterprise Software',
  projectDescription = 'No project description provided',
  requestNDA = false,
  ticketId,
  timestamp,
}) => {
  const displayTicketId = ticketId || 'ASTHA-INQUIRY';
  const displayTimestamp = timestamp || 'Recent';
  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        padding: '30px 15px',
        color: '#0f172a',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#0f172a',
            padding: '24px 30px',
            borderBottom: '4px solid #2563eb',
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
                  color: '#38bdf8',
                  fontSize: '11px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                Internal Sales Alert
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, marginTop: '4px' }}>
                New Scoping Session Submission
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#1e293b',
                color: '#94a3b8',
                fontSize: '11px',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              {displayTicketId}
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {/* Quick Actions */}
          <div style={{ marginBottom: '24px', display: 'flex', gap: '10px' }}>
            <a
              href={`mailto:${email}?subject=Re:%20AsthaSoft%20Scoping%20Session%20-%20${encodeURIComponent(serviceRequired)}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#2563eb',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              ✉️ Reply to {name}
            </a>
            <a
              href={`tel:${contactNumber.replace(/\s+/g, '')}`}
              style={{
                display: 'inline-block',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              📞 Call Lead
            </a>
          </div>

          {/* Details Table */}
          <table
            style={{
              width: '100%',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              borderCollapse: 'separate',
              marginBottom: '24px',
              fontSize: '14px',
            }}
          >
            <thead>
              <tr style={{ backgroundColor: '#f8fafc' }}>
                <th
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748b',
                    textAlign: 'left',
                    width: '35%',
                  }}
                >
                  FIELD
                </th>
                <th
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#64748b',
                    textAlign: 'left',
                  }}
                >
                  SUBMITTED VALUE
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                  Client Name
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#0f172a' }}>
                  {name}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                  Email Address
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0284c7' }}>
                  <a href={`mailto:${email}`} style={{ color: '#0284c7', textDecoration: 'none' }}>
                    {email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                  Contact Number
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 600, color: '#0f172a' }}>
                  {contactNumber}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                  Service Required
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', fontWeight: 700, color: '#0f172a' }}>
                  {serviceRequired}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9', color: '#64748b' }}>
                  NDA Status
                </td>
                <td style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  {requestNDA ? (
                    <span
                      style={{
                        backgroundColor: '#fef2f2',
                        color: '#b91c1c',
                        border: '1px solid #fecaca',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                    >
                      ⚠️ YES — Provide Signed NDA First
                    </span>
                  ) : (
                    <span
                      style={{
                        backgroundColor: '#f1f5f9',
                        color: '#475569',
                        border: '1px solid #cbd5e1',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontWeight: 500,
                        fontSize: '12px',
                      }}
                    >
                      Standard Confidentiality
                    </span>
                  )}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>Received (IST)</td>
                <td style={{ padding: '12px 16px', color: '#475569', fontSize: '13px' }}>
                  {displayTimestamp}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Project Description &amp; Scope:
            </div>
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                padding: '16px',
                fontSize: '14px',
                color: '#1e293b',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
              }}
            >
              {projectDescription}
            </div>
          </div>

          {/* Action List */}
          <div
            style={{
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              padding: '14px 18px',
            }}
          >
            <div
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#1e40af',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              Next Internal Steps:
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: '20px',
                fontSize: '13px',
                color: '#1e3a8a',
                lineHeight: '1.6',
              }}
            >
              <li>Assign dedicated Solutions Architect for {serviceRequired}.</li>
              {requestNDA && (
                <li>
                  <strong>Counter-sign standard Mutual NDA and dispatch to {email}.</strong>
                </li>
              )}
              <li>Call lead or reply via email within 24-hour SLA.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            padding: '16px 30px',
            borderTop: '1px solid #e2e8f0',
            fontSize: '11px',
            color: '#94a3b8',
            textAlign: 'center',
          }}
        >
          AsthaSoft Ingestion Engine · Internal Notification · sales@asthasoftindia.com
        </div>
      </div>
    </div>
  );
};

export default InternalSalesNotificationEmail;
