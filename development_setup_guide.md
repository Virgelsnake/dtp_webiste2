# Development Environment Setup Guide

**Company Website Project - Foundation Setup**

**Document Version:** 1.0  
**Date:** 19 August 2025  
**Target Audience:** Web Development Engineer  
**Purpose:** Complete environment setup for designer handover

---

## Overview

This guide establishes the complete development foundation for the company website project. Upon completion, the project will be ready for the designer to begin building pages and components without any additional technical setup requirements.

**End State:** A fully configured Astro.js project with all dependencies, tooling, and deployment pipeline ready for design implementation.

---

## Prerequisites

### Required Software Installations

Before starting, ensure the following are installed on your development machine:

#### 1. Node.js & npm

```bash
# Check if installed
node --version  # Should be v18.x or higher
npm --version   # Should be v9.x or higher

# If not installed, download from: https://nodejs.org/
# Choose LTS version (Long Term Support)
```

#### 2. Git

```bash
# Check if installed
git --version

# If not installed:
# Windows: Download from https://git-scm.com/
# macOS: Install via Xcode Command Line Tools
# Linux: sudo apt-get install git (Ubuntu/Debian)
```

#### 3. Code Editor (Recommended: VS Code)

- Download from: <https://code.visualstudio.com/>
- Install recommended extensions (listed below)

---

## Step 1: Project Initialisation

### 1.1 Create New Astro Project

```bash
# Navigate to your development directory
cd /path/to/your/projects

# Create new Astro project with TypeScript
npm create astro@latest company-website -- --template minimal --typescript strict

# Navigate to project directory
cd company-website
```

**Expected Output:**

```
✔ How would you like to start your new project? › a minimal (but not empty) Astro project
✔ Install dependencies? … Yes
✔ Do you plan to write TypeScript? … Yes
✔ How strict should TypeScript be? › Strict
✔ Initialize a new git repository? … Yes
```

### 1.2 Verify Installation

```bash
# Test that Astro is working
npm run dev

# Should start development server on http://localhost:4321
# Verify you see the Astro welcome page
# Press Ctrl+C to stop the server
```

---

## Step 2: Core Dependencies Installation

### 2.1 Install Styling Framework

```bash
# Add Tailwind CSS integration
npx astro add tailwind

# Confirm integration when prompted
```

> **Note:** `@astrojs/tailwind` requires `tailwindcss` v3. After running the command above, verify that your `package.json` lists `"tailwindcss": "^3.x.x"`. If it shows version 4, manually downgrade it to `^3.4.4` before running `npm install`.

### 2.2 Install Additional Development Dependencies

```bash
# Install essential development tools
npm install --save-dev \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint \
  eslint-plugin-astro \
  prettier \
  prettier-plugin-astro \
  @types/node

# Install utility libraries
npm install \
  @astrojs/sitemap \
  sharp
```

### 2.3 Add Sitemap

```bash
# Add sitemap for SEO
npx astro add sitemap
```

---

## Step 3: Project Structure Setup

### 3.1 Create Required Directories

```bash
# Create the complete project structure
mkdir -p src/{components,layouts,pages,styles,assets/images,content}
mkdir -p src/pages/{services,blog,case-studies}
mkdir -p src/content/{services,testimonials,case-studies,blog}
mkdir -p public/{images,icons}
```

### 3.2 Create Initial File Structure

Create the following files with the specified content:

#### `src/styles/global.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> **Important:** Use these three directives to correctly import Tailwind's styles. Using `@import 'tailwindcss';` can cause build errors with PostCSS.

#### `src/layouts/BaseLayout.astro`

```astro
---
export interface Props {
  title: string;
  description?: string;
}

const { title, description = "Modern company website built with Astro" } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-white">
    <slot />
  </body>
</html>
```

#### `src/components/Header.astro`

