# Verison Website

## Project Overview
Modern, responsive website for Verison, built with Next.js, TypeScript, and Tailwind CSS.

## Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

## Project Structure

```
verison-web/
├── app/              # Next.js app directory
├── features/         # Feature components
├── ui/              # Reusable UI components
├── images/          # Project images
└── public/          # Public assets
```

## Image Handling

### Configuration
Images are handled at the project level through Next.js configuration. This ensures consistent image optimization and delivery across the entire application.

#### Location
- Store all images in the `/images` directory
- Images are automatically accessible via the `/images/` path in components

#### Usage in Components
```tsx
import Image from 'next/image'

// Use in components like this:
<Image
  src="/images/example.png"
  alt="Description"
  fill                              // or width={} height={}
  className="object-cover"          // Optional: for image fitting
  sizes="(max-width: 768px) 100vw, 50vw"  // Optional: for responsive images
/>
```

#### Configuration Details
The image handling is configured in `next.config.js`:
```javascript
{
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/assets' : '',
  async rewrites() {
    return [
      {
        source: '/images/:path*',
        destination: '/images/:path*',
      },
    ]
  }
}
```

### Benefits
- **Centralized Management**: All images are managed in one location
- **Optimization**: Automatic image optimization by Next.js
- **Caching**: Proper caching headers for better performance
- **Responsive**: Automatic responsive image handling
- **Type Safety**: Path consistency across the application

### Best Practices
1. Always use meaningful file names
2. Include descriptive alt text for accessibility
3. Use appropriate image formats (PNG for transparency, JPG for photos)
4. Implement responsive sizes for better performance
5. Consider lazy loading for below-the-fold images

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Follow the established project structure
2. Use TypeScript for type safety
3. Follow the component patterns in place
4. Test thoroughly before submitting PRs

## License
Proprietary - All rights reserved 