"use client"

export default function NorthwesternProgrammePage() {
  return (
    <section className="py-10 bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-[#850101]">Northwestern University – Center for Talent Development (CTD)</h1>
        <p className="mb-4">Northwestern University is a leading U.S. research university with a global impact and an interdisciplinary culture spanning neuroscience, nanotechnology, biotechnology, engineering, education and more. Its <strong>Center for Talent Development (CTD)</strong> helps academically advanced students reach their full potential.</p>
        <p className="mb-4">CTD Director <strong>Paula Olszewski-Kubilius</strong> is a renowned scholar in gifted education. Under her leadership CTD offers a continuum of enrichment and accelerated, credit-bearing programmes throughout the year.</p>

        <h2 className="text-2xl font-bold mb-3">Programme Highlights</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Residential summer programmes (Grades 6-8 &amp; 9-12) on Northwestern’s Evanston, Illinois campus</li>
          <li>Online courses year-round – flex-paced asynchronous or live synchronous formats</li>
          <li>Course lengths from one-day enrichment to 34-week 2-credit AP courses</li>
          <li>Subject areas include STEM, English &amp; language arts, arts &amp; humanities, and leadership</li>
          <li>Leadership Intensive &amp; Civic Leadership Institute options</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Eligibility</h2>
        <p className="mb-2"><strong>Ei ASSET Talent Search Scores</strong> qualify students for CTD’s most accelerated courses:</p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>&gt; 90th percentile – Indigo Tier (Test-score applicant)</li>
          <li>&lt; 90th percentile – Indigo Tier via Admission Portfolio</li>
        </ul>
        <p className="mb-6">Admission Portfolio applicants must include Ei ATS percentile scores, transcript, and a teacher recommendation. Scores remain valid for two years.</p>

        <h2 className="text-2xl font-bold mb-3">Application Portfolio Checklist</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Ei ASSET Talent Search percentile scores</li>
          <li>Transcript (scan of annual report cards acceptable)</li>
          <li>Teacher recommendation – preferably current-year and in the subject relevant to the chosen course</li>
        </ul>

        <h2 className="text-2xl font-bold mb-3">Programme Access by Grade</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Grades 4-12</strong> – Online Family Programme, Weekend at Home, CTD Encounters, Core Essentials, Enrichment, Honors, AP</li>
          <li><strong>Grades 6-8 Summer Programme</strong> – Residential</li>
          <li><strong>Grades 9-12 Summer Programme</strong> – Residential</li>
          <li><strong>Civic Leadership Institute &amp; Leadership Intensive</strong></li>
        </ul>

        <p className="mb-6">For queries, parents can email <a href="mailto:s-corwith@northwestern.edu" className="text-blue-600 underline">s-corwith@northwestern.edu</a>.</p>

        <div className="mt-8 flex gap-4">
          <a
            href="https://www.ctd.northwestern.edu/"
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
          >
            Apply Now
          </a>
          <a
            href="/programmes#northwestern"
            className="inline-flex items-center px-6 py-3 border-2 border-[#850101] text-[#850101] font-semibold rounded-lg hover:bg-[#850101] hover:text-white transition-colors"
          >
            Back to Partners
          </a>
        </div>
      </div>
    </section>
  );
} 