```astro
---
// Header component - ready for designer styling
---

<header class="w-full bg-white shadow-sm">
  <nav class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <div class="text-xl font-bold">
        <a href="/" class="text-gray-800 hover:text-gray-600">Company Name</a>
      </div>
      <ul class="hidden md:flex space-x-6">
        <li><a href="/" class="text-gray-600 hover:text-gray-800">Home</a></li>
        <li><a href="/about" class="text-gray-600 hover:text-gray-800">About</a></li>
        <li class="relative group">
          <a href="/services" class="text-gray-600 hover:text-gray-800">Services</a>
          <!-- Service dropdown will be styled by designer -->
        </li>
        <li><a href="/pricing" class="text-gray-600 hover:text-gray-800">Pricing</a></li>
        <li><a href="/case-studies" class="text-gray-600 hover:text-gray-800">Case Studies</a></li>
        <li><a href="/testimonials" class="text-gray-600 hover:text-gray-800">Testimonials</a></li>
        <li><a href="/faq" class="text-gray-600 hover:text-gray-800">FAQ</a></li>
        <li><a href="/contact" class="text-gray-600 hover:text-gray-800">Contact</a></li>
      </ul>
    </div>
  </nav>
</header>
```

#### `src/components/Footer.astro`

```astro
---
// Footer component - ready for designer styling
---

<footer class="w-full bg-gray-100 mt-auto">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
      <!-- Company Info -->
      <div>
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Company Name</h3>
        <p class="text-gray-600 text-sm">Brief company description goes here.</p>
      </div>
      
      <!-- Services -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-4">Services</h4>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="/services" class="hover:text-gray-800">All Services</a></li>
          <!-- Service links will be populated by designer -->
        </ul>
      </div>
      
      <!-- Company -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-4">Company</h4>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="/about" class="hover:text-gray-800">About Us</a></li>
          <li><a href="/case-studies" class="hover:text-gray-800">Case Studies</a></li>
          <li><a href="/testimonials" class="hover:text-gray-800">Testimonials</a></li>
          <li><a href="/pricing" class="hover:text-gray-800">Pricing</a></li>
          <li><a href="/faq" class="hover:text-gray-800">FAQ</a></li>
        </ul>
      </div>
      
      <!-- Blog (moved to footer) -->
      <div>
        <h4 class="font-semibold text-gray-800 mb-4">Resources</h4>
        <ul class="space-y-2 text-sm text-gray-600">
          <li><a href="/blog/best-fit-briefs" class="hover:text-gray-800">Best Fit Briefs</a></li>
          <li><a href="/blog/top-reasons" class="hover:text-gray-800">Top Reasons Series</a></li>
          <li><a href="/blog/service-locations" class="hover:text-gray-800">Service Locations</a></li>
          <li><a href="/blog/comparisons" class="hover:text-gray-800">Comparison Tables</a></li>
        </ul>
      </div>
    </div>
    
    <div class="text-center text-gray-600 border-t pt-4">
      <p>&copy; 2025 Company Name. All rights reserved.</p>
    </div>
  </div>
</footer>
```

#### Update `src/pages/index.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Company Name - Home">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <section class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to Company Name</h1>
        <p class="text-xl text-gray-600 mb-8">Your trusted partner for [industry/service]</p>
        <div class="space-y-4">
          <p class="text-gray-700">This is the foundation structure ready for design implementation.</p>
          <p class="text-gray-700">The designer can now begin styling and adding content.</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

#### Create additional pages

