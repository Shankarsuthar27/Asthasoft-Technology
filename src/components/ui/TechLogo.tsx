import React from 'react';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-6 h-6', size }) => {
  const norm = name.toLowerCase().trim();
  const style = size ? { width: size, height: size } : undefined;

  // 1. Exact user-uploaded image matches
  if (norm.includes('swift') && !norm.includes('swiftui') && !norm.includes('kotlin')) {
    return (
      <img
        src="/tech-logos/swift.png"
        alt="Swift"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm === 'kotlin') {
    return (
      <img
        src="/tech-logos/kotlin.png"
        alt="Kotlin"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('flutter')) {
    return (
      <img
        src="/tech-logos/flutter.png"
        alt="Flutter"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('react') && !norm.includes('native')) {
    return (
      <img
        src="/tech-logos/react.png"
        alt="React"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('react native')) {
    return (
      <img
        src="/tech-logos/react.png"
        alt="React Native"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('next')) {
    return (
      <img
        src="/tech-logos/nextjs.png"
        alt="Next.js"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('node')) {
    return (
      <img
        src="/tech-logos/nodejs.png"
        alt="Node.js"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('python')) {
    return (
      <img
        src="/tech-logos/python.png"
        alt="Python"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('java')) {
    return (
      <img
        src="/tech-logos/java.png"
        alt="Java"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('php')) {
    return (
      <img
        src="/tech-logos/php.png"
        alt="PHP"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('.net') || norm.includes('dotnet')) {
    return (
      <img
        src="/tech-logos/dotnet.png"
        alt=".NET"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('postgres')) {
    return (
      <img
        src="/tech-logos/postgresql.png"
        alt="PostgreSQL"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('mysql')) {
    return (
      <img
        src="/tech-logos/mysql.png"
        alt="MySQL"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('firebase')) {
    return (
      <img
        src="/tech-logos/firebase.png"
        alt="Firebase"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('redis')) {
    return (
      <img
        src="/tech-logos/redis.png"
        alt="Redis"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('aws')) {
    return (
      <img
        src="/tech-logos/aws.png"
        alt="AWS"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('tensorflow') || norm.includes('tf')) {
    return (
      <img
        src="/tech-logos/tensorflow.png"
        alt="TensorFlow"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('gcp') || norm.includes('google cloud')) {
    return (
      <img
        src="/tech-logos/gcp.png"
        alt="Google Cloud"
        className={`object-contain ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('chatbot') || norm.includes('bot') || norm.includes('agent')) {
    return (
      <img
        src="/tech-logos/chatbot.jpg"
        alt="AI Chatbot"
        className={`object-contain rounded-lg ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('rest') || (norm.includes('api') && !norm.includes('openai') && !norm.includes('graphql'))) {
    return (
      <img
        src="/tech-logos/restapi.jpg"
        alt="REST API"
        className={`object-contain rounded-lg ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  if (norm.includes('crm') || norm.includes('erp')) {
    return (
      <img
        src="/tech-logos/crm.jpg"
        alt="Cloud CRM"
        className={`object-contain rounded-lg ${className}`}
        style={style}
        loading="lazy"
      />
    );
  }

  // Combined Swift / Kotlin card in Custom Software page
  if (norm.includes('swift') && norm.includes('kotlin')) {
    return (
      <div className={`flex items-center justify-center gap-1 ${className}`} style={style}>
        <img src="/tech-logos/swift.png" alt="Swift" className="w-1/2 h-full object-contain" />
        <img src="/tech-logos/kotlin.png" alt="Kotlin" className="w-1/2 h-full object-contain" />
      </div>
    );
  }

  // 2. Comprehensive vector SVGs for all other tech stack items
  // TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="40" fill="#3178C6" />
        <path
          d="M140.7 185.3c-4.4 2.8-10.4 4.8-17.7 4.8-17.2 0-29.6-11.4-29.6-32.3V117H75.5v-22h17.9V65.8h21.4V95h26v22h-26v38.9c0 7.8 4 12.3 10.9 12.3 4.2 0 7.4-.9 9.3-2.1l5.7 18.5zm47.9-1.9c-7.9 4.8-18.7 7.7-30.8 7.7-25.1 0-41.5-14.7-41.5-40 0-24.3 16.9-41.2 43.1-41.2 10.4 0 19.3 2.5 25.1 6.2l-6.1 19.7c-5.2-3-11.7-4.8-18.4-4.8-13.7 0-21.8 8.7-21.8 20.3 0 12.5 8.9 20.4 22.8 20.4 6.8 0 13.5-1.9 18.6-4.8l7 16.5z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // SwiftUI
  if (norm.includes('swiftui')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="url(#swiftui-grad)" />
        <path
          d="M72 128C72 96.96 97.2 72 128 72C159.04 72 184 96.96 184 128C184 159.04 159.04 184 128 184C97.2 184 72 159.04 72 128Z"
          fill="white"
          fillOpacity="0.2"
        />
        <path
          d="M178 152C164 178 135 192 108 188C132 178 145 158 145 140C145 125 136 114 122 106C110 99 98 90 98 76C98 72 100 68 102 64C82 78 72 100 74 122C76 148 95 174 122 184C140 190 162 180 178 152Z"
          fill="white"
        />
        <defs>
          <linearGradient id="swiftui-grad" x1="28" y1="28" x2="228" y2="228" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0071E3" />
            <stop offset="0.5" stopColor="#5E5CE6" />
            <stop offset="1" stopColor="#FF375F" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Objective-C
  if (norm.includes('objective-c')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#0B5C9E" />
        <circle cx="128" cy="128" r="76" stroke="#00B4D8" strokeWidth="14" />
        <path
          d="M148 100C142 94 134 90 124 90C104 90 90 106 90 128C90 150 104 166 124 166C134 166 142 162 148 156"
          stroke="#FFFFFF"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <circle cx="166" cy="94" r="8" fill="#FFD166" />
      </svg>
    );
  }

  // Apple ARKit
  if (norm.includes('arkit')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#1C1C1E" />
        <path d="M128 50L194 88V166L128 204L62 166V88L128 50Z" stroke="#FF9F0A" strokeWidth="12" strokeLinejoin="round" />
        <path d="M128 50V204M62 88L194 166M194 88L62 166" stroke="#FF9F0A" strokeWidth="8" strokeOpacity="0.7" />
        <circle cx="128" cy="128" r="16" fill="#30D158" />
      </svg>
    );
  }

  // CoreML
  if (norm.includes('coreml')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="url(#coreml-grad)" />
        <circle cx="88" cy="88" r="16" fill="white" />
        <circle cx="168" cy="88" r="16" fill="white" />
        <circle cx="128" cy="168" r="20" fill="white" />
        <path d="M88 88L128 168M168 88L128 168M88 88H168" stroke="white" strokeWidth="8" strokeLinecap="round" />
        <defs>
          <linearGradient id="coreml-grad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
            <stop stopColor="#30D158" />
            <stop offset="0.5" stopColor="#0A84FF" />
            <stop offset="1" stopColor="#BF5AF2" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Combine
  if (norm.includes('combine')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#0A84FF" />
        <path d="M60 90C110 90 146 166 196 166" stroke="white" strokeWidth="16" strokeLinecap="round" />
        <path d="M60 166C110 166 146 90 196 90" stroke="#FFD60A" strokeWidth="16" strokeLinecap="round" />
      </svg>
    );
  }

  // Jetpack Compose
  if (norm.includes('jetpack compose') || norm.includes('compose')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#1B1F23" />
        <path d="M128 42L198 82V164L128 206L58 164V82L128 42Z" fill="#3DDC84" fillOpacity="0.2" stroke="#3DDC84" strokeWidth="12" />
        <path d="M128 76L172 102V152L128 178L84 152V102L128 76Z" fill="#4285F4" />
      </svg>
    );
  }

  // Java
  if (norm.includes('java')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#F8F9FA" stroke="#E9ECEF" strokeWidth="8" />
        <path d="M110 186c28 2 54-1 68-7-23-4-43-3-68 7z" fill="#E76F00" />
        <path d="M102 165c36 2 68-2 88-10-30-5-56-3-88 10z" fill="#E76F00" />
        <path d="M138 126c14 16-4 30-4 30s24-12 13-28c-10-15-18-23 25-50-32 9-46 32-34 48z" fill="#5382A1" />
        <path d="M178 172c7-6 11-13 8-20-4 4-9 7-16 9 12 8 26 5 32-1-6 1-16 0-24-8z" fill="#E76F00" />
      </svg>
    );
  }

  // Android NDK / Android
  if (norm.includes('ndk') || norm.includes('android')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#3DDC84" />
        <circle cx="96" cy="116" r="10" fill="white" />
        <circle cx="160" cy="116" r="10" fill="white" />
        <path d="M72 146C72 104 184 104 184 146H72Z" fill="white" />
        <line x1="90" y1="84" x2="74" y2="60" stroke="white" strokeWidth="12" strokeLinecap="round" />
        <line x1="166" y1="84" x2="182" y2="60" stroke="white" strokeWidth="12" strokeLinecap="round" />
      </svg>
    );
  }

  // Coroutines
  if (norm.includes('coroutines')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="url(#coroutine-grad)" />
        <path d="M70 128C70 95.967 95.967 70 128 70C148.5 70 166.5 80.5 177 96.5" stroke="white" strokeWidth="16" strokeLinecap="round" />
        <path d="M186 128C186 160.033 160.033 186 128 186C107.5 186 89.5 175.5 79 159.5" stroke="#00E5FF" strokeWidth="16" strokeLinecap="round" />
        <defs>
          <linearGradient id="coroutine-grad" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7F52FF" />
            <stop offset="1" stopColor="#C711E1" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Room DB
  if (norm.includes('room')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#2D3748" />
        <ellipse cx="128" cy="86" rx="60" ry="24" fill="#3DDC84" />
        <path d="M68 86V130C68 143.255 94.863 154 128 154C161.137 154 188 143.255 188 130V86" stroke="#3DDC84" strokeWidth="12" fill="none" />
        <path d="M68 130V170C68 183.255 94.863 194 128 194C161.137 194 188 183.255 188 170V130" stroke="#4285F4" strokeWidth="12" fill="none" />
      </svg>
    );
  }

  // Dart
  if (norm.includes('dart')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="6" />
        <path d="M64 64H154L192 102V192L64 64Z" fill="#0175C2" />
        <path d="M128 128L64 192H154L192 154L128 128Z" fill="#00B4AB" />
        <path d="M154 64L192 102L128 166L90 128L154 64Z" fill="#29B6F6" />
      </svg>
    );
  }

  // Expo
  if (norm.includes('expo')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#000020" />
        <path d="M64 176L128 80L192 176H152L128 136L104 176H64Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Redux / Zustand
  if (norm.includes('redux') || norm.includes('zustand')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#764ABC" />
        <ellipse cx="128" cy="128" rx="72" ry="28" stroke="#FFFFFF" strokeWidth="10" transform="rotate(30 128 128)" fill="none" />
        <ellipse cx="128" cy="128" rx="72" ry="28" stroke="#FFFFFF" strokeWidth="10" transform="rotate(-30 128 128)" fill="none" />
        <ellipse cx="128" cy="128" rx="72" ry="28" stroke="#FFFFFF" strokeWidth="10" transform="rotate(90 128 128)" fill="none" />
        <circle cx="128" cy="128" r="14" fill="#FFFFFF" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes('node')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#333333" />
        <path d="M128 48L194 86V162L128 200L62 162V86L128 48Z" fill="#68A063" />
        <path d="M128 72L172 97V147L128 172L84 147V97L128 72Z" fill="#3E863D" />
        <path d="M110 110V146H122V124L138 146H146V110H134V132L118 110H110Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Python
  if (norm.includes('python')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="6" />
        <path
          d="M126.8 52c-35.8 0-33.6 15.5-33.6 15.5l.04 16.1h34.3v4.9H78.8c-23.7 0-41.6 14.3-41.6 41.5 0 27.3 15.6 40.5 35.8 40.5h10.9v-15.3c0-17.5 14.9-32.5 32.5-32.5h33.8c12.1 0 22-9.9 22-22.1V74.1c0-12.8-10.7-22.1-23.5-22.1h-21.9zm-10.4 12.3c3.6 0 6.6 3 6.6 6.6 0 3.6-3 6.6-6.6 6.6-3.6 0-6.6-3-6.6-6.6 0-3.6 3-6.6 6.6-6.6z"
          fill="#3776AB"
        />
        <path
          d="M129.2 204c35.8 0 33.6-15.5 33.6-15.5l-.04-16.1h-34.3v-4.9h48.7c23.7 0 41.6-14.3 41.6-41.5 0-27.3-15.6-40.5-35.8-40.5h-10.9v15.3c0 17.5-14.9 32.5-32.5 32.5H105.8c-12.1 0-22 9.9-22 22.1v26.5c0 12.8 10.7 22.1 23.5 22.1h21.9zm10.4-12.3c-3.6 0-6.6-3-6.6-6.6 0-3.6 3-6.6 6.6-6.6 3.6 0 6.6 3 6.6 6.6 0 3.6-3 6.6-6.6 6.6z"
          fill="#FFD438"
        />
      </svg>
    );
  }

  // AWS / AWS Lambda / AWS Cloud
  if (norm.includes('aws')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#232F3E" />
        <path
          d="M84 122c-8 0-14 4-16 10l12 3c1-4 4-6 8-6 6 0 9 3 9 9v3c-4-1-8-2-13-2-12 0-20 6-20 17 0 10 7 16 17 16 7 0 13-3 16-9v8h12v-32c0-15-10-24-25-24zm-1 39c-4 0-8-2-8-7 0-4 3-7 8-7 4 0 8 1 11 2v3c0 6-5 9-11 9zm49-37h-12l14 48h14l10-34 10 34h14l14-48h-12l-8 32-10-32h-12l-10 32-10-32zm68 18c-7-3-12-6-12-10 0-4 4-6 9-6 6 0 10 3 12 7l11-4c-3-8-11-13-23-13-13 0-22 7-22 17 0 9 6 14 15 17 8 3 13 6 13 10 0 4-4 7-10 7-7 0-12-4-15-9l-11 5c4 9 13 14 26 14 14 0 23-8 23-18 0-9-7-14-16-17z"
          fill="#FFFFFF"
        />
        <path
          d="M62 188c42 16 90 16 132 0 4-2 7 2 4 5-45 18-95 18-140 0-4-3-1-7 4-5z"
          fill="#FF9900"
        />
        <path
          d="M198 184c-3-2-8-3-12-2 3-5 5-11 6-17 3 5 5 11 6 19z"
          fill="#FF9900"
        />
      </svg>
    );
  }

  // GraphQL
  if (norm.includes('graphql')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#171E26" />
        <path
          d="M128 54L192 91V165L128 202L64 165V91L128 54Z"
          stroke="#E10098"
          strokeWidth="10"
          fill="none"
        />
        <path
          d="M128 54L192 165H64L128 54Z"
          stroke="#E10098"
          strokeWidth="10"
          fill="none"
        />
        <circle cx="128" cy="54" r="14" fill="#E10098" />
        <circle cx="192" cy="91" r="14" fill="#E10098" />
        <circle cx="192" cy="165" r="14" fill="#E10098" />
        <circle cx="128" cy="202" r="14" fill="#E10098" />
        <circle cx="64" cy="165" r="14" fill="#E10098" />
        <circle cx="64" cy="91" r="14" fill="#E10098" />
      </svg>
    );
  }

  // Firebase
  if (norm.includes('firebase')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#2C384A" />
        <path d="M68 188L94 58L124 116L68 188Z" fill="#FFA000" />
        <path d="M188 188L158 84L124 148L188 188Z" fill="#F57C00" />
        <path d="M68 188L124 116L158 84L188 188L128 214L68 188Z" fill="#FFCA28" />
      </svg>
    );
  }

  // WebSockets
  if (norm.includes('websocket')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#111827" />
        <path d="M80 140L128 72V116H176L128 184V140H80Z" fill="#F59E0B" />
        <circle cx="70" cy="70" r="10" fill="#3B82F6" />
        <circle cx="186" cy="186" r="10" fill="#10B981" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes('postgres')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#336791" />
        <path
          d="M128 60c-37.5 0-68 30.5-68 68 0 24 12.5 45.2 31.4 57.5v-30.5c-4.5-2.5-7.4-7.4-7.4-13 0-8.3 6.7-15 15-15h2c5.6-21.5 25.3-37 48.7-37 19.3 0 36.1 10.7 44.9 26.5 4.8-1.5 9.9-2.5 15.3-2.5 11 0 20 9 20 20v24c0 11-9 20-20 20h-8c-4.5 18.5-21 32-40.9 32-15 0-28.2-7.8-35.8-19.5-6.5 4-14.2 6.5-22.3 7.2v18.3c7.8.8 15.8 1.5 24 1.5 45 0 81.5-36.5 81.5-81.5S173 60 128 60z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // MongoDB
  if (norm.includes('mongo')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#13AA52" />
        <path
          d="M128 44c0 0-46 54-46 98 0 25 18 45 42 48v22h8v-22c24-3 42-23 42-48 0-44-46-98-46-98z"
          fill="#FFFFFF"
        />
        <path
          d="M128 44v146c24-3 42-23 42-48 0-44-42-98-42-98z"
          fill="#D6EED8"
        />
      </svg>
    );
  }

  // Redis
  if (norm.includes('redis')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#DC382D" />
        <path d="M128 64L188 96L128 128L68 96L128 64Z" fill="#FFFFFF" />
        <path d="M68 112L128 144L188 112V128L128 160L68 128V112Z" fill="#FFFFFF" fillOpacity="0.8" />
        <path d="M68 144L128 176L188 144V160L128 192L68 160V144Z" fill="#FFFFFF" fillOpacity="0.6" />
      </svg>
    );
  }

  // SQLite
  if (norm.includes('sqlite')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#003B57" />
        <ellipse cx="128" cy="80" rx="64" ry="26" fill="#00B4D8" />
        <path d="M64 80V176C64 190.36 92.65 202 128 202C163.35 202 192 190.36 192 176V80" stroke="#00B4D8" strokeWidth="14" fill="none" />
        <ellipse cx="128" cy="128" rx="64" ry="26" stroke="#00B4D8" strokeWidth="10" fill="none" />
      </svg>
    );
  }

  // Realm Mobile
  if (norm.includes('realm')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#F6487E" />
        <circle cx="128" cy="128" r="64" stroke="white" strokeWidth="14" fill="none" />
        <circle cx="128" cy="128" r="40" stroke="white" strokeWidth="10" fill="none" />
        <circle cx="128" cy="128" r="16" fill="white" />
      </svg>
    );
  }

  // Supabase
  if (norm.includes('supabase')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#1C1C1C" />
        <path
          d="M136.6 44.2C133.4 39.5 126 41.8 126 47.5V118H75.5c-7.3 0-11.4 8.4-6.8 14.1l49.9 69.7c3.2 4.7 10.6 2.4 10.6-3.3V138h50.5c7.3 0 11.4-8.4 6.8-14.1l-49.9-69.7z"
          fill="#3ECF8E"
        />
      </svg>
    );
  }

  // Vue.js
  if (norm.includes('vue')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="6" />
        <path d="M128 196L48 60H88L128 128L168 60H208L128 196Z" fill="#42B883" />
        <path d="M128 148L88 80H112L128 108L144 80H168L128 148Z" fill="#35495E" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#0F172A" />
        <path
          d="M74 126c6-14 16-21 30-21 21 0 26 15 38 15 11 0 18-7 24-21-6 14-16 21-30 21-21 0-26-15-38-15-11 0-18 7-24 21zm48 42c6-14 16-21 30-21 21 0 26 15 38 15 11 0 18-7 24-21-6 14-16 21-30 21-21 0-26-15-38-15-11 0-18 7-24 21z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // Go (Golang)
  if (norm.includes('go') || norm.includes('golang')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#00ADD8" />
        <path
          d="M62 136c0-26 17-46 44-46 22 0 35 12 40 26l-18 8c-4-9-11-16-22-16-15 0-24 12-24 28s9 28 24 28c11 0 18-6 22-15h-24v-18h43v46h-17v-8c-5 11-17 19-32 19-27 0-44-20-44-48zm102 0c0-26 18-46 45-46s45 20 45 46-18 46-45 46-45-20-45-46zm70 0c0-16-10-28-25-28s-25 12-25 28 10 28 25 28 25-12 25-28z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // .NET Core
  if (norm.includes('.net') || norm.includes('dotnet')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#512BD4" />
        <circle cx="86" cy="164" r="14" fill="#FFFFFF" />
        <path
          d="M106 176V80H126L158 136V80H176V176H156L124 120V176H106Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Docker
  if (norm.includes('docker')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#2496ED" />
        <path
          d="M208 138c-3-1-10-2-15 1-4 3-6 8-6 8s-5-3-11-1c-7 2-10 8-10 8H58c-4 0-8 4-8 8 0 24 16 46 42 46 46 0 84-26 96-48 9 2 24-2 28-15 0-1-5-7-8-8z"
          fill="#FFFFFF"
        />
        <rect x="74" y="122" width="16" height="14" fill="#FFFFFF" />
        <rect x="94" y="122" width="16" height="14" fill="#FFFFFF" />
        <rect x="114" y="122" width="16" height="14" fill="#FFFFFF" />
        <rect x="94" y="104" width="16" height="14" fill="#FFFFFF" />
        <rect x="114" y="104" width="16" height="14" fill="#FFFFFF" />
        <rect x="134" y="122" width="16" height="14" fill="#FFFFFF" />
        <rect x="134" y="104" width="16" height="14" fill="#FFFFFF" />
      </svg>
    );
  }

  // Kubernetes
  if (norm.includes('kubernetes') || norm.includes('k8s')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#326CE5" />
        <path
          d="M128 50L186 78V146L128 178L70 146V78L128 50Z"
          stroke="#FFFFFF"
          strokeWidth="10"
          fill="none"
        />
        <circle cx="128" cy="114" r="22" stroke="#FFFFFF" strokeWidth="10" fill="none" />
        <line x1="128" y1="50" x2="128" y2="92" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <line x1="186" y1="78" x2="148" y2="102" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <line x1="186" y1="146" x2="148" y2="126" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <line x1="128" y1="178" x2="128" y2="136" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <line x1="70" y1="146" x2="108" y2="126" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
        <line x1="70" y1="78" x2="108" y2="102" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
      </svg>
    );
  }

  // Terraform
  if (norm.includes('terraform')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#5C4EE5" />
        <path d="M124 100L84 76V124L124 148V100Z" fill="#844FBA" />
        <path d="M172 128L132 104V152L172 176V128Z" fill="#FFFFFF" fillOpacity="0.85" />
        <path d="M124 154L84 130V178L124 202V154Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // CI/CD
  if (norm.includes('ci/cd') || norm.includes('pipeline')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#2088FF" />
        <circle cx="84" cy="128" r="22" stroke="white" strokeWidth="10" fill="none" />
        <circle cx="172" cy="84" r="20" stroke="white" strokeWidth="10" fill="none" />
        <circle cx="172" cy="172" r="20" stroke="white" strokeWidth="10" fill="none" />
        <path d="M106 128H140C152 128 156 94 156 84" stroke="white" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M106 128H140C152 128 156 162 156 172" stroke="white" strokeWidth="10" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  // Elasticsearch
  if (norm.includes('elastic')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#005571" />
        <circle cx="128" cy="128" r="44" stroke="#FEC514" strokeWidth="16" fill="none" />
        <path d="M128 64C163.3 64 192 92.7 192 128" stroke="#00BFB3" strokeWidth="16" strokeLinecap="round" />
        <path d="M64 128C64 163.3 92.7 192 128 192" stroke="#FED136" strokeWidth="16" strokeLinecap="round" />
      </svg>
    );
  }

  // PyTorch / TensorFlow
  if (norm.includes('pytorch') || norm.includes('tf')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#1E1E1E" />
        <path
          d="M142 66L128 52L86 94C72 108 72 132 86 146C100 160 124 160 138 146L170 114L156 100L130 126C122 134 108 134 100 126C92 118 92 104 100 96L142 66Z"
          fill="#EE4C2C"
        />
        <circle cx="156" cy="74" r="10" fill="#EE4C2C" />
      </svg>
    );
  }

  // LangChain / RAG
  if (norm.includes('langchain') || norm.includes('rag')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#002D2B" />
        <circle cx="128" cy="116" r="46" fill="#00A67E" />
        <circle cx="144" cy="108" r="8" fill="#FFFFFF" />
        <path d="M174 116L204 126L174 136V116Z" fill="#F59E0B" />
        <path d="M96 150C108 174 128 186 148 186" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  // OpenAI API
  if (norm.includes('openai')) {
    return (
      <svg viewBox="0 0 256 256" className={className} style={style} fill="none">
        <rect width="256" height="256" rx="56" fill="#10A37F" />
        <path
          d="M178 116.5c-1.3-9.5-8.5-17.1-18-19.1 1.7-6.2 1-12.9-2.2-18.4-5.2-9-15.5-13.7-25.7-11.8-3.9-7.3-11.3-12.2-19.6-13-10.4-1-20.4 4.8-24.9 14.3-8.8 1.4-16.1 7.4-19 15.9-4.7 13.9.7 29.1 12.8 36.4 1.3 9.5 8.5 17.1 18 19.1-1.7 6.2-1 12.9 2.2 18.4 5.2 9 15.5 13.7 25.7 11.8 3.9 7.3 11.3 12.2 19.6 13 10.4 1 20.4-4.8 24.9-14.3 8.8-1.4 16.1-7.4 19-15.9 4.7-13.9-.7-29.1-12.8-36.4zm-50 49.5c-7.7 0-14-6.3-14-14s6.3-14 14-14 14 6.3 14 14-6.3 14-14 14z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Default fallback badge
  return (
    <div
      className={`rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center ${className}`}
      style={style}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
};
