// src/lib/ogImageGenerator.tsx
import React from 'react';
import { ImageResponse } from '@vercel/og';

export async function generateOGImage(title: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '630px',
            backgroundColor: '#FCD34D', // Yellow bar
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 60px',
            width: '1120px', // 1200px - 20px (yellow bar) - 60px (left padding)
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: '#1F2937',
              marginBottom: '20px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#6B7280',
            }}
          >
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}