**`src/pages/about.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="About Us - Company Name" description="Learn more about our company and our mission">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
      <p class="text-gray-700">About page content goes here - ready for designer implementation.</p>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/services/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Services - Company Name" description="Our comprehensive range of professional services">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
      <p class="text-gray-700 mb-8">Explore our comprehensive range of professional services.</p>
      
      <!-- Service grid will be styled by designer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Individual service cards will be added by designer -->
        <div class="p-6 border rounded-lg">
          <h3 class="text-xl font-semibold mb-4">Service 1</h3>
          <p class="text-gray-600 mb-4">Service description goes here.</p>
          <a href="/services/service-1" class="text-blue-600 hover:text-blue-800">Learn More →</a>
        </div>
        <!-- Add more service cards as needed -->
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/pricing.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Pricing - Company Name" description="Transparent pricing for our professional services">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Pricing</h1>
      <p class="text-gray-700 mb-8">Transparent, competitive pricing for all our services.</p>
      
      <!-- Pricing tables will be styled by designer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Pricing cards will be added by designer -->
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/faq.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="FAQ - Company Name" description="Frequently asked questions about our services">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h1>
      <p class="text-gray-700 mb-8">Find answers to common questions about our services.</p>
      
      <!-- FAQ accordion will be styled by designer -->
      <div class="space-y-4">
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold text-gray-800 mb-2">Sample FAQ Question?</h3>
          <p class="text-gray-600">Sample answer content goes here.</p>
        </div>
        <!-- More FAQ items will be added by designer -->
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/case-studies/index.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Case Studies - Company Name" description="Real success stories from our clients">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Case Studies</h1>
      <p class="text-gray-700 mb-8">Discover how we've helped our clients achieve their goals.</p>
      
      <!-- Case study grid will be styled by designer -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Case study cards will be added by designer -->
        <div class="border rounded-lg p-6">
          <h3 class="text-xl font-semibold mb-4">Case Study Title</h3>
          <p class="text-gray-600 mb-4">Brief case study description.</p>
          <a href="/case-studies/case-study-1" class="text-blue-600 hover:text-blue-800">Read Full Case Study →</a>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/testimonials.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Testimonials - Company Name" description="What our clients say about working with us">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Client Testimonials</h1>
      <p class="text-gray-700 mb-8">Hear directly from our satisfied clients.</p>
      
      <!-- Testimonial cards will be styled by designer -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-6 rounded-lg border">
          <p class="text-gray-700 mb-4 italic">"Sample testimonial quote goes here."</p>
          <div class="text-sm text-gray-600">
            <strong>Client Name</strong><br>
            Company Position, Company Name
          </div>
        </div>
        <!-- More testimonials will be added by designer -->
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/blog/best-fit-briefs.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Best Fit Briefs - Company Name" description="Understanding the perfect service match for your needs">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Best Fit Briefs</h1>
      <p class="text-gray-700 mb-8">Discover which services are the perfect match for your specific needs.</p>
      
      <!-- Article list will be styled by designer -->
      <div class="space-y-6">
        <article class="border-b pb-6">
          <h2 class="text-xl font-semibold mb-2">Article Title</h2>
          <p class="text-gray-600 mb-2">Article excerpt goes here...</p>
          <a href="/blog/best-fit-briefs/article-slug" class="text-blue-600 hover:text-blue-800">Read More →</a>
        </article>
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/blog/top-reasons.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Top Reasons Series - Company Name" description="Top reasons to choose our services">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Top Reasons Series</h1>
      <p class="text-gray-700 mb-8">Explore the key advantages of working with us.</p>
      
      <!-- Article list will be styled by designer -->
      <div class="space-y-6">
        <article class="border-b pb-6">
          <h2 class="text-xl font-semibold mb-2">Top Reasons Article Title</h2>
          <p class="text-gray-600 mb-2">Article excerpt goes here...</p>
          <a href="/blog/top-reasons/article-slug" class="text-blue-600 hover:text-blue-800">Read More →</a>
        </article>
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/blog/service-locations.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Service Locations - Company Name" description="Our services available across multiple locations">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Service-City Combinations</h1>
      <p class="text-gray-700 mb-8">Discover our services available in your area.</p>
      
      <!-- Location/service grid will be styled by designer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="border rounded-lg p-4">
          <h3 class="font-semibold mb-2">Service in City</h3>
          <p class="text-gray-600">Information about this service in this location.</p>
        </div>
        <!-- More service-location combinations -->
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/blog/comparisons.astro`**

