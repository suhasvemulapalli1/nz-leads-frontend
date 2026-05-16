/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // బిల్డ్ అయ్యేటప్పుడు టైప్ ఎర్రర్లు ఉన్నా సరే ముందుకు వెళ్ళమని చెబుతున్నాం
    ignoreBuildErrors: true,
  },
  eslint: {
    // లింటింగ్ ఎర్రర్లను కూడా ఇగ్నోర్ చేయండి
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;