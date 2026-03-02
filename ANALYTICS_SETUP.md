# Google Analytics (GA4) Setup Guide

This site is pre-configured to track page views and "Resume Download" clicks using Google Analytics 4.

## 1. Get your Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/) and sign in.
2. Create a new **Property** for `nwebbs.dev`.
3. Go to **Admin** > **Data Streams** > **Web**.
4. Click on your stream to see the **Measurement ID** (it starts with `G-`).

## 2. Update the Code
In `index.html`, search for `G-YOUR_MEASUREMENT_ID` and replace both occurrences with your actual ID:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 3. Verify Event Tracking
The "Download PDF" button in `src/components/ResumeWindow.tsx` already has a tracker attached:

```javascript
window.gtag('event', 'download_resume', {
  'event_category': 'Engagement',
  'event_label': 'PDF Download'
});
```

To verify it's working:
1. Open your site.
2. Open the **Realtime** report in your Google Analytics dashboard.
3. Click the **DOWNLOAD_PDF** button on your site.
4. You should see the `download_resume` event appear in the dashboard within a few seconds.

## 4. Why track downloads?
Tracking the download event allows you to see if recruiters or potential clients are taking the next step to save your resume, giving you better insight into your portfolio's performance than simple page views alone.