```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
---

<BaseLayout title="Comparison Tables - Company Name" description="Compare our services and pricing options">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Comparison Tables</h1>
      <p class="text-gray-700 mb-8">Compare different service options to make the best choice.</p>
      
      <!-- Comparison tables will be styled by designer -->
      <div class="space-y-8">
        <div class="overflow-x-auto">
          <table class="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr class="bg-gray-50">
                <th class="border border-gray-300 px-4 py-2">Feature</th>
                <th class="border border-gray-300 px-4 py-2">Option 1</th>
                <th class="border border-gray-300 px-4 py-2">Option 2</th>
                <th class="border border-gray-300 px-4 py-2">Option 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-4 py-2">Sample Feature</td>
                <td class="border border-gray-300 px-4 py-2">✓</td>
                <td class="border border-gray-300 px-4 py-2">✓</td>
                <td class="border border-gray-300 px-4 py-2">✗</td>
              </tr>
              <!-- More comparison rows -->
            </tbody>
          </table>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

**`src/pages/contact.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Contact Us - Company Name" description="Get in touch with our team">
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      
      <!-- Basic contact form structure - designer will style this -->
      <form name="contact" method="POST" data-netlify="true" class="max-w-md mx-auto">
        <input type="hidden" name="form-name" value="contact" />
        
        <div class="mb-4">
          <label for="name" class="block text-gray-700 mb-2">Name</label>
          <input type="text" id="name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-gray-700 mb-2">Email</label>
          <input type="email" id="email" name="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md">
        </div>
        
        <div class="mb-4">
          <label for="message" class="block text-gray-700 mb-2">Message</label>
          <textarea id="message" name="message" rows="5" required class="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
        </div>
        
        <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </main>
    <Footer />
  </div>
</BaseLayout>
```

---

## Step 4: Configuration Files

### 4.1 Update Astro Configuration

Edit `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yourcompany.com', // Replace with actual domain
  integrations: [
    tailwind(),
    sitemap()
  ],
  output: 'static'
});
```

### 4.2 TypeScript Configuration

Update `tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowUnusedLabels": false,
    "allowUnreachableCode": false,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitOverride": true,
    "noImplicitReturns": true,
    "noPropertyAccessFromIndexSignature": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 4.3 Tailwind Configuration

Create `tailwind.config.cjs`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // Designer can customise these values
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Add custom brand colours here
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
}
```

### 4.4 ESLint Configuration

Create `.eslintrc.cjs`:

```javascript
module.exports = {
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:astro/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
  ],
};
```

### 4.5 Prettier Configuration

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-astro"],
  "overrides": [
    {
      "files": "*.astro",
      "options": {
        "parser": "astro"
      }
    }
  ]
}
```

### 4.6 Update Package.json Scripts

Edit the scripts section in `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx,.astro",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx,.astro --fix",
    "format": "prettier --write \"src/**/*.{astro,html,js,jsx,ts,tsx,css,md}\"",
    "type-check": "astro check"
  }
}
```

---

## Step 5: Development Environment Setup

### 5.1 VS Code Extensions

Install these recommended extensions:

```bash
# Open VS Code in the project directory
code .

# Install extensions (or install manually via Extensions panel)
# - Astro
# - Tailwind CSS IntelliSense
# - TypeScript Importer
# - ESLint
# - Prettier - Code formatter
# - Auto Rename Tag
# - Bracket Pair Colorizer 2
```

### 5.2 VS Code Workspace Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.associations": {
    "*.astro": "astro"
  },
  "emmet.includeLanguages": {
    "astro": "html"
  }
}
```

### 5.3 Create .gitignore

Ensure `.gitignore` contains:

```
# Dependencies
node_modules/

# Build output
dist/
.astro/

# Environment variables
.env
.env.local
.env.production

# macOS
.DS_Store

# VS Code
.vscode/settings.json

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock
```

---

## Step 6: Version Control Setup

### 6.1 Initialise Git Repository

```bash
# Initialise repository (if not done during Astro creation)
git init

# Add all files
git add .

# Initial commit
git commit -m "feat: initial project setup with Astro, TypeScript, and Tailwind"
```

### 6.2 Create GitHub Repository

```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/company-website.git
git branch -M main
git push -u origin main
```

---

## Step 7: Netlify Deployment Setup

### 7.1 Create Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Content-Security-Policy = "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self'"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[form]
  settings = { spam_action = "block" }
```

### 7.2 Deploy to Netlify

