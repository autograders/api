export const AWSConfig = {
  cdn: process.env.CDN_URL || '',
  publicBucket: process.env.S3_PUBLIC_BUCKET || '',
  privateBucket: process.env.S3_PRIVATE_BUCKET || ''
};