1. Visit <https://netlify.com> and sign up/log in
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Build settings should auto-detect:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

---

## Step 8: Final Verification

### 8.1 Test Development Environment

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# In a new terminal, run linting
npm run lint

# Run type checking
npm run type-check

# Format code
npm run format
```

### 8.2 Verify All Pages Load

Visit these URLs in your browser to ensure all pages are working:

**Main Pages:**

- <http://localhost:4321/> (Homepage)
- <http://localhost:4321/about> (About page)
- <http://localhost:4321/services> (Services overview)
- <http://localhost:4321/pricing> (Pricing page)
- <http://localhost:4321/faq> (FAQ page)
- <http://localhost:4321/case-studies> (Case studies overview)
- <http://localhost:4321/testimonials> (Testimonials page)
- <http://localhost:4321/contact> (Contact page with form)

**Blog Pages (Footer Links):**

- <http://localhost:4321/blog/best-fit-briefs> (Best Fit Briefs)
- <http://localhost:4321/blog/top-reasons> (Top Reasons Series)
- <http://localhost:4321/blog/service-locations> (Service-City Combinations)
- <http://localhost:4321/blog/comparisons> (Comparison Tables)

### 8.3 Test Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Handover Information for Designer

### What's Ready for Design Work

✅ **Complete site structure** with all required pages and navigation  
✅ **Responsive layout framework** using Tailwind CSS  
✅ **Component architecture** ready for styling  
✅ **Contact form** with Netlify integration  
✅ **SEO foundation** with proper meta tags for all pages  
✅ **Development tools** configured (linting, formatting)  
✅ **Deployment pipeline** connected to Netlify  
✅ **Blog section** moved to footer navigation  
✅ **Service pages** structure ready for individual service creation  
✅ **Case studies** and **testimonials** sections prepared  

### Complete Site Structure Created

```
Your Website
├── Homepage (/)
├── Services Pages (/services/)
│   └── Individual service pages ready for creation
├── About Us (/about)
├── Contact (/contact)
├── Pricing (/pricing)
├── FAQ (/faq)
├── Case Studies (/case-studies/)
├── Testimonials (/testimonials)
└── Blog (Footer Navigation)
    ├── Best Fit Briefs (/blog/best-fit-briefs)
    ├── Top Reasons Series (/blog/top-reasons)
    ├── Service-City Combinations (/blog/service-locations)
    └── Comparison Tables (/blog/comparisons)
```  

### Designer Next Steps

1. **Customise Tailwind config** with brand colours and fonts
2. **Style main navigation** and footer with complete link structure
3. **Create individual service pages** in `/src/pages/services/[service-name].astro`
4. **Style service cards** and pricing tables
5. **Design case study templates** and testimonial layouts
6. **Add content** to all page templates
7. **Create blog article templates** for the four blog categories
8. **Optimise images** using Astro's built-in `<Image>` component
9. **Test responsive design** across all device sizes
10. **Implement service dropdown** navigation (if desired)

### Key Commands for Designer

```bash
# Start development server
npm run dev

# Format code automatically
npm run format

# Build and test production version
npm run build && npm run preview
```

### Important Notes

- All styling should use Tailwind CSS classes
- Images should be placed in `src/assets/images/` and imported properly
- The contact form is pre-configured for Netlify Forms
- TypeScript will help catch errors during development
- Changes pushed to GitHub automatically deploy to Netlify

---

## Troubleshooting

### Common Issues

**Issue**: `npm run dev` fails with port error  
**Solution**: Use `npm run dev -- --port 3000` to use different port

**Issue**: TypeScript errors in Astro files  
**Solution**: Ensure VS Code has Astro extension installed

**Issue**: Tailwind styles not applying  
**Solution**: Check file paths in `tailwind.config.cjs` content array

**Issue**: Build fails on Netlify  
**Solution**: Ensure `netlify.toml` is committed and Node version is correct

---

**Setup Complete!**

The development environment is now fully configured and ready for design implementation. The designer can begin work immediately with all tools, frameworks, and deployment pipeline operational